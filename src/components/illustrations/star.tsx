import type { SVGProps } from "react";
const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <foreignObject width={25.081} height={25.501} x={-3.881} y={-3.521}>
      <div
        xmlns="http://www.w3.org/1999/xhtml"
        style={{
          backdropFilter: "blur(2px)",
          clipPath: "url(#a)",
          height: "100%",
          width: "100%",
        }}
      />
    </foreignObject>
    <path
      fill="url(#b)"
      d="m11.55.48-.54 6.684 6.19 2.58-6.524 1.551-.54 6.685-3.492-5.725-6.525 1.552 4.367-5.091L.993 2.99l6.191 2.58z"
      data-figma-bg-blur-radius={4}
    />
    <defs>
      <linearGradient
        id="b"
        x1={11.55}
        x2={4.45}
        y1={0.479}
        y2={17.521}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#5142FB" stopOpacity={0.75} />
        <stop offset={1} stopColor="#7E51E5" />
      </linearGradient>
      <clipPath id="a" transform="translate(3.88 3.52)">
        <path d="m11.55.48-.54 6.684 6.19 2.58-6.524 1.551-.54 6.685-3.492-5.725-6.525 1.552 4.367-5.091L.993 2.99l6.191 2.58z" />
      </clipPath>
    </defs>
  </svg>
);
export default Star;
