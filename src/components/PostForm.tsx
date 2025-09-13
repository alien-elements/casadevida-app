'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PostForm({ userId }: { userId: string }) {
  const supabase = createClient();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('posts').insert([
      { content, user_id: userId },
    ]);
    setLoading(false);

    if (!error) setContent('');
  }

  return (
    <form
      onSubmit={handlePost}
      className="bg-white p-4 rounded-xl shadow-sm"
    >
      <p className="text-gray-700 font-semibold mb-2">
        ¿Qué quieres compartir hoy?
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escribe tus pensamientos, oraciones o bendiciones..."
        className="w-full border rounded-lg p-2 text-sm focus:ring-2 
focus:ring-blue-500"
        rows={3}
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-2 bg-blue-600 text-white text-sm px-4 py-2 
rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Publicando…' : 'Publicar'}
      </button>
    </form>
  );
}

