'use client'; // クライアントコンポーネントとしてマーク
import { useState } from 'react';
import styles from '../styles/Contact.module.css'; // 正しいパスに修正
 
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここでフォームデータを送信する処理を実装
    alert('お問い合わせありがとうございます。');
    // フォームデータのリセット
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className={styles.contactContainer}>
    <h1 className={styles.title}>お問い合わせ</h1>
    <p className={styles.description}>レシピや食に関することでも、お気軽にお問い合わせください。</p>
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name">氏名</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message">内容</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <button type="submit" className={styles.submitButton}>送信</button>
      </div>
    </form>
  </div>
  );
}
