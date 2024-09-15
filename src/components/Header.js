// src/components/Header.js
'use client'; // クライアントコンポーネントとしてマーク

import Link from 'next/link';
import styles from '../styles/Header.module.css'; // 正しいパスに修正
import { useUser } from '../context/UserContext'; // パスを修正

const Header = () => {
  const context = useUser();
  
  if (!context) {
    console.error('User context is not available');
    return null;
  }

  const { user } = context;

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>Recipe Note</h1>
      </div>
      <nav className={styles.nav}>
        <Link href="/">ホーム</Link>
        {!user && (
          <>
            <Link href="/auth/register">ユーザー登録</Link>
            <Link href="/auth/login">ログイン</Link>
          </>
        )}
        {user && <Link href="/logout">ログアウト</Link>}
        {user && <Link href="/content">コンテンツ</Link>}
        {user && <Link href="/Kondate">献立提案</Link>}
        {user && <Link href="/recipepost">レシピ投稿</Link>}
        {user && <Link href="/Contact">お問い合わせ</Link>}
       
      </nav>
    </header>
  );
};

export default Header;
