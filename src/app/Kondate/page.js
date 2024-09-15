// src/pages/index.js
import Kondate from '../../components/Kondate';
import Header from '@/components/Header';
import Footer from '../../components/Footer';
import '../../styles/global.css'; // グローバルスタイルのインポート

export default function KondatePage() {
  return (
    <main>
      <Header />
      <Kondate />
      <Footer />
    </main>
  );
}
