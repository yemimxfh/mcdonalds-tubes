import "reflect-metadata";
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
    tableName: 'Users',
    timestamps: true,
})
export class User extends Model {
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
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.ENUM('admin', 'customer', 'cashier'),
        defaultValue: 'customer',
        allowNull: false,
    })
    role!: 'admin' | 'customer' | 'cashier';
}