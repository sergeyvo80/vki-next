import { deleteStudentDb } from '@/db/studentDb';
import { type NextApiRequest } from 'next/types';
import { dbInit, dbClose } from '@/db/AppDataSource';

interface Params {
  params: { id: number };
}

export async function DELETE(req: NextApiRequest, { params }: Params): Promise<Response> {
  try {
    await dbInit();
    const p = await params;
    const studentId = await p.id;
    const deletedStudentId = await deleteStudentDb(studentId);

    return new Response(JSON.stringify({ deletedStudentId }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    return new Response(JSON.stringify({
      error: 'Failed to delete student',
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
