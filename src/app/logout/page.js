'use client'; // クライアントコンポーネントとしてマーク

import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await signOut(auth);
        router.push('/'); // ホームページにリダイレクト
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };

    handleLogout();
  }, [router]);

  return <p>Logging out...</p>; // ユーザーにログアウト中であることを知らせる
};

export default Logout;
