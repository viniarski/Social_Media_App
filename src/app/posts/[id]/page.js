'use client';

import { currentUser } from '@clerk/nextjs';
import { sql } from '@vercel/postgres';
import { useState } from 'react';

export default async function PostDetailsPage({ params }) {
  const user = await currentUser();
  const userId = user?.id;

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const post = await sql`
    SELECT p.id, p.content, p.created_at, u.username
    FROM posts p
    JOIN users u ON p.user_id = u.id
    WHERE p.id = ${params.id}
  `;

  const fetchComments = async () => {
    const res = await fetch(`/api/posts/${params.id}/comments`);
    const comments = await res.json();
    setComments(comments);
  };

  const addComment = async () => {
    await fetch(`/api/posts/${params.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: comment, userId }),
    });

    setComment('');
    await fetchComments();
  };

  await fetchComments();

  return <div>{/* JSX for rendering the post details */}</div>;
}
