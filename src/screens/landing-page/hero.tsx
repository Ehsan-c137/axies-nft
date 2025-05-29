import { Button } from "@ui/button";
import RocketIcon from "@icons/rocket-icon";
import Package from "@icons/package-icon";
import Elispse from "@illustrations/ellipse";
import ElispseOutline from "@illustrations/ellipse-outline";
import { HeroCharacter } from "@/components/illustrations/hero-character";
import BlobShape from "@/assets/illustrations/BlobShape.svg?url";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";

export function Hero() {
  return (
    <div
      style={{
        height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      }}
      className={`flex flex-col xl:flex-row items-center justify-between gap-8`}
    >
      <div className="flex flex-col gap-8">
        <h1 className="max-w-[510px] font-bold text-5xl leading-16">
          Discover, and collect extraordinary Monster NFTs
        </h1>
        <p>
          Marketplace for Moster Character Collectons Non Fungible Token NFTs
        </p>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <RocketIcon /> Explore
          </Button>
          <Button variant="outline">
            <Package /> Create
          </Button>
        </div>
      </div>
      <Character />
    </div>
  );
}

function Character() {
  return (
    <div className="relative flex items-center justify-center">
      {Array.from({ length: 4 }).map((_, index) => {
        const positions = [
          { left: "30%", top: "10%" },
          { right: "30%", top: "30%" },
          { left: "30%", bottom: "10%" },
          { right: "30%", bottom: "50%" },
        ];
        return (
          <Elispse
            key={index}
            style={{ ...positions[index], width: 10 + index * index + 1 }}
            className="z-1 absolute rounded-full"
          />
        );
      })}
      {Array.from({ length: 4 }).map((_, index) => {
        const positions = [
          { left: "30px", top: "50%" },
          { right: "20%", top: "50%" },
          { right: "15%", top: "80%" },
          { top: "30%", right: "50%" },
        ];
        return (
          <img
            src={`/assets/hero/plus${index + 1}.png`}
            alt=""
            key={index}
            className="absolute z-1"
            style={{ ...positions[index] }}
          />
        );
      })}
      <img className="absolute" src={"/assets/hero/plus2.png"} alt="" />
      <img className="absoloute" src={BlobShape.src} alt="" />
      <HeroCharacter className="absolute" />
      <img
        className="absolute left-[10%] bottom-[10%]"
        src="/assets/hero/saturn.png"
        alt=""
      />
    </div>
  );
}
