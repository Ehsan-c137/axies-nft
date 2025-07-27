import { Breadcrumbs } from "@/components/common/breadcrumb";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";

type Props = {
  children: React.ReactNode;
};

export function PageLayout({ children }: Props) {
  return (
    <>
      <div
        className="relative w-full h-full dark:bg-[url(/assets/img_bg_page_title_dark.webp)] bg-[url(/assets/img_bg_page_title_light.webp)] hidden md:flex mb-10"
        style={{ paddingTop: `${HEADER_HEIGHT + 32}px`, paddingBottom: "32px" }}
      >
        <Breadcrumbs />
      </div>
      <section className="px-0 md:px-4">{children}</section>
    </>
  );
}
