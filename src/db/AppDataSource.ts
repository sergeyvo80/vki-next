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
    console.log('POSTGRES env var available:', !!process.env.POSTGRES);
    console.log('Using URL:', process.env.POSTGRES?.substring(0, 30) + '...');

    await AppDataSource.initialize();
    console.log('Database connection successful');

    // Test connection
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.query('SELECT 1 as test');
    await queryRunner.release();
    console.log('Database test query successful');
  }
  catch (error: unknown) {
    console.error('=== DATABASE ERROR ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : 'Unknown');
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error code:', error instanceof Error && 'code' in error ? (error as any).code : 'No code');
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