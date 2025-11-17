import { studentService } from '@/services/StudentService';

export async function POST(): Promise<Response> {
  const students = await studentService.addRandomStudents();

  return new Response(JSON.stringify(students), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
