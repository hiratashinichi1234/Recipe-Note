const API_KEY = 'afdac48e5bfd469c8d77dc77bb474836';
const BASE_URL = 'https://api.spoonacular.com/recipes';

export default async function handler(req, res) {
  const { ingredient } = req.query;

  // レシピ検索APIのリクエストURLを構成
  const searchUrl = `${BASE_URL}/complexSearch?query=${ingredient}&apiKey=${API_KEY}&number=5`;

  try {
    const response = await fetch(searchUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const recipeIds = data.results.map(recipe => recipe.id);
    const detailsPromises = recipeIds.map(id =>
      fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`).then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
    );
    const recipesDetails = await Promise.all(detailsPromises);

    res.status(200).json(recipesDetails);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}