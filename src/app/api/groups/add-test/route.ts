import { dbInit } from '@/db/AppDataSource';
import { groupService } from '@/services/GroupService';

export async function POST(): Promise<Response> {
  await dbInit();

  const newGroups = [];
  for (let i = 1; i <= 4; i++) {
    const newGroup = await groupService.addGroup({
      name: `Group-${i}`,
      contacts: '',
    });
    newGroups.push(newGroup);
  }

  return new Response(JSON.stringify({
    newGroups,
  }), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
