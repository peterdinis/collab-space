import { File, ArrowRight } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Footer } from "../shared/Footer";

const HomeWrapper: FC = () => {
  return (
    <div className="flex min-h-full flex-col dark:bg-[#1F1F1F]">
      <div className="flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start">
        <div className="max-4xl space-y-4">
          <main className="h-full pt-40">
            <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
              Your
              <File size={38} className="m-2 inline-flex" />
              <span className="underline decoration-from-font underline-offset-4">
                wiki
              </span>
              ,
              <File size={38} className="m-2 inline-flex" />
              <span className="underline decoration-from-font underline-offset-4">
                docs
              </span>
              ,
              <br /> &amp;
              <File size={38} className="m-2 inline-flex" />
              <span className="underline decoration-from-font underline-offset-4">
                projects
              </span>
              . Together.
            </h1>
            <h3 className="text-base mt-10 font-medium sm:text-xl md:text-2xl">
              Collab Orbit is the connected workspace where <br />
              better, faster work happens.
            </h3>

            <Button asChild className="mt-5">
              <Link href="/login">
                Try now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeWrapper;
