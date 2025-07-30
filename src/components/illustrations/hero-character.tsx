type TProps = React.ComponentPropsWithoutRef<"div">;

export function HeroCharacter(props: TProps) {
  return (
    <div className={"relative "} {...props}>
      <picture className="w-full h-full object-cover">
        <source srcSet="/assets/hero/hero-character.png" type="image/png" />

        <img
          src="/assets/hero/hero-character.png"
          className="w-full h-full object-cover"
          alt="Hero Character"
          width={800}
          height={500}
        />
      </picture>
    </div>
  );
}
