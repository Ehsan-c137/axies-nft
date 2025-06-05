type TProps = React.ComponentPropsWithoutRef<"div">;

export function HeroCharacter(props: TProps) {
  return (
    <div className={"relative "} {...props}>
      <img
        src="/assets/hero/hero-character.png"
        alt="Hero Character"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
