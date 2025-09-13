'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <button
      onClick={signOut}
      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg 
text-sm"
    >
      Cerrar sesión
    </button>
  );
}

