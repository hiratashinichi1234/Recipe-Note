'use client'; // クライアントコンポーネントとしてマーク
import { useState } from 'react';
import styles from '../styles/Recipepost.module.css';

export default function Recipepost() {
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !title || !content) {
            alert('全てのフィールドを入力してください。');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);

        try {
            const response = await fetch('/api/share', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Server Response:', data);
            alert('レシピが投稿されました。');

            setImageUrl(`/uploads/${image.name}`);
        } catch (error) {
            console.error('Error posting recipe:', error);
            alert('レシピの投稿に失敗しました。');
        }
    };

    const handleDelete = () => {
        setImage(null);
        setTitle('');
        setContent('');
        setImageUrl('');
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>レシピを投稿</h1>
                <p>自分で作ったレシピをシェアしてみんなに届けよう</p>
            </header>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="image">レシピ画像</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="title">レシピ名</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="content">レシピ内容</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="4"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={`${styles.button} ${styles.post}`}>
                        レシピ投稿
                    </button>
                    <button type="button" className={`${styles.button} ${styles.delete}`} onClick={handleDelete}>
                        <span className={styles.icon}>🗑️</span> レシピ削除
                    </button>
                </div>
            </form>
            {imageUrl && (
                <div className={styles.result}>
                    <div className={styles.card}>
                        <img src={imageUrl} alt="Uploaded Image" />
                        <div className={styles.cardContent}>
                            <h2>{title}</h2>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
