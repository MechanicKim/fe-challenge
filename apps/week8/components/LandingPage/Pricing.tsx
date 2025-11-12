import styles from "./LandingPage.module.css";
import PricingCard from "./PricingCard";

export default function Pricing() {
  return (
    <section className={styles.pricing}>
      <h2>요금제 안내</h2>
      <div>
        {/* Pricing Card 1 */}
        <PricingCard
          title="Basic"
          price="월 ₩10,000"
          features={[
            { name: "기능 A", available: true },
            { name: "기능 B", available: true },
            { name: "기능 C", available: false },
          ]}
        />
        {/* Pricing Card 2 (Highlight) */}
        <PricingCard
          title="Pro"
          price="월 ₩30,000"
          features={[
            { name: "기능 A", available: true },
            { name: "기능 B", available: true },
            { name: "기능 C", available: true },
          ]}
        />
      </div>
    </section>
  );
}
