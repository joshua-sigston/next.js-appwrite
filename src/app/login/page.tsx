'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log('Login successful', response.data);
      router.push('/profile');
    } catch (error: any) {
      console.log('Signup failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main>
      <form onSubmit={onLogin}>
        <h2>Login</h2>
        <label htmlFor="password">
          <span>Password</span>
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </label>
        <button>Login</button>
        <Link href="/signup">Signup</Link>
      </form>
    </main>
  );
}
