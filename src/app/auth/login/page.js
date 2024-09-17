'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig'; // 正しいパスを指定
import styles from '../../../styles/Auth.module.css'; // CSS モジュールのインポート
import { useRouter } from 'next/navigation'; // useRouter を使用
import Link from 'next/link';
import '../../../styles/global.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter を使用

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/content'); // ログイン成功後にコンテンツページにリダイレクト
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>ログイン</h1>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputField}>
            <label htmlFor="email">メールアドレス:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">パスワード:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <button type="submit" className={styles.submitButton}>ログイン</button>
        </form>
        <p className={styles.linkText}>
        ユーザー登録はまだですか？ <Link href="/auth/register">ユーザー登録</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
