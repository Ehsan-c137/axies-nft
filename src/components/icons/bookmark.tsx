import type { SVGProps } from "react";
const Bookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 23"
    {...props}
  >
    <path
      fill="#fff"
      d="M.921 22.667V2.125C.921.951 1.821 0 2.932 0h12.066c1.111 0 2.011.951 2.011 2.125v20.542l-8.044-4.959z"
    />
  </svg>
);
export default Bookmark;
