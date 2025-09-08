import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center 
justify-center bg-gray-100">
      <div className="w-full">
        <Image
          src="/under-construction.png"
          alt="Casa de Vida App Under Construction"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold text-gray-800">Casa de Vida 
Community App</h1>
        <p className="text-gray-600 mt-2">We are working hard. Stay 
tuned!</p>
      </div>
    </main>
  );
}
