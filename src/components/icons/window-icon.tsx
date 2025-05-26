import type { SVGProps } from "react";
const WindowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      fill="#fff"
      d="M20.198 0H2.453a1.44 1.44 0 0 0-1.045.458C1.13.75.975 1.148.975 1.563v18.75c0 .414.156.811.433 1.104a1.44 1.44 0 0 0 1.045.458h17.745a1.44 1.44 0 0 0 1.046-.458c.277-.293.433-.69.433-1.105V1.563c0-.414-.156-.811-.433-1.104A1.44 1.44 0 0 0 20.198 0m-1.479 3.125v6.25h-5.915v-6.25zm-8.872 0v6.25H3.932v-6.25zM3.932 18.75V12.5h5.915v6.25zm8.872 0V12.5h5.915v6.25z"
    />
  </svg>
);
export default WindowIcon;
