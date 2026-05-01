import "reflect-metadata";
import { Table, Column, Model, DataType, PrimaryKey, HasMany } from 'sequelize-typescript';
import { PasswordReset } from "./password-reset";

@Table({
    tableName: 'User',
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
    name!: string;

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
        type: DataType.ENUM('admin', 'cashier'),
        defaultValue: 'cashier',
        allowNull: false,
    })
    role!: 'admin' | 'cashier';

    @HasMany(() => PasswordReset)
    passwordResets!: PasswordReset[];
}