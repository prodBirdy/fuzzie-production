
'use client'
import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

const LinkedInPostButton = () => {
  const { isSignedIn, user } = useUser();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isSignedIn) {
      alert('Please sign in to post to LinkedIn.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Post successful');
        setContent('');  // Clear textarea after posting
      } else {
        alert(data.message || 'Failed to post');
      }
    } catch (error) {
      console.error('Error posting to LinkedIn:', error);
      alert('An error occurred while posting.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your LinkedIn post here..."
        disabled={!isSignedIn || loading}
        required
      ></textarea>
      <button type="submit" disabled={!isSignedIn || loading}>
        {loading ? 'Posting...' : 'Post to LinkedIn'}
      </button>
    </form>
  );
};

export default LinkedInPostButton;
