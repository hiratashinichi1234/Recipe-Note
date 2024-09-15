import Header from '@/components/Header';
import Footer from '../../components/Footer';
import Contact from '../../components/Contact';
import '../../styles/global.css'; // グローバルスタイルのインポート

export default function ContactPage() {
  return (
    <main>
      <Header />
      <Contact />
      <Footer />
    </main>
  );
}
