import styles from "./LandingPage.module.css";

export default function Hero() {
  return (
    <header className={styles.hero}>
      <h1>
        혁신적인 솔루션으로 비즈니스를 성장시키세요
      </h1>
      <p>
        저희 서비스는 당신의 성공을 위한 최고의 파트너입니다. 지금 바로
        시작해보세요.
      </p>
      <button>
        무료로 시작하기 (CTA)
      </button>
    </header>
  );
}
