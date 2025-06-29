import type { SVGProps } from "react";
const FireIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    stroke="currentColor"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#5142FB"
        d="M9.844.839c0-.837-1.078-1.152-1.552-.459-4.354 6.365 1.833 6.651 1.833 9.745a2.25 2.25 0 0 1-2.28 2.25c-1.236-.016-2.22-1.047-2.22-2.283V7.085c0-.762-.93-1.133-1.457-.58-.94.989-1.918 2.682-1.918 4.745A6.76 6.76 0 0 0 9 18a6.76 6.76 0 0 0 6.75-6.75c0-5.987-5.906-6.785-5.906-10.411"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h18v18H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default FireIcon;
