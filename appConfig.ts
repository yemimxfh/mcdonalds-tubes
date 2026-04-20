import 'dotenv/config';
import { type Dialect } from 'sequelize';

const pe = process.env;

export const appConfig = {
    database: {
        // ngambil dari .env (DB_USER), kalau kosong pake "postgres"
        username: pe.DB_USER ?? "postgres",
        // ngambil dari .env (DB_PASSWORD), kalau kosong pake "yem1m3" 
        password: pe.DB_PASSWORD ?? "yem1m3",
        // ngambil dari .env (DB_NAME), kalau kosong pake "belajar-orm"
        database: pe.DB_NAME ?? "mcdonalds",
        host: pe.DB_HOST ?? "127.0.0.1",
        port: parseInt(pe.DB_PORT ?? '5432'), // Port database
        dialect: (pe.DB_DIALECT ?? "postgres") as Dialect
    },
    server: {
        // Port buat ngetes di browser (localhost:3000)
        port : parseInt(pe.PORT ?? '3000')
    },
    jwt: {
        secret: pe.JWT_SECRET ?? 'secret'
    }
}