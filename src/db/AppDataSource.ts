import 'reflect-metadata';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';
import { User } from './entity/User.entity';

const timeout = 30000;

const config: DataSourceOptions = {
  ...(process.env.POSTGRES || process.env.DATABASE_URL
    ? {
      type: 'postgres',
      url: process.env.POSTGRES || process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectTimeoutMS: timeout,
      extra: {
        connectionTimeoutMillis: timeout,
        query_timeout: timeout,
        idle_in_transaction_session_timeout: timeout,
        // Neon specific settings
        max: 1, // Important for serverless
        min: 0,
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
    console.log('=== DB INIT START ===');
    console.log('Is initialized:', AppDataSource.isInitialized);
    if (AppDataSource.isInitialized) {
      console.log('Database already initialized');
      return;
    }

    console.log('Initializing database connection...');
    console.log('Using URL:', (process.env.POSTGRES || process.env.DATABASE_URL)?.substring(0, 30) + '...');

    await AppDataSource.initialize();
    console.log('Database connection successful');

    // Test connection
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.query('SELECT 1 as test');
    await queryRunner.release();
    console.log('Database test query successful');
  }
  catch (error) {
    console.error('=== DATABASE ERROR ===');
    console.error('Error type:', error?.constructor?.name);
    console.error('Error message:', error?.message);
    console.error('Error code:', error?.code);
    console.error('Full error:', error);
    console.error('===================');
    throw error;
  }
};

export const dbClose = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('Database connection closed');
    }
  }
  catch (error) {
    console.error('Database close error:', error);
  }
};

// await dbInit();

export default AppDataSource;