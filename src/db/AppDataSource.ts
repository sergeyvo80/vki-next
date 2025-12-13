import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';
import { User } from './entity/User.entity';

const timeout = 30000;

// Определяем тип базы данных
const isProduction = process.env.NODE_ENV === 'production';
const hasPostgresUrl = process.env.POSTGRES || process.env.DATABASE_URL;

console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  hasPostgres: !!process.env.POSTGRES,
  hasDatabaseUrl: !!process.env.DATABASE_URL,
  postgresUrl: process.env.POSTGRES ? 'SET' : 'NOT SET',
});

const config: DataSourceOptions = {
  ...(hasPostgresUrl
    ? {
      type: 'postgres' as const,
      url: process.env.POSTGRES || process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
      connectTimeoutMS: timeout,
      extra: {
        connectionTimeoutMillis: timeout,
        query_timeout: timeout,
        idle_in_transaction_session_timeout: timeout,
        // Для Vercel serverless functions
        max: 1, // Максимум 1 соединение
        min: 0, // Минимум 0 соединений
      },
    }
    : {
      type: 'sqlite' as const,
      database: process.env.DB ?? './db/vki-web.db',
    }),
  synchronize: !isProduction,
  migrationsRun: isProduction,
  logging: !isProduction,
  entities: [Student, Group, User],
};

const AppDataSource = new DataSource(config);

export const dbInit = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      console.log('AppDataSource.isInitialized');
      return;
    }
    await AppDataSource.initialize();
    console.log('AppDataSource.initialize');
  }
  catch (error) {
    console.error('Database initialization error:', error);
    throw error; // Перебрасываем ошибку, чтобы роуты могли ее обработать
  }
};

export const dbClose = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('AppDataSource.destroy');
    }
  }
  catch (error) {
    console.error('Database close error:', error);
  }
};

// await dbInit();

export default AppDataSource;
