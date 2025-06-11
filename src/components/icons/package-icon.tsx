import type { SVGProps } from "react";
const PackageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 14 16"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <path d="M13.193 3.436 8.007.283a1.93 1.93 0 0 0-2.014 0L.807 3.436a.267.267 0 0 0 .001.452L7 7.58l6.192-3.692c.167-.1.168-.35.001-.452m.433 1.395L7.5 8.483v6.994c0 .403.418.654.752.451l4.755-2.89c.615-.373.993-1.06.993-1.803V5.057c0-.2-.207-.326-.374-.226M0 5.057v6.178c0 .743.378 1.43.993 1.804l4.755 2.89c.334.202.752-.049.752-.452V8.483L.374 4.831C.208 4.73 0 4.857 0 5.057" />
  </svg>
);
export default PackageIcon;
