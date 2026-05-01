import { Request, Response } from 'express';
import { Order } from '../../models/order';
import { OrderItem } from '../../models/order-item';
import { Product } from '../../models/product';
import { validate as isUuid } from 'uuid';

import { controllerWrapper } from '../utils/controllerWrapper';

export const createOrder = controllerWrapper(async (req: Request) => {
    const { items } = req.body;

    if (!items || items.length === 0) {
        throw { status: 400, message: "Keranjang belanja kosong!" };
    }

    let total_price = 0;
    const validatedItems = [];

    for (const item of items) {
        const product = await Product.findByPk(item.product_id);
        
        if (!product) {
            throw { status: 404, message: `Produk ID ${item.product_id} gak ada!` };
        }

        if (!product.is_available) {
            throw { status: 400, message: `Aduh telat! ${product.name} baru aja habis.` };
        }

        total_price += Number(product.price) * item.quantity;
        validatedItems.push({ item, product }); 
    }

    const newOrder = await Order.create({
        order_code: `MCD-${Date.now()}`,
        status: 'pending',
        total_price: total_price
    });

    for (const { item, product } of validatedItems) {
        await OrderItem.create({
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price_at_order_time: product.price
        });
    }

    return {
        message: "Pesanan berhasil dibuat!",
        order_code: newOrder.order_code,
        total: total_price
    };
});

export const getAllOrders = controllerWrapper(async () => {
    const orders = await Order.findAll({
        order: [['createdAt', 'DESC']]
    });

    return { data: orders };
});

export const getOrderDetail = controllerWrapper(async (req: Request) => {
    const { id } = req.params;

    if (!isUuid(id)) {
        throw { status: 400, message: "Format ID kamu ngaco, bukan UUID McD!" };
    }

    const order = await Order.findOne({
        where: { order_code: id },
        include: [OrderItem]
    });

    if (!order) {
        throw { status: 404, message: "Pesanan nggak ketemu, typo kali?" };
    }

    return { data: order };
});