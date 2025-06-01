'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, type User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function NewEntryPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !user) return;

    try {
      await addDoc(collection(db, 'users', user.uid, 'entries'), {
        title,
        content,
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      });

      router.push('/dashboard'); 
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Personal Journal</h1>
            <Link
              href="/login"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors px-3 py-1 rounded"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto text-black bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">New Journal Entry</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="text-sm text-gray-700 block mb-1">Title</label>
              <input
                type="text"
                placeholder="Give your entry a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700 block mb-1">Content</label>
              <textarea
                placeholder="Write your thoughts here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 text-sm"
              />
            </div>

            <div className="flex justify-between">
              <Link
                href="/dashboard"
                className="w-28 flex justify-center items-center text-gray-600 hover:text-gray-900 text-sm py-2.5 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="w-28 bg-gray-900 text-white py-2.5 rounded-md hover:bg-gray-800 transition-colors text-sm"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
