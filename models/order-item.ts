import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order';
import { Product } from './product';

@Table({ tableName: 'OrderItem', timestamps: true })
export class OrderItem extends Model {
    @Column({ primaryKey: true, type: DataType.UUID, defaultValue: DataType.UUIDV4 })
    declare id: string;

    @ForeignKey(() => Order)
    @Column({ type: DataType.UUID, allowNull: false })
    order_id!: string;

    @ForeignKey(() => Product)
    @Column({ type: DataType.UUID, allowNull: false })
    product_id!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity!: number;

    @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
    price_at_order_time!: number;

    @BelongsTo(() => Order)
    order!: Order;

    @BelongsTo(() => Product)
    product!: Product;
}