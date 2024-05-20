"use client";
import Link from "next/link";
import { categoryItems } from "../lib/categoryItems";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);

  return (
    <div className="flex items-center justify-center gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
      {categoryItems.map((item,index) => (
        
          <Link
            href={pathname + "?" + createQueryString("filter", item.name)}
            key={index}
            className={cn(
              search === item.name
                ? "border-b-2 border-black pb-2 flex-shrink-0"
                : "opacity-70 flex-shrink-0",
              "flex flex-col gap-y-3 items-center"
            )}
          >
            <div className="relative w-6 h-6">
              <Image
                src={item.imageUrl}
                alt="Category image"
                className="h-6 w-6"
                width={24}
                height={24}
              />
            </div>
            <p className="text-xs font-medium">{item.title}</p>
          </Link>
      
      ))}
    </div>
  );
};

export default MapFilterItems;
