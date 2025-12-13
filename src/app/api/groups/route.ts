import { getGroupsDb } from '@/db/groupDb';
import { dbInit, dbClose } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  try {
    await dbInit();
    const groups = await getGroupsDb();

    return new Response(JSON.stringify(groups), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting groups:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get groups',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    // Закрываем соединение в serverless среде
    if (process.env.NODE_ENV === 'production') {
      await dbClose();
    }
  }
}
