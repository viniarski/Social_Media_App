import { sql } from '@vercel/postgres';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request) {
  const { userId, content } = await request.json();

  try {
    const { user } = await getAuth(request);

    if (!user || user.id !== userId) {
      return new Response('Unauthorized', { status: 403 });
    }

    await sql`
      INSERT INTO posts (content, user_id)
      VALUES (${content}, ${userId})
    `;

    return new Response('Post created', { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
