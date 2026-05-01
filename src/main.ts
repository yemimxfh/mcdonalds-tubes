import express from 'express';
import { Sequelize } from 'sequelize-typescript'; 
import { User } from '../models/user';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { PasswordReset } from '../models/password-reset';


import userRoutes from './routes/userRoutes';
import categoryRoutes from './routes/categoryRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
app.use(express.json());

const sequelize = new Sequelize({
  database: 'mcdonald', 
  dialect: 'postgres',
  username: 'postgres',              
  password: 'yem1m3',                   
  host: 'localhost',
  models: [User, Product, Category, Order, OrderItem, PasswordReset],
});

async function startApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Database McD Terhubung!");

    app.use('/api/auth', userRoutes);
    app.use('/api/categories', categoryRoutes);
    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    app.use((err: any, req: any, res: any, next: any) => {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
      });
    });

    app.listen(3000, () => console.log("McD Server Ready di Port 3000! 🍟"));
    
  } catch (error) {
    console.error("❌ Waduh, gagal nyambung ke database:", error);
  }
}

startApp();