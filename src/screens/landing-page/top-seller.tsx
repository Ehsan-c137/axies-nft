import { Image } from "@ui/image";
import { Button } from "@ui/button";

export default function TopSeller() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold">Top Seller</h3>
        <Button>EXPLORE MORE</Button>
      </div>
      <div className="flex flex-wrap gap-10">
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
        <TopSellerItem />
      </div>
    </div>
  );
}

const TopSellerItem = function () {
  return (
    <div className="flex items-center gap-5">
      <div
        className="border-[1px] rounded-4xl hover:rounded-[50px] w-[96px] h-[96px] relative overflow-hidden transition"
        style={{
          transition: "all 300ms ease",
        }}
      >
        <Image src="/avatar_1.png" width={96} height={96} alt="" />
      </div>
      <div className="flex flex-col">
        <p className="text-sm font-bold">Crispin Berry</p>
        <p className="text-sm font-bold">214.2 ETH</p>
      </div>
    </div>
  );
};
