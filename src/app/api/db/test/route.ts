import { dbInit } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  try {
    console.log('=== TEST DB ROUTE ===');
    await dbInit();

    return new Response(JSON.stringify({
      success: true,
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Test route error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
