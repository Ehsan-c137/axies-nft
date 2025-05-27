import type { SVGProps } from "react";
const EllipseOutline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 38 38"
    {...props}
  >
    <circle cx={19} cy={19} r={17.5} stroke="url(#a)" strokeWidth={3} />
    <defs>
      <linearGradient
        id="a"
        x1={19}
        x2={19}
        y1={0}
        y2={38}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#CB42FB" />
        <stop offset={1} stopColor="#5142FB" />
      </linearGradient>
    </defs>
  </svg>
);
export default EllipseOutline;
