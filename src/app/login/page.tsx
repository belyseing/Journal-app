'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider } from '../lib/firebase'; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Google sign-in failed.');
      }
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password.trim());
      }
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {isSignUp ? 'Create an Account' : 'Sign In'}
          </h2>
          {!isSignUp && (
            <p className="mt-2 text-sm text-gray-500">
              Enter your email and password to access your journal
            </p>
          )}
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              className="w-full px-4 py-2  text-black border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {!isSignUp && (
                <a href="#" className="text-sm text-indigo-600 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-600 hover:underline ml-1"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-400">or</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
