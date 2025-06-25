"use client";

import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb";

type Props = {
  children: React.ReactNode;
};

export function PageLayout({ children }: Props) {
  const pathname = usePathname().split("/").filter(Boolean);
  const header = pathname[pathname.length - 1];

  return (
    <>
      <div
        className="relative w-full h-full dark:bg-[url(/assets/img_bg_page_title_dark.webp)] bg-[url(/assets/img_bg_page_title_light.webp)]"
        style={{ paddingTop: `${HEADER_HEIGHT + 32}px`, paddingBottom: "32px" }}
      >
        <div className="container mx-auto w-full flex flex-col gap-4 px-4 md:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">{header.replace("-", " ")}</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem key={pathname.length + 1}>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {pathname.map((item, index) => {
                const newItem = item.replace("-", " ");
                if (item == header) {
                  return (
                    <div className="contents" key={index}>
                      <BreadcrumbSeparator key={index} />
                      <BreadcrumbItem
                        key={item + index}
                        style={{
                          opacity: item === header ? 1 : 0.5,
                        }}
                      >
                        <BreadcrumbPage>{newItem}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </div>
                  );
                }
                return (
                  <div className="contents" key={index}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/${item}`}>
                        {newItem}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      {children}
    </>
  );
}
