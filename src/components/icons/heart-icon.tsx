import type { SVGProps } from "react";
const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 11 11"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.552 2.113a2.52 2.52 0 0 0-3.566 0l-.486.486-.486-.486a2.521 2.521 0 0 0-3.566 3.566l.486.486L5.5 9.73l3.566-3.565.486-.486a2.52 2.52 0 0 0 0-3.566"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h11v11H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default HeartIcon;
