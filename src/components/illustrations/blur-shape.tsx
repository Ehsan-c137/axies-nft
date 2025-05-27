import type { SVGProps } from "react";
const BlurShape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    className="blur-pattern-1 pos-absolute"
    viewBox="0 0 258 230"
    {...props}
  >
    <g filter="url(#a)">
      <ellipse cx={129} cy={115} fill="#5142FB" rx={36} ry={22} />
    </g>
    <defs>
      <filter
        id="a"
        width={258}
        height={230}
        x={0}
        y={0}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur
          result="effect1_foregroundBlur_45_2157"
          stdDeviation={46.5}
        />
      </filter>
    </defs>
  </svg>
);
export default BlurShape;
