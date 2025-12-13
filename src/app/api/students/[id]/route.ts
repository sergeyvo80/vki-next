import { deleteStudentDb } from '@/db/studentDb';
import { type NextRequest } from 'next/server';
import { dbInit, dbClose } from '@/db/AppDataSource';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    await dbInit();
    const { id } = await params;
    const studentId = parseInt(id, 10);
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
