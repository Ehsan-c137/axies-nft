import type { SVGProps } from "react";
const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M19.688 10A9.686 9.686 0 0 0 10 .313 9.686 9.686 0 0 0 .313 10c0 4.835 3.542 8.843 8.173 9.57V12.8h-2.46V10h2.46V7.866c0-2.428 1.446-3.77 3.66-3.77 1.06 0 2.168.19 2.168.19v2.383h-1.222c-1.203 0-1.578.747-1.578 1.513V10H14.2l-.43 2.8h-2.256v6.77c4.63-.727 8.174-4.735 8.174-9.57"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default FacebookIcon;
