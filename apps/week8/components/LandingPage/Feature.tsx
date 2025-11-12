import ImagePlaceholder from "./ImagePlaceholder";
import styles from "./LandingPage.module.css";

interface Props {
  src: string;
  imgAlt: string;
  title: string;
  description: string;
}

export default function Feature({ src, imgAlt, title, description }: Props) {
  return (
    <div className={styles.feature}>
      <ImagePlaceholder width={300} height={180} src={src} text={imgAlt} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
