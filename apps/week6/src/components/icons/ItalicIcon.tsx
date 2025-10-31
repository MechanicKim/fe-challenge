interface Props {
  height?: number;
  width?: number;
  fill?: string;
}

export default function ItalicIcon({
  height = 24,
  width = 24,
  fill = '#212121',
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 -960 960 960"
      width={width}
      fill={fill}
    >
      <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
    </svg>
  );
}
