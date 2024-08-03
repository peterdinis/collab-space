"use client";

import useScrollTop from "@/app/_hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import {Orbit} from "lucide-react";

const Navigation: FC = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 text-2xl font-bold bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      Collab <Orbit className="ml-2 size-8" />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        <Button variant={"default"}>Get Starterd</Button>
      </div>
    </div>
  );
};

export default Navigation;
