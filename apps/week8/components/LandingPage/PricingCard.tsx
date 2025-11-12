import styles from "./LandingPage.module.css";

interface Props {
  title: string;
  price: string;
  features: {
    name: string;
    available: boolean;
  }[];
}

export default function PricingCard({ title, price, features }: Props) {
  return (
    <div className={styles.pricingCard}>
      <h3>{title}</h3>
      <p>{price}</p>
      <ul>
        {features.map(({ name, available }) => (
          <li
            key={name}
            className={available ? styles.available : styles.unavailable}
          >
            {available ? "✓" : "✗"} {name}
          </li>
        ))}
      </ul>
      <button>선택하기</button>
    </div>
  );
}
