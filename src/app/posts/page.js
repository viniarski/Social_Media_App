import { currentUser } from '@clerk/nextjs';
import { sql } from '@vercel/postgres';
import Link from 'next/link';

export default async function PostsPage() {
  const user = await currentUser();
  const userId = user?.id;

  const { rows: posts } = await sql`
    SELECT p.id, p.content, p.created_at, u.username, u.id AS user_id
    FROM posts p
    JOIN users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
  `;

  const deletePost = async (postId) => {
    await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  };

  return (
    <div className="min-h-screen bg-[#333A73] text-white">
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Posts</h1>
        {Array.isArray(posts) && posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#387ADF] p-4 rounded-lg shadow-md"
              >
                <Link href={`/posts/${post.id}`}>
                  <p className="text-xl font-bold">{post.content}</p>
                  <p className="text-gray-200">By: {post.username}</p>
                  <p className="text-gray-300 text-sm">
                    Posted at: {post.created_at.toLocaleString()}
                  </p>
                </Link>
                {userId === post.user_id && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="mt-2 px-4 py-2 bg-[#FBA834] text-white rounded-md hover:bg-[#F9970E]"
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">No posts found.</p>
        )}
        <div className="mt-8 text-center">
          <Link href="/posts/new">
            <button className="px-6 py-3 bg-[#FBA834] text-white rounded-md hover:bg-[#F9970E]">
              Create New Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
