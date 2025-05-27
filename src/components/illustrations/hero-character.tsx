import { SVGProps } from "react";

export function HeroCharacter(props) {
  return (
    <div className="relative w-[296px] h-[480px]" {...props}>
      <img
        src="/assets/hero/hero-character.png"
        alt="Hero Character"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
