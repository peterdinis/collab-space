"use client";

import useScrollTop from "@/app/_hooks/useScrollToTop";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Orbit } from "lucide-react";
import ThemeSwitch from "./ThemeSwitch";

const Navigation: FC = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "z-50 text-2xl shadow-white font-bold bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-4",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="flex items-center w-full">
        <div className="flex items-center">
          Collab <Orbit className="ml-2 size-8" />
        </div>
        <div className="ml-auto">
          <Button variant={"default"}>Get Started</Button>
        </div>
        <div className="ml-4">
        <ThemeSwitch />
        </div>
      </div>
    </div>
  );
};

export default Navigation;