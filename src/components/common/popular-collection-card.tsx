import { Image } from "@ui/image";

export default function PopularCollectionCard() {
  return (
    <div className="flex flex-col gap-6 gap-y-6 bg-[var(--card)] p-4 rounded-2xl max-w-[450px]">
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(1, 1fr)",
        }}
      >
        {Array.from({ length: 5 }).map((image, index) => {
          const layout = [
            { gridColumn: "span 3 / span 3" },
            { gridColumn: "span 3 / span 3" },
            { gridColumn: "span 2 / span 2" },
            {
              gridColumn: "span 2 / span 2",
              gridColumnStart: 3,
              gridRowStart: 2,
            },
            {
              gridColumn: "span 2 / span 2",
              gridColumnStart: 5,
              gridRowStart: 2,
            },
          ];
          return (
            <Image
              key={index}
              src={"/assets/Rectangle.png"}
              style={{ ...layout[index] }}
              width={0}
              height={0}
              alt=""
              sizes="100vw"
              className="w-full h-auto"
            />
          );
        })}
      </div>
      <div className="flex items-center gap-4">
        <Avatar />
        <div className="flex flex-col">
          <p>Creative Art Collection</p>
          <p className="text-xs">Created by Relph Garraway</p>
        </div>
      </div>
    </div>
  );
}

const Avatar = () => (
  <div>
    <Image
      width={64}
      height={64}
      alt=""
      className="rounded-3xl"
      src={"/assets/Rectangle.png"}
    />
  </div>
);
