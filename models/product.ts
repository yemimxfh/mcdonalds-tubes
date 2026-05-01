import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Category } from './category';

@Table({ tableName: 'Product', timestamps: true })
export class Product extends Model {
    @Column({ 
        primaryKey: true, 
        type: DataType.UUID, 
        defaultValue: DataType.UUIDV4 
    })
    declare id: string;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    name!: string;

    @Column({ 
        type: DataType.DECIMAL(10, 2), 
        allowNull: false 
    })
    price!: number;

    @Column({ 
        type: DataType.STRING, 
        allowNull: true 
    })
    image_url?: string;

    @Column({ 
        type: DataType.BOOLEAN, 
        defaultValue: true 
    })
    is_available!: boolean;

    @ForeignKey(() => Category)
    @Column({ 
        type: DataType.UUID, 
        allowNull: false 
    })
    category_id!: string;

    @BelongsTo(() => Category)
    category!: Category;
}