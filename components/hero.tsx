import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import TraceSheet from "./trace-sheet";

const cartouche = [
	{ k: "Atelier", v: `${site.address.locality} (${site.address.postalCode})` },
	{ k: "Secteur", v: "Ambert, Livradois-Forez, Puy-de-Dôme" },
	{ k: "Matières", v: site.materials.join(", ") },
	{ k: "Procédés", v: site.processes },
	{ k: "Devis", v: `Gratuit, ${site.quoteDelay}` },
];

export default function Hero() {
	return (
		<section aria-labelledby="hero-title" className="relative overflow-hidden">
			<div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-24 lg:pt-20">
				<div className="lg:col-span-6 lg:pt-6 xl:col-span-5">
					<p className="font-condensed text-lg font-medium text-acier">
						Artisan chaudronnier, Puy-de-Dôme
					</p>
					<h1
						id="hero-title"
						className="font-expanded mt-4 text-[2.35rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-5xl lg:text-[3.1rem] xl:text-[3.35rem]">
						Chaudronnerie et métallerie sur-mesure à Ambert et Arlanc
					</h1>
					<p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-acier">
						Conception, soudure et réparation pour particuliers et industriels.
						Intervention rapide sur <strong className="font-semibold text-graphite">Ambert, Arlanc</strong>{" "}
						et tout le Livradois-Forez.
					</p>

					<div className="mt-9 flex flex-col gap-3 sm:flex-row">
						<a
							href="#contact"
							className="inline-flex min-h-13 items-center justify-center bg-minium px-7 text-base font-semibold text-white transition-colors hover:bg-minium-dark">
							Demander un devis gratuit
						</a>
						<a
							href={site.phone.href}
							className="inline-flex min-h-13 items-center justify-center gap-2.5 border-2 border-graphite px-7 text-base font-semibold transition-colors hover:bg-graphite hover:text-zinc">
							<Phone className="size-5" aria-hidden="true" />
							{site.phone.display}
						</a>
					</div>
				</div>

				{/* Planche : dessin + cartouche */}
				<figure className="relative lg:col-span-6 xl:col-span-7">
					<div className="border-2 border-graphite bg-[#eceee9] p-2 shadow-[10px_10px_0_0_var(--color-tole)]">
						<div className="border border-graphite/40">
							<div className="px-3 pt-4 sm:px-6 sm:pt-6">
								<TraceSheet />
							</div>
							<dl className="grid grid-cols-2 border-t-2 border-graphite text-sm sm:grid-cols-[repeat(5,auto)]">
								{cartouche.map((c, i) => (
									<div
										key={c.k}
										className={`border-graphite/40 px-3 py-2.5 sm:px-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i ? "sm:border-l" : ""} ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
										<dt className="font-condensed text-[0.8rem] font-medium text-acier">{c.k}</dt>
										<dd className="mt-0.5 font-semibold leading-snug">{c.v}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
					<figcaption className="font-condensed mt-5 text-[0.95rem] text-acier">
						Le traçage d&apos;une trémie carré-rond : avant de souder, le chaudronnier
						calcule et déplie la tôle.
					</figcaption>
				</figure>
			</div>
			<div className="revenu h-1.5 w-full" aria-hidden="true" />
		</section>
	);
}
