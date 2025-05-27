import type { SVGProps } from "react";
const Ellipse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 11 11"
    {...props}
  >
    <foreignObject width={24.062} height={24.062} x={-6.92} y={-6.277}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(3.5px)",
          clipPath: "url(#a)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <circle
      cx={5.112}
      cy={5.754}
      r={5.03}
      fill="url(#b)"
      data-figma-bg-blur-radius={7}
      transform="rotate(68.023 5.112 5.754)"
    />
    <defs>
      <linearGradient
        id="b"
        x1={5.112}
        x2={5.112}
        y1={0.725}
        y2={10.784}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C758EA" />
        <stop offset={1} stopColor="#7150E5" />
      </linearGradient>
      <clipPath id="a" transform="translate(6.92 6.277)">
        <circle
          cx={5.112}
          cy={5.754}
          r={5.03}
          transform="rotate(68.023 5.112 5.754)"
        />
      </clipPath>
    </defs>
  </svg>
);
export default Ellipse;
