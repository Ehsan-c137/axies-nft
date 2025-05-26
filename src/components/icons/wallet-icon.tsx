import type { SVGProps } from "react";
const WalletIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 21"
    {...props}
  >
    <path
      fill="#fff"
      d="M21.434 4.408H4.524a.72.72 0 0 1-.71-.735c0-.405.318-.734.71-.734h17.034c.393 0 .71-.329.71-.735C22.268.987 21.315 0 20.138 0H3.815C2.246 0 .974 1.316.974 2.939v14.694c0 1.623 1.272 2.938 2.84 2.938h17.62c1.243 0 2.254-.988 2.254-2.204V6.612c0-1.215-1.01-2.204-2.254-2.204M19.43 13.96c-.784 0-1.42-.658-1.42-1.47 0-.81.636-1.469 1.42-1.469s1.42.658 1.42 1.47-.636 1.47-1.42 1.47"
    />
  </svg>
);
export default WalletIcon;
