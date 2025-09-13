import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date.getTime() -
    start.getTime() +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export const dynamic = "force-dynamic"; // evita cachear; muestra el 
versículo del día

export default async function HomePage() {
  const supabase = await createClient();

  const today = new Date();
  const dayOfYear = getDayOfYear(today); // 1..365

  // 1) Intenta leer desde la BD
  const { data: verse } = await supabase
    .from("versiculos")
    .select("reference, text")
    .eq("day_number", dayOfYear)
    .maybeSingle();

  // 2) Fallback si no hay registro para hoy
  const fallback = {
    reference: "Juan 14:6",
    text: "Yo soy el camino, la verdad y la vida.",
  };

  const ref = verse?.reference ?? fallback.reference;
  const txt = verse?.text ?? fallback.text;

  return (
    <main className="min-h-screen flex flex-col items-center 
justify-center bg-gradient-to-b from-blue-50 to-gray-100 text-center p-6">
      {/* Logo */}
      <Image src="/logo.png" alt="Casa de Vida" width={100} height={100} 
className="mb-6" />

      {/* Bienvenida */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4">
        Bienvenido a la Comunidad Casa de Vida 🙏
      </h1>

      {/* Versículo del día */}
      <blockquote className="bg-white shadow-xl rounded-2xl p-6 max-w-lg 
mb-6 border border-gray-200">
        <p className="text-lg text-gray-800 italic 
leading-relaxed">“{txt}”</p>
        <footer className="mt-3 text-gray-600 font-medium">— 
{ref}</footer>
      </blockquote>

      {/* CTA registro (más pastoral) */}
      <div className="bg-blue-600 text-white p-6 rounded-xl shadow-lg mb-4 
max-w-md">
        <p className="mb-3 text-lg font-semibold">
          ¿Quieres ser parte de nuestra comunidad?
        </p>
        <Link
          href="/signup"
          className="bg-white text-blue-700 px-6 py-2 rounded-lg 
font-semibold hover:bg-gray-100 transition"
        >
          Crea tu cuenta aquí
        </Link>
      </div>

      {/* CTA login con toque inspirador */}
      <div className="bg-white border border-gray-300 p-6 rounded-xl 
shadow-md max-w-md">
        <p className="text-gray-700 mb-3">
          Si ya eres parte de la familia Casa de Vida:
        </p>
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg 
font-semibold hover:bg-blue-700 transition"
        >
          Inicia sesión y comparte tu fe
        </Link>
      </div>
    </main>
  );
}

