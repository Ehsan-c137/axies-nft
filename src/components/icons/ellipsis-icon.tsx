import type { SVGProps } from "react";
const EllipsisIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-ellipsis-icon lucide-ellipsis"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <circle cx={12} cy={12} r={1} />
    <circle cx={19} cy={12} r={1} />
    <circle cx={5} cy={12} r={1} />
  </svg>
);
export default EllipsisIcon;
