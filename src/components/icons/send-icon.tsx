import type { SVGProps } from "react";
const SendIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    stroke="currentColor"
    {...props}
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <path d="m18.333 1.667-9.166 9.166M18.333 1.667 12.5 18.333l-3.333-7.5-7.5-3.333z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SendIcon;
