import { PreviewCard } from "@/components/common/cards/preview-card";

interface IProps {
  title: string;
  creator: string;
  price: number;
  timeLeft: string;
  imageUrl?: string;
}

export default function Preview({
  title,
  creator,
  price,
  timeLeft,
  imageUrl,
}: IProps) {
  return (
    <div className="flex flex-col md:justify-start md:flex-1/3 gap-4">
      <h4 className="text-lg font-bold">Preview item</h4>
      <div className="w-full flex justify-center md:justify-start">
        <PreviewCard
          title={title}
          creator={creator}
          price={price}
          timeLeft={"5 : 23 : 22 : 08"}
          imageUrl={imageUrl || "/assets/Rectangle.png"}
        />
      </div>
    </div>
  );
}
