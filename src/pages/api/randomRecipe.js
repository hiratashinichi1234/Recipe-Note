// src/pages/api/randomRecipe.js
export default function handler(req, res) {
    const { recipes } = req.body;
  
    // レシピリストからランダムに選択
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
  
    res.status(200).json(randomRecipe);
  }
  