interface IconProps {
  size: number;
  color?: string;
}

const ArrowGoBackIcon = ({ size, color }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"
      fill="rgba(255,255,255,1)"
    />
  </svg>
);
export default ArrowGoBackIcon;
