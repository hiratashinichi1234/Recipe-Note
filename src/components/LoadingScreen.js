// src/components/LoadingScreen.js
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'; // CSS モジュールをインポート

const LoadingScreen = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // 1秒後にローディングスクリーンをフェードアウト
    const timer = setTimeout(() => {
      setHidden(true);
    }, 1000); // 1秒のディレイ

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  return (
    <div className={`${styles['loading-screen']} ${hidden ? styles.hidden : ''}`}>
      <h1>Welcome to Recipe Note</h1>
    </div>
  );
};

export default LoadingScreen;
