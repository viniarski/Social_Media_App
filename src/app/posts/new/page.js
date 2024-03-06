import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export default async function CreatePostPage() {
  const user = await currentUser();
  const userId = user?.id;

  const [content, setContent] = useState('');

  const createPost = async () => {
    await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, userId }),
    });

    redirect('/posts');
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post"
      />
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}
