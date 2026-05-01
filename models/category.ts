import "reflect-metadata";
import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript';
import { Product } from "./product";

@Table({
    tableName: 'Category',
    timestamps: true,
})
export class Category extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @HasMany(() => Product)
    products!: Product[];
}