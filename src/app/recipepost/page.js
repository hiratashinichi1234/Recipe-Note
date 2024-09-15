import Recipepost from '../../components/Recipepost'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../../styles/global.css'; // グローバルスタイルのインポート

export default function RecipepostPage() {
    return (
      <main>
        <Header />
        <Recipepost />
        <Footer />
      </main>
    );
  }
  