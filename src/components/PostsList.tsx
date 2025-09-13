'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export default function PostsList() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);

  // cargar posts iniciales
  useEffect(() => {
    fetchPosts();

    // escuchar nuevos posts en tiempo real
    const channel = supabase
      .channel('posts-channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((prev) => [payload.new as Post, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm">
          <p className="text-sm text-gray-600">
            Publicado por <strong>{post.user_id}</strong>
          </p>
          <p className="mt-2 text-gray-800">{post.content}</p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(post.created_at).toLocaleString('es-MX')}
          </p>
        </div>
      ))}
    </div>
  );
}

