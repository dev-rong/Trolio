interface IconProps {
  size: number;
  color?: string;
}

const PortfolioFillIcon = ({ size, color }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    height={size}
    fill={color}
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M22 11v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-9h20zm0-2H2V4a1 1 0 0 1 1-1h7.414l2 2H21a1 1 0 0 1 1 1v3z" />
  </svg>
);
export default PortfolioFillIcon;
