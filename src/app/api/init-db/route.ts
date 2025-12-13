import { addGroupsDb } from '@/db/groupDb';
import { addStudentDb } from '@/db/studentDb';
import { dbInit, dbClose } from '@/db/AppDataSource';

export async function GET(): Promise<Response> {
  try {
    await dbInit();
    const newStudent = await addStudentDb({
      firstName: 'fname',
      lastName: 'lname',
      middleName: 'mname',
      groupId: 1,
    });

    const newGroup = await addGroupsDb({
      name: 'name',
      contacts: '',
    });

    console.log(newStudent, newGroup);

    return new Response(JSON.stringify({
      newStudent,
      newGroup,
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return new Response(JSON.stringify({
      error: 'Failed to initialize database',
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
