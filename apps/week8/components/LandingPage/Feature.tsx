import ImagePlaceholder from "./ImagePlaceholder";
import styles from "./LandingPage.module.css";

interface Props {
  imgAlt: string;
  title: string;
  description: string;
}

export default function Feature({ imgAlt, title, description }: Props) {
  return (
    <div className={styles.feature}>
      <ImagePlaceholder width={300} height={180} text={imgAlt} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
