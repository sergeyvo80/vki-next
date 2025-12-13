import { getStudentsDb, addStudentDb } from '@/db/studentDb';
import { type NextApiRequest } from 'next/types';
import { dbInit, dbClose } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  try {
    await dbInit();
    const students = await getStudentsDb();

    return new Response(JSON.stringify(students), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error getting students:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get students',
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

export async function POST(req: NextApiRequest): Promise<Response> {
  try {
    await dbInit();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const student = await req.json();
    delete student['id'];
    const newStudent = await addStudentDb(student);

    console.log(newStudent);
    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding student:', error);
    return new Response(JSON.stringify({
      error: 'Failed to add student',
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
