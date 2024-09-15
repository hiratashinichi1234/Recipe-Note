import Link from 'next/link';
import styles from '../styles/Footer.module.css'


 
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.title}>Recipe Note</div>
      <div className={styles['social-icons']}>
        <Link href="https://twitter.com" passHref>
          <i className="fab fa-twitter"></i>
        </Link>
        <Link href="https://instagram.com" passHref>
          <i className="fab fa-instagram"></i>
        </Link>
        <Link href="https://line.me" passHref>
          <i className="fab fa-line"></i>
        </Link>
      </div>
      <div className={styles.copyright}>
        &copy; 2024 Recipe Note. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
