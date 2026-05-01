import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { OrderItem } from './order-item';

@Table({ tableName: 'Order', timestamps: true })
export class Order extends Model {
    @Column({ 
        primaryKey: true, 
        type: DataType.UUID, 
        defaultValue: DataType.UUIDV4 
    })
    declare id: string;

    @Column({ 
        type: DataType.STRING, 
        unique: true, 
        allowNull: false 
    })
    order_code!: string;

    @Column({ 
        type: DataType.ENUM('pending', 'paid', 'completed', 'canceled'), 
        defaultValue: 'pending' 
    })
    status!: string;

    @Column({ 
        type: DataType.DECIMAL(12, 2), 
        defaultValue: 0 
    })
    total_price!: number;

    @HasMany(() => OrderItem)
    items!: OrderItem[];
}