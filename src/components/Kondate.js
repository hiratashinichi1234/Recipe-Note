// src/components/kondate.js
'use client'; // クライアントコンポーネントとしてマーク
import { useState } from 'react';
import styles from '../styles/kondate.module.css'; // CSS モジュールのインポート
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Kondate() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/recipe?ingredient=${ingredient}`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setRecipes(data);
      setError('');
    } catch (err) {
      setError('レシピの取得に失敗しました。');
      setRecipes([]);
    }
  };

  const handleSaveRecipe = (recipe) => {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    savedRecipes.push(recipe);
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
    alert('レシピが保存されました');
  };

  const handleShareRecipe = (recipe) => {
    const shareUrl = recipe.sourceUrl;
    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('レシピリンクがコピーされました'))
      .catch(err => alert('リンクのコピーに失敗しました'));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>レシピ検索</h1>
      <p className={styles.description}>
        忙しくてメニュー作りに悩んだらレシピを紹介してもらいましょう！<br />
        レシピは栄養情報、保存、SNSでシェアできますよ。
      </p>
      <div className={styles.formContainer}>
        <label className={styles.label}>
          食材:
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className={styles.input}
          />
        </label>
        <button onClick={handleSearch} className={styles.button}>レシピ検索</button>
      </div>
      <h2 className={styles.usageTitle}>レシピ検索の使い方</h2>
      <div className={styles.usageExample}>
        <img src="/images/image4.jpg" alt="Example 1" className={styles.exampleImage} />
        <FontAwesomeIcon icon={faArrowRight} className={styles.arrowIcon} />
        <img src="/images/image5.jpg" alt="Example 2" className={styles.exampleImage} />
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {recipes.length > 0 && (
        <div>
          <h2>検索結果</h2>
          <ul>
            {recipes.map(recipe => (
              <li key={recipe.id}>
                <h3>{recipe.title}</h3>
                <img src={recipe.image} alt={recipe.title} width="200" />
                <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                <h4>手順</h4>
                <ol>
                  {recipe.analyzedInstructions[0]?.steps.map(step => (
                    <li key={step.number}>{step.step}</li>
                  ))}
                </ol>
                <p>調理時間: {recipe.readyInMinutes} 分</p>
                <h4>栄養情報</h4>
                <ul>
                  {recipe.nutrition?.nutrients.map(nutrient => (
                    <li key={nutrient.title}>
                      {nutrient.title}: {nutrient.amount} {nutrient.unit}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleSaveRecipe(recipe)}>レシピを保存</button>
                <button onClick={() => handleShareRecipe(recipe)}>レシピを共有</button>
                <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">レシピ詳細</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
