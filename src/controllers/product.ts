import { Request, Response, NextFunction } from 'express';
import { Product } from '../../models/product';
import { Category } from '../../models/category';
import { controllerWrapper } from '../utils/controllerWrapper';
import { validate as isUuid } from 'uuid';


export const getAllProducts = controllerWrapper(async () => {
    const products = await Product.findAll({
        include: [{ model: Category, as: 'category' }]
    });
    return {
        success: true,
        data: products
    };
});

export const createProduct = controllerWrapper(async (req: Request) => {
    const { name, price, category_id, image_url, is_available } = req.body;

    if (!name || !price || !category_id) {
        throw { status: 400, message: "Name, Price, and Category are required!" };
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
        throw { status: 404, message: "Category not found!" };
    }

    const product = await Product.create({ 
        name, price, category_id, image_url, is_available 
    });

    return {
        message: "Product created successfully!",
        data: product
    };
});

export const updateProduct = controllerWrapper(async (req) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        throw { status: 400, message: "Invalid ID!" };
    }

    const product = await Product.findByPk(id);
    if (!product) throw { status: 404, message: "Product not found" };

    await product.update(req.body);
    
    return {
        message: "Product updated!",
        data: product
    };
});

export const deleteProduct = controllerWrapper(async (req) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        throw { status: 400, message: "Invalid ID!" };
    }

    const product = await Product.findByPk(id);
    if (!product) throw { status: 404, message: "Product not found" };

    await product.destroy();
    
    return {
        message: "Product deleted successfully!"
    };
});

export const getProductById = controllerWrapper(async (req: Request) => {
    const { id } = req.params;

    if (!isUuid(id)) {
        throw { status: 400, message: "Format ID kamu ngaco, bukan UUID McD!" };
    }
    
    const product = await Product.findByPk(id as string, {
        include: [Category] 
    });

    if (!product) {
        throw { status: 404, message: "Produk gak ada, mungkin udah lunas?" };
    }

    return { data: product };
});