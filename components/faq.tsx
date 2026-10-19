import { Plus } from "lucide-react";
import { faq } from "@/lib/site";

export default function Faq() {
	return (
		<section id="questions" aria-labelledby="questions-title" className="pb-20 lg:pb-28">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
				<h2
					id="questions-title"
					className="font-expanded text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:col-span-4 lg:text-[2.75rem]">
					Questions fréquentes
				</h2>
				<div className="border-t-2 border-graphite lg:col-span-8">
					{faq.map((item) => (
						<details key={item.q} className="group border-b border-graphite/30">
							<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-minium [&::-webkit-details-marker]:hidden">
								<h3>{item.q}</h3>
								<Plus
									className="size-6 shrink-0 text-minium transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
									aria-hidden="true"
								/>
							</summary>
							<p className="max-w-prose pb-6 pr-10 text-acier">{item.a}</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}
