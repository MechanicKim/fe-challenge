import styles from "./LandingPage.module.css";

interface Props {
  width?: number;
  height?: number;
  src: string;
  text?: string;
}

export default function ImagePlaceholder({
  width = 100,
  height = 100,
  src,
  text = "Image",
}: Props) {
  return (
    <div
      className={styles.imagePlaceholder}
      style={{
        width,
        height,
      }}
    >
      <img src={src} alt={text} />
    </div>
  );
}
