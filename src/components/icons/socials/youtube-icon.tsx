import type { SVGProps } from "react";
const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="#000"
    viewBox="0 -3 20 20"
    stroke="currentColor"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      stroke="none"
      strokeWidth={1}
      d="M7.988 9.586V3.974c1.993.938 3.536 1.843 5.36 2.82-1.505.834-3.367 1.77-5.36 2.792m11.103-8.403c-.344-.453-.93-.805-1.553-.922-1.833-.348-13.267-.349-15.099 0q-.752.142-1.328.673C-.5 2.429.005 10.452.393 11.75c.164.562.375.968.64 1.235.343.352.812.594 1.351.703 1.51.312 9.284.486 15.122.047a2.6 2.6 0 0 0 1.39-.712c1.49-1.49 1.388-9.962.195-11.841"
    />
  </svg>
);
export default YoutubeIcon;
