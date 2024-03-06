import { sql } from '@vercel/postgres';
import { getAuth } from '@clerk/nextjs/server';

export async function DELETE(request, context) {
  const { id } = context.params;

  try {
    const { user } = await getAuth(request);

    if (!user) {
      return new Response('Unauthorized', { status: 403 });
    }

    const [post] = await sql`
      SELECT * FROM posts WHERE id = ${id} AND user_id = ${user.id}
    `;

    if (!post) {
      return new Response('Post not found or unauthorized', { status: 404 });
    }

    await sql`DELETE FROM posts WHERE id = ${id}`;

    return new Response('Post deleted', { status: 200 });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
