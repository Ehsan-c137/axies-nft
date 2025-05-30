import { Image } from "@ui/image";

export default function PopularCollectionCard() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-2"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
      }}
    >
      {Array.from({ length: 5 }).map((image, index) => {
        const layout = [
          { gridColumn: "span 3 / span 2" },
          { gridColumn: "span 3 / span 3; grid-column-start: 4" },
          { gridColumn: "span 2 / span 2; grid-row-start: 2" },
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
  );
}
