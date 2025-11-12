import Feature from "./Feature";
import styles from "./LandingPage.module.css";

export default function Features() {
  return (
    <section className={styles.features}>
      <h2>
        주요 기능
      </h2>
      <div>
        <Feature src="/images/deng-xiang--WXQm_NTK0U-unsplash.jpg" imgAlt="기능 1 시각 자료" title="실시간 데이터 분석" description="복잡한 데이터를 직관적인 대시보드로 한눈에 파악하세요." />
        <Feature src="/images/kelly-sikkema-wdnpaTNwOEQ-unsplash.jpg" imgAlt="기능 2 시각 자료" title="자동화된 워크플로우" description="반복적인 업무를 자동화하여 팀의 생산성을 극대화합니다." />
        <Feature src="/images/franck-DoWZMPZ-M9s-unsplash.jpg" imgAlt="기능 3 시각 자료" title="강력한 보안" description="최신 보안 기술을 적용하여 당신의 데이터를 안전하게 보호합니다." />
      </div>
    </section>
  );
}