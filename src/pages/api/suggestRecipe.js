// src/pages/api/suggestRecipe.js
const recipes = [
    { id: 1, title: 'かぼちゃの煮つけ', ingredient: 'かぼちゃ', genre: '和食' },
    { id: 2, title: 'パスタ・アラビアータ', ingredient: 'トマト', genre: 'イタリアン' },
    { id: 3, title: '麻婆豆腐', ingredient: '豆腐', genre: '中華' },
  ];
  
  export default function handler(req, res) {
    const { ingredient, genre } = req.query;
  
    // フィルタリング
    const suggestedRecipes = recipes.filter(recipe =>
      recipe.ingredient === ingredient && recipe.genre === genre
    );
  
    res.status(200).json(suggestedRecipes);
  }
  