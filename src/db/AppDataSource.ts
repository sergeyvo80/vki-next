import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';
import { User } from './entity/User.entity';

const timeout = 30000;

const config: DataSourceOptions = {
  ...(process.env.POSTGRES
    ? {
      type: 'postgres',
      url: process.env.POSTGRES,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
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
      type: 'sqlite',
      database: process.env.DB ?? './db/vki-web.db',
    }),
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  logging: process.env.NODE_ENV !== 'production',
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
