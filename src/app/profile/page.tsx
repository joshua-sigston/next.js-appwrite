'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState({ username: '', id: '' });
  const router = useRouter();

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/tokenData');
    console.log(response.data.data);
    setUser(response.data.data.username);
    setUser({
      username: response.data.data.username,
      id: response.data.data._id,
    });
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div>
      <h2>{user ? `${user.username}` : 'no data'}</h2>
    </div>
  );
}
