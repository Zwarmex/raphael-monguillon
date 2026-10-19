import { services } from "@/lib/site";
import { illustrations } from "./illustrations";

export default function Services() {
	return (
		<section id="savoir-faire" aria-labelledby="savoir-faire-title" className="py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
				<div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
					<h2
						id="savoir-faire-title"
						className="font-expanded text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:col-span-6 lg:text-[2.75rem]">
						Trois métiers, un seul atelier
					</h2>
					<p className="max-w-xl text-lg text-acier lg:col-span-5 lg:col-start-8 lg:pt-2">
						Précision et robustesse pour tous vos projets : de l&apos;escalier de la
						maison au châssis d&apos;usine, jusqu&apos;au godet qui doit repartir au
						chantier.
					</p>
				</div>

				<ul className="mt-14 border-t-2 border-graphite">
					{services.map((s) => {
						const Illustration = illustrations[s.id];
						return (
							<li
								key={s.id}
								id={s.id}
								className="group grid gap-6 border-b border-graphite/30 py-10 md:grid-cols-12 md:gap-8 lg:py-12">
								<div className="md:col-span-4 lg:col-span-3">
									<div className="aspect-[3/2] border border-graphite/25 bg-[#eceee9] p-4 text-graphite transition-colors group-hover:border-graphite/60">
										<Illustration className="h-full w-full" />
									</div>
								</div>
								<div className="md:col-span-8 lg:col-span-5 lg:col-start-5">
									<p className="font-condensed text-base font-medium text-minium">{s.for}</p>
									<h3 className="font-expanded mt-1 text-2xl font-bold tracking-[-0.01em] lg:text-[1.75rem]">
										{s.title}
									</h3>
									<p className="mt-3 max-w-prose text-acier">{s.desc}</p>
								</div>
								<ul
									aria-label={`Exemples : ${s.title}`}
									className="flex flex-wrap content-start gap-2 md:col-span-8 md:col-start-5 lg:col-span-3 lg:col-start-10 lg:pt-7">
									{s.items.map((it) => (
										<li
											key={it}
											className="font-condensed border border-graphite/30 px-3 py-1 text-[0.95rem] font-medium">
											{it}
										</li>
									))}
								</ul>
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
}
