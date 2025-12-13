import type GroupInterface from '@/types/GroupInterface';
import { groupService } from '@/services/GroupService';
import { dbInit, dbClose } from '@/db/AppDataSource';

const defaultGroups: GroupInterface[] = [
  {
    id: 1,
    name: 'Group-1',
    contacts: 'group1@test.test',
  },
  {
    id: 2,
    name: 'Group-2',
    contacts: 'group2@test.test',
  },
  {
    id: 3,
    name: 'Group-3',
    contacts: 'group3@test.test',
  },
  {
    id: 4,
    name: 'Group-4',
    contacts: 'group4@test.test',
  },
];

export async function GET(): Promise<Response> {
  try {
    await dbInit();
    const newGroups: GroupInterface[] = [];
    const existGroups: GroupInterface[] = [];

    await Promise.all(defaultGroups.map(async (group) => {
      const exists: GroupInterface = await groupService.getGroupsById(group.id);
      if (!exists) {
        const newGroup: GroupInterface = await groupService.addGroup(group);
        newGroups.push(newGroup);
      } else {
        existGroups.push(exists);
      }
    }));

    return new Response(JSON.stringify({
      newGroups,
      existGroups,
    }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding test groups:', error);
    return new Response(JSON.stringify({
      error: 'Failed to add test groups',
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

