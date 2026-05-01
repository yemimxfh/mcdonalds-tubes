import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user';

@Table({ tableName: 'PasswordReset', timestamps: true })
export class PasswordReset extends Model {
    @Column({ 
        primaryKey: true, 
        type: DataType.UUID, 
        defaultValue: DataType.UUIDV4 
    })
    declare id: string;

    @ForeignKey(() => User)
    @Column({ 
        type: DataType.UUID, 
        allowNull: false 
    })
    user_id!: string;

    @Column({ 
        type: DataType.STRING, 
        unique: true, allowNull: false 
    })
    token!: string;

    @Column({ 
        type: DataType.BOOLEAN, 
        defaultValue: false 
    })
    is_used!: boolean;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    email!: string; 

    @Column({ 
        type: DataType.DATE, 
        allowNull: false 
    })
    expired_at!: Date;


    @BelongsTo(() => User)
    user!: User;
}