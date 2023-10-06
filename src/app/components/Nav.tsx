'use client';
import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('login');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <button
        className="rounded-lg bg-pink-200 px-2 py-1"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}
