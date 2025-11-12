import styles from "./LandingPage.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="#">회사소개</a>
        <a href="#">서비스</a>
        <a href="#">문의하기</a>
      </div>
      <p>© {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
    </footer>
  );
}
