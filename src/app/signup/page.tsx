'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async (e: any) => {
    e.preventDefault();
    console.log('tst');
    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="flex flex-col items-center justify-center bg-pink-50/50 min-h-screen">
      <form
        onSubmit={onSignup}
        className=" flex flex-col items-start gap-x-2 gap-y-4 w-50 p-3 rounded-lg bg-pink-200"
      >
        <h2 className="self-center">Signup</h2>
        <label
          htmlFor="username"
          className="flex gap-x-3 justify-between w-full"
        >
          <span>Username</span>
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            className="rounded-sm p-1"
          />
        </label>
        <label
          htmlFor="password"
          className="flex gap-x-3 justify-between w-full"
        >
          <span>Password</span>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            className="rounded-sm p-1"
          />
        </label>
        <label htmlFor="email" className="flex gap-x-3 justify-between w-full">
          <span>Email</span>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
            className="rounded-sm p-1"
          />
        </label>
        <button className="py-1 px-2 bg-pink-400 rounded-md self-center">
          {isLoading ? 'Processing' : 'Sign Up'}
        </button>
        <Link
          href="/login"
          className="py-1 px-2 bg-cyan-200 rounded-md self-center"
        >
          Login
        </Link>
      </form>
    </main>
  );
}
