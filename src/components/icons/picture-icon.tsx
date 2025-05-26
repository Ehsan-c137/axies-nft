import type { SVGProps } from "react";
const PictureIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 26"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.65 3.25H5.297c-1.133 0-2.051.97-2.051 2.167v15.166c0 1.197.918 2.167 2.05 2.167H19.65c1.132 0 2.05-.97 2.05-2.167V5.417c0-1.197-.918-2.167-2.05-2.167"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.885 10.833c.85 0 1.538-.727 1.538-1.625 0-.897-.689-1.625-1.538-1.625s-1.538.728-1.538 1.625c0 .898.689 1.625 1.538 1.625M21.7 16.25l-5.126-5.417L5.297 22.75"
    />
  </svg>
);
export default PictureIcon;
