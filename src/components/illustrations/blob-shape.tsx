import type { SVGProps } from "react";

// This is the original path data from the SVG you provided first.
// It should be used for both the fill and the stroke paths.
const originalPathData =
  "M449.967 462.214C427.438 482.301 409.839 507.934 381.984 519.657C349.458 533.345 311.316 548.895 278.56 534.35C245.77 519.79 245.436 470.336 218.09 446.882C179.964 414.181 103.423 421.155 90.219 372.808C77.7914 327.305 145.349 300.692 166.922 259.536C185.79 223.543 173.664 167.306 208.64 146.895C244.721 125.84 291.096 172.063 332.065 163.164C379.758 152.806 414.18 68.2194 457.109 92.9276C503.074 119.383 449.195 203.162 478.599 247.504C504.68 286.837 592.729 264.979 601.773 311.092C610.547 355.825 541.406 374.216 509.652 405.827C489.916 425.474 470.747 443.686 449.967 462.214Z";

const BlobShape = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="699"
    height="637"
    fill="none"
    viewBox="0 0 699 637"
    {...props}
  >
    <g filter="url(#a)">
      {" "}
      {/* shapeRendering can be here or on paths like original */}
      <path
        fillRule="evenodd"
        clipRule="evenodd" // Added back
        d={originalPathData} // Corrected: Using original path data, includes Z
        fill="#9550E5"
        fillOpacity={0.08}
        shapeRendering="crispEdges" // Kept as in your component structure
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd" // Added back
        d={originalPathData} // Corrected: Using original path data, includes Z
        stroke="#5142FB"
        strokeOpacity={0.5}
        strokeWidth={4}
        shapeRendering="crispEdges" // Kept as in your component structure
      />
    </g>
    <defs>
      <filter
        id="a" // Matches url(#a) from the group filter attribute
        x={0.702301} // Using original precision for filter attributes
        y={0.426208} // Using original precision
        width={697.837} // Using original precision
        height={635.766} // Using original precision
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix" // type="matrix" is default but can be explicit
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius={48}
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow_45_2163" // This name is internal to the filter
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={21} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix" // type="matrix" is default
          values="0 0 0 0 0.584314 0 0 0 0 0.313726 0 0 0 0 0.898039 0 0 0 0.15 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_45_2163"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_45_2163"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default BlobShape;
