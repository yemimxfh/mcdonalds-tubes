import { Request, Response } from 'express';
import { Category } from '../../models/category';
import { controllerWrapper } from '../utils/controllerWrapper';
import { Product } from '../../models/product';
import { validate as isUuid } from 'uuid';

export const getAllCategories = controllerWrapper(async (req: Request) => {
    const categories = await Category.findAll();
        
    return {
        message: "Success get all categories",
        data: categories
    };
});

export const createCategory = controllerWrapper(async (req: Request) => {
    const { name } = req.body;
    if (!name) throw { status: 400, message: "Nama kategori wajib diisi!" };

    const category = await Category.create({ name });
    return {
        message: "Category created!",
        data: category
    };
});

export const getCategoryById = controllerWrapper(async (req: Request) => {
    const { id } = req.params;

    if (!isUuid(id)) {
        throw { status: 400, message: "Format ID kamu ngaco, bukan UUID McD!" };
    }
    
    const category = await Category.findByPk(id as string, {
        include: [Product]
    });

    if (!category) {
        throw { status: 404, message: "Kategorinya gak ketemu nih." };
    }

    return { data: category };
});

export const deleteCategory = controllerWrapper(async (req) => {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
        throw { status: 400, message: "Invalid ID!" };
    }

    const category = await Category.findByPk(id);
    if (!category) throw { status: 404, message: "Product not found" };

    await category.destroy();
    
    return {
        message: "Product deleted successfully!"
    };
});