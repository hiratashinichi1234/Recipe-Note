// src/app/page.js
'use client'; // クライアントコンポーネントとしてマーク

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer'; // フッターコンポーネントをインポート
import LoadingScreen from '../components/LoadingScreen'; // ローディングスクリーンをインポート
import styles from '../styles/Home.module.css';
import '../styles/global.css'; // グローバル CSS をインポート
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome CSS をインポート

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
];

const textContents = [
  { title: 'Welcome to Recipe Note', description: 'Discover delicious recipes!' },
  { title: 'Explore New Flavors', description: 'Find recipes that suit your taste.' },
  { title: 'Cook with Joy', description: 'Share and enjoy recipes with friends.' },
];

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000); // 2秒ごとに切り替え

    return () => clearInterval(interval); // クリーンアップ
  }, []);

  useEffect(() => {
    // ローディング画面を一定時間表示
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // ローディングスクリーンを1.5秒表示

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  return (
    <>
    {isLoading && <LoadingScreen />}
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          {images.map((src, index) => (
            <div
              key={index}
              className={`${styles['image-container']} ${currentIndex === index ? styles.active : ''}`}
              style={{ backgroundImage: `url(${src})` }}
            >
              <div className={styles.text}>
                <h1 className={styles.title}>{textContents[index].title}</h1>
                <p className={styles.description}>{textContents[index].description}</p>
              </div>
            </div>
          ))}
        </main>
        <Footer />
      </div>
      </>
  );
}
