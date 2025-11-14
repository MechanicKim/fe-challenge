import Image from "next/image";
import styles from "./LandingPage.module.css";

interface Props {
  width?: number;
  height?: number;
  src: string;
  alt?: string;
}

export default function ImagePlaceholder({
  width = 100,
  height = 100,
  src,
  alt = "Image",
}: Props) {
  return (
    <div
      className={styles.imagePlaceholder}
      style={{
        width,
        height,
      }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
