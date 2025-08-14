type TProps = React.ComponentPropsWithoutRef<"div">;

export function HeroCharacter(props: TProps) {
  return (
    <div className={"relative "} {...props}>
      <picture className="w-full h-full object-cover">
        <source srcSet="/assets/hero/hero-character.webp" type="image/webp" />

        <img
          src="/assets/hero/hero-character.webp"
          className="w-full h-full object-cover"
          alt="Hero Character"
          width={800}
          height={500}
        />
      </picture>
    </div>
  );
}
