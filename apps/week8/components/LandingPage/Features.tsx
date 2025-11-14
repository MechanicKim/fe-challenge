import Feature from "./Feature";
import styles from "./LandingPage.module.css";

interface FeaturesResponse {
  success: boolean;
  features: {
    id: number;
    img: {
      src: string;
      alt: string;
    };
    title: string;
    description: string;
  }[];
}

async function fetchFeatures(): Promise<FeaturesResponse> {
  const response = await fetch("http://localhost:3000/api/week8/features");
  const result = await response.json();
  return result;
}

export default async function Features() {
  const { success, features } = await fetchFeatures();

  if (!success) return null;

  return (
    <section className={styles.features}>
      <h2>주요 기능</h2>
      <div>
        {features.map(({ id, img, title, description }) => (
          <Feature
            key={id}
            src={img.src}
            imgAlt={img.alt}
            title={title}
            description={description}
          />
        ))}
      </div>
    </section>
  );
}
