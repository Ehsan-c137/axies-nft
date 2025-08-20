import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

type imageProp = {
  src: string;
  name: string;
  slug: string;
  itemPerPage: number;
};

export default function SwiperItem({
  image,
  activeIndex,
  index,
  itemPerPage,
}: {
  image: imageProp;
  activeIndex: number;
  index: number;
  itemPerPage: number;
}) {
  return (
    <li
      className="flex flex-col justify-center items-center w-full max-w-full max-h-[600px] overflow-hidden touch-pan-y p-4 list-none"
      style={{
        width: `calc(100% / ${itemPerPage} )`,
      }}
    >
      <Image
        src={image.src + "?imwidth=320"}
        alt={`Slide ${index} ${image.name}`}
        className={clsx("w-full h-auto select-none", {
          "active opacity-100": index === activeIndex,
        })}
        style={{
          objectFit: "cover",
        }}
        draggable={false}
        unoptimized
        width={254}
        height={311}
      />

      <Link href={`products/${image.slug}`}>
        <p
          className={clsx("text-starttruncate text-titleActive", {
            "active opacity-100 transition translate-x-0":
              index === activeIndex,
          })}
        >
          {image.name}
        </p>
      </Link>
    </li>
  );
}
