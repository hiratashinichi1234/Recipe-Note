'use client';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebaseConfig'; // 修正したパス
import styles from '../../../styles/Auth.module.css'; // CSS モジュールのインポート
import { useRouter } from 'next/navigation'; // 必ずこれを使用
import Link from 'next/link';
import '../../../styles/global.css'; // グローバルスタイルのインポート


const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // useRouter を使用

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/content'); // 登録成功後にコンテンツページにリダイレクト
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.container}>
    <div className={styles.registerContainer}>
      <h1 className={styles.title}>レシピユーザー登録</h1>
      <form onSubmit={handleRegister} className={styles.form}>
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
        <div className={styles.inputField}>
          <label htmlFor="confirmPassword">パスワード(確認):</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.submitButton}>新規レシピユーザー</button>
      </form>
      <p className={styles.linkText}>
        既に登録していますか? <Link href="/auth/login">ログイン</Link>
      </p>
    </div>
  </div>
  );
};

export default Register;
