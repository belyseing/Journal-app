"use client";


import Link from "next/link";



export default function Home() {
  return (
   
    <div className="bg-white min-h-screen flex flex-col justify-between px-6">
      <main className="flex flex-col items-center justify-center flex-grow text-center ">
        <h1 className="text-gray-800 text-4xl font-bold mb-6">Your Personal Journal</h1>
        <p className="text-xl text-gray-500">A simple space to capture your thoughts, memories, and reflections.</p>
        <div className="flex gap-6 mt-6">
        <Link
        href="/login"
        className="px-8 py-2 bg-gray-800 text-white rounded-sm border-none hover:bg-gray-700"
        >
        Get Started
       </Link>
          
       <Link
        href="/about"
        className="px-8 py-2 border border-gray-400 text-gray-800 rounded-sm hover:bg-gray-100"
        >
        Learn More
       </Link>
        </div>
      </main>
       {/* Footer */}
       <footer className="text-center text-gray-500 py-4 text-sm bg-gray-50 flex-shrink-0">
        <p>&copy; {new Date().getFullYear()} Personal Journal App</p>
      </footer>
    </div>
  );
}
