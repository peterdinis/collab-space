import { FC } from "react";
import { Shape1, Shape2 } from "./Shapes";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomeWrapper: FC = () => {
  return (
    <section className="light py-14 md:py-24 bg-white dark:bg-background text-zinc-900 dark:text-white relative overflow-hidden z-10">
			<Shape1 />

			<div className="container px-4 mx-auto relative">
				<div className="grid grid-cols-12 gap-y-6 lg:gap-x-6">
					<div className="col-span-12 lg:col-span-6 xl:pr-12 text-center lg:text-start">
						<div className="flex flex-col justify-center h-full">
							<h2 className="text-3xl ml-4 prose prose-h2: dark:text-white md:text-[70px] md:leading-[85px] font-bold mb-4">
								Collab Space
							</h2>
							<p className="text-[22px] ml-4 prose prose-p: dark:text-white leading-normal opacity-80">
								Unique themes and templates for every budget and every project.
								Take a look and find the right one for you!
							</p>
							<div>
								<Link
									href="/sign-in"
									className="rounded py-3 px-8 hover:bg-opacity-90 duration-300 text-white text-xl inline-flex mt-6 md:mt-12"
								>
									<Button size={"lg"}>Try Now</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-span-12 lg:col-span-6 flex items-center justify-center relative pb-6">
						<Shape2 />

						<img
							src="https://cdn.easyfrontend.com/pictures/cards-1.png"
							alt=""
							className="rounded max-w-full h-auto relative"
						/>
					</div>
				</div>
			</div>
		</section>
  );
};

export default HomeWrapper;
