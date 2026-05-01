import 'dotenv/config';
import { type Dialect } from 'sequelize';

const pe = process.env;

export const appConfig = {
    database: {
        username: pe.DB_USER ?? "postgres",
        password: pe.DB_PASSWORD ?? "yem1m3",
        database: pe.DB_NAME ?? "mcdonald",
        host: pe.DB_HOST ?? "127.0.0.1",
        port: parseInt(pe.DB_PORT ?? '5432'), 
        dialect: (pe.DB_DIALECT ?? "postgres") as Dialect
    },
    server: {
        port : parseInt(pe.PORT ?? '3000')
    },
    jwt: {
        secret: pe.JWT_SECRET ?? 'secret'
    }
}