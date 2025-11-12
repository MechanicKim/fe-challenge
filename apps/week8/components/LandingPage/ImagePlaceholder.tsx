import styles from "./LandingPage.module.css";

interface Props {
  width?: number;
  height?: number;
  text?: string;
}

export default function ImagePlaceholder({
  width = 100,
  height = 100,
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
      {text}
    </div>
  );
}
