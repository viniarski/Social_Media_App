import { sql } from '@vercel/postgres';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request, context) {
  const { id } = context.params;
  const { userId, content } = await request.json();

  try {
    const { user } = await getAuth(request);

    if (!user || user.id !== userId) {
      return new Response('Unauthorized', { status: 403 });
    }

    await sql`
      INSERT INTO comments (post_id, user_id, content)
      VALUES (${id}, ${userId}, ${content})
    `;

    return new Response('Comment created', { status: 201 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}

export async function GET(request, context) {
  const { id } = context.params;

  try {
    const comments = await sql`
      SELECT c.id, c.content, c.created_at, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ${id}
      ORDER BY c.created_at DESC
    `;

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
