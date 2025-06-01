'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '../lib/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

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

  useEffect(() => {
    if (!user) return;

    const entriesRef = collection(db, 'users', user.uid, 'entries');
    const q = query(entriesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items: JournalEntry[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        items.push({
          id: docSnap.id,
          title: data.title,
          content: data.content,
          date: data.date,
        });
      });
      setEntries(items);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'entries', id));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Personal Journal</h1>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 border border-gray-700 text-black rounded-sm hover:bg-gray-100 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">My Journal</h2>
          <button
            onClick={() => router.push('/addEntry')}
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-sm hover:bg-gray-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Entry
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-12 grid grid-cols-2">
            <div className="max-w-sm mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No journal entries yet</h3>
              <p className="text-gray-500 mb-6">Start writing your thoughts and memories</p>
              <button
                onClick={() => router.push('/new-entry')}
                className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create your first entry
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  {entries.map((entry) => (
    <div
      key={entry.id}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow"
    >
      {/* Use flex-col on small screens, flex-row on medium and up */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 mb-1 break-words">{entry.title}</h3>
          <p className="text-sm text-gray-500 mb-2">
            {new Date(entry.date).toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
              .replace(',', '')
              .replace(' ', ', ')
              .replace(',', ' at')}
          </p>
          <p className="text-gray-700 leading-relaxed break-words">{entry.content}</p>
        </div>
        <button
          onClick={() => handleDelete(entry.id)}
          className="self-end sm:self-auto sm:ml-4 px-4 py-2 border border-gray-300 rounded hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors shrink-0"
          title="Delete entry"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  ))}
</div>

        )}
      </div>
    </div>
  );
}
