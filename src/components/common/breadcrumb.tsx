"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function Breadcrumbs({}) {
  const pathname = usePathname().split("/").filter(Boolean);
  const header = pathname[pathname.length - 1];

  return (
    <div className="flex flex-col container mx-auto w-full gap-4 px-4 md:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem key={pathname.length + 1}>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          {pathname.map((item, index) => {
            const newItem = item.replace("-", " ");
            if (item == header) {
              return (
                <Fragment key={index}>
                  <BreadcrumbSeparator key={index} />
                  <BreadcrumbItem
                    key={item + index}
                    style={{
                      opacity: item === header ? 1 : 0.5,
                    }}
                  >
                    <BreadcrumbPage>{newItem}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              );
            }
            return (
              <Fragment key={index}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/${item}`}>{newItem}</BreadcrumbLink>
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
