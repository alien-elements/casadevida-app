'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setMessage('Account created! You can now sign in.');
      // If confirm email is OFF, you could also auto-redirect:
      // router.push('/dashboard');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center 
bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-md rounded-2xl p-6 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center 
text-gray-800">Create account</h1>

        <label className="block mt-4">
          <span className="text-sm text-gray-700">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="you@example.com"
          />
        </label>

        <label className="block mt-3">
          <span className="text-sm text-gray-700">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2"
            placeholder="Choose a strong password"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {message && <p className="mt-3 text-sm 
text-green-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-black text-white py-2 
disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create account'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </main>
  );
}

