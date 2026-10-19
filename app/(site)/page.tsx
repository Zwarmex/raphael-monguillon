import { existsSync } from "node:fs";
import { join } from "node:path";
import { ChevronRight, Flame, Layers, PencilRuler, Phone, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Configurator from "@/components/configurator";
import ContactForm from "@/components/contact-form";
import { FeuMark } from "@/components/feu/logo";
import { pieces } from "@/components/feu/pieces";
import Realisations from "@/components/feu/realisations";
import Sparks from "@/components/feu/sparks";
import { illustrations } from "@/components/illustrations";
import { faq, offer, phoneIsPlaceholder, realisations, site, steps, story } from "@/lib/site";

// Photo de l'artisan : utilisée automatiquement dès qu'elle est déposée dans public/photos/
const artisanPhoto = existsSync(join(process.cwd(), "public/photos/artisan.jpg")) ? "/photos/artisan.jpg" : null;

const offerArt: Record<string, (p: { className?: string }) => React.ReactElement> = {
	chaudronnerie: illustrations.chaudronnerie,
	metallerie: illustrations.metallerie,
	cheminee: pieces["chapeau-cheminee"],
	restauration: illustrations.reparation,
};

const stepIcons = [Layers, PencilRuler, Flame];

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	"@id": `${site.url}/#entreprise`,
	name: site.name,
	slogan: site.slogan,
	founder: { "@type": "Person", name: site.owner },
	description: story.expertise,
	url: site.url,
	logo: `${site.url}/icon.svg`,
	image: `${site.url}/opengraph-image`,
	...(phoneIsPlaceholder ? {} : { telephone: site.phone.e164 }),
	address: {
		"@type": "PostalAddress",
		addressLocality: site.address.locality,
		postalCode: site.address.postalCode,
		addressRegion: site.address.region,
		addressCountry: site.address.country,
	},
	areaServed: site.area.map((name) => ({ "@type": "Place", name })),
	knowsAbout: ["Chaudronnerie", "Métallerie", "Ferronnerie", "Entretien de cheminées", "Conduits de fumée", "Soudure TIG", "Soudure MIG"],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Services",
		itemListElement: offer.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o.title, description: o.desc, url: `${site.url}${o.href}` } })),
	},
	subjectOf: {
		"@type": "FAQPage",
		mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
	},
};

export default function Home() {
	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

			{/* ——— Hero : la forge s'allume ——— */}
			<section aria-labelledby="hero-title" className="feu-brushed relative overflow-hidden">
				<div className="mx-auto grid min-h-[calc(100svh-4.75rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10">
					<div className="relative z-10 lg:col-span-7">
						<h1 id="hero-title">
							<span className="feu-monte block text-[0.95rem] font-semibold uppercase tracking-[0.2em] text-[var(--feu-vif)]">
								{site.name}, métallier chaudronnier à Ambert et Arlanc
							</span>
							<span
								className="feu-monte feu-display feu-silver mt-5 block text-[clamp(3.3rem,8.4vw,7.6rem)] font-black uppercase leading-[0.86]"
								style={{ "--d": "0.15s" } as React.CSSProperties}>
								Quand le fer rencontre l&apos;artisanat
							</span>
						</h1>
						<p className="feu-monte mt-7 max-w-xl text-xl leading-relaxed text-[var(--muted)]" style={{ "--d": "0.3s" } as React.CSSProperties}>
							Chaudronnerie, métallerie, restauration, entretien et nettoyage de cheminées. Intervention rapide sur{" "}
							<strong className="font-semibold text-[var(--text)]">Ambert, Arlanc</strong> et tout le Livradois-Forez.
						</p>
						<div className="feu-monte mt-9 flex flex-col gap-3 sm:flex-row" style={{ "--d": "0.45s" } as React.CSSProperties}>
							<a href="#contact" className="feu-btn">
								Demander un devis gratuit
							</a>
							<a href="#realisations" className="feu-btn-ghost">
								Voir les réalisations
							</a>
						</div>
						<p className="feu-serif mt-10 text-lg italic text-[var(--argent)]">« {site.slogan} »</p>
					</div>

					<div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" aria-hidden="true">
						<div className="feu-glow absolute -inset-16" />
						<FeuMark className="feu-allume relative w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)]" />
						<Sparks className="pointer-events-none absolute -top-[40%] left-[-10%] h-[90%] w-[120%]" />
					</div>
				</div>
			</section>

			{/* ——— Services ——— */}
			<section id="services" aria-labelledby="services-title" className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<div className="feu-rule" aria-hidden="true" />
							<h2 id="services-title" className="feu-h2 feu-silver mt-5 text-5xl sm:text-6xl lg:text-7xl">
								Ce que je fais
							</h2>
						</div>
						<p className="max-w-md text-lg text-[var(--muted)]">
							Des prestations sérieuses, propres et adaptées aux besoins des particuliers comme des professionnels.
						</p>
					</div>
					<ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
						{offer.map((o) => {
							const Art = offerArt[o.id];
							return (
								<li key={o.id} className="feu-plate group relative flex flex-col p-6 transition-shadow hover:shadow-[0_0_0_1px_var(--feu),0_18px_40px_-20px_rgba(240,122,34,0.6)]">
									<div className="h-32 text-[var(--argent)] transition-colors group-hover:text-[var(--feu-vif)]">
										<Art className="h-full w-full" />
									</div>
									<h3 className="feu-display mt-6 text-3xl font-extrabold uppercase leading-none">
										<Link href={o.href} className="after:absolute after:inset-0">
											{o.title}
										</Link>
									</h3>
									<p className="mt-3 text-[var(--muted)]">{o.desc}</p>
									<span className="mt-auto inline-flex items-center gap-1 pt-5 font-semibold text-[var(--feu-vif)]" aria-hidden="true">
										En savoir plus <ChevronRight className="size-4" />
									</span>
								</li>
							);
						})}
					</ul>
				</div>
			</section>

			{/* ——— L'âme de l'artisan ——— */}
			<section id="artisan" aria-labelledby="artisan-title" className="feu-brushed border-y border-[var(--line)] py-24 lg:py-32">
				<div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
					<div className="lg:col-span-5">
						<div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[50%] border border-[#4a4d52] shadow-[0_0_0_8px_#1b1c1f,0_0_0_9px_#3a3d42,0_40px_80px_-30px_rgba(240,122,34,0.45)]">
							{artisanPhoto ? (
								<Image src={artisanPhoto} alt={`${site.owner} à l'atelier`} fill sizes="(min-width: 1024px) 30vw, 80vw" className="object-cover" />
							) : (
								<div className="feu-glow grid h-full place-items-center bg-[#16171a] p-14">
									<FeuMark className="w-full" />
								</div>
							)}
						</div>
					</div>
					<div className="lg:col-span-6 lg:col-start-7">
						<div className="feu-rule" aria-hidden="true" />
						<h2 id="artisan-title" className="feu-h2 mt-5 text-5xl text-[var(--feu)] sm:text-6xl lg:text-7xl">
							L&apos;âme de l&apos;artisan
						</h2>
						<h3 className="feu-serif mt-10 text-3xl italic text-[var(--feu-vif)]">Mon histoire</h3>
						<p className="mt-3 text-lg leading-relaxed text-[var(--text)]/90">{story.history}</p>
						<h3 className="feu-serif mt-9 text-3xl italic text-[var(--feu-vif)]">Mon expertise</h3>
						<p className="mt-3 text-lg leading-relaxed text-[var(--text)]/90">{story.expertise}</p>
						<p className="mt-9 flex items-start gap-3 text-[var(--muted)]">
							<ShieldCheck className="mt-0.5 size-5 shrink-0 text-[var(--feu)]" aria-hidden="true" />
							{site.legal.insurance}
						</p>
					</div>
				</div>
			</section>

			{/* ——— Un savoir-faire artisanal ——— */}
			<section id="savoir-faire" aria-labelledby="sf-title" className="py-24 lg:py-32">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
					<h2 id="sf-title" className="feu-serif text-4xl text-[var(--feu)] sm:text-5xl">
						Un savoir-faire artisanal
					</h2>
					<p className="mt-3 text-lg text-[var(--muted)]">Une passion pour le métal au service de vos projets</p>
					<ol className="mt-16">
						{steps.map((s, i) => {
							const Icon = stepIcons[i];
							return (
								<li key={s.title} className="flex flex-col items-center">
									<div className="grid size-20 place-items-center rounded-full border border-[#4a4d52] bg-[#1b1c1f] shadow-[0_0_30px_-6px_rgba(240,122,34,0.55)]">
										<Icon className="size-8 text-[var(--feu-vif)]" aria-hidden="true" />
									</div>
									<h3 className="feu-display mt-6 text-3xl font-extrabold uppercase">
										<span className="sr-only">Étape {i + 1} : </span>
										{s.title}
									</h3>
									<p className="mt-2 max-w-md text-lg text-[var(--muted)]">{s.text}</p>
									{i < steps.length - 1 && <div className="feu-line mt-8 h-24" aria-hidden="true" />}
								</li>
							);
						})}
					</ol>
				</div>
			</section>

			{/* ——— Réalisations ——— */}
			<section id="realisations" aria-labelledby="real-title" className="feu-brushed border-y border-[var(--line)] py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<h2 id="real-title" className="feu-h2 feu-silver text-center text-5xl sm:text-6xl lg:text-7xl">
						Nos réalisations
					</h2>
					<div className="feu-rule mx-auto mt-5" aria-hidden="true" />
					<div className="mt-14">
						<Realisations />
					</div>
					<p className="sr-only">{realisations.length} réalisations présentées.</p>
				</div>
			</section>

			{/* ——— Dessinez votre projet ——— */}
			<section id="projet" aria-labelledby="projet-title" className="py-24 lg:py-32">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
						<div>
							<div className="feu-rule" aria-hidden="true" />
							<h2 id="projet-title" className="feu-h2 feu-silver mt-5 text-5xl sm:text-6xl lg:text-7xl">
								Dessinez votre projet
							</h2>
						</div>
						<p className="max-w-md text-lg text-[var(--muted)]">
							Réglez les dimensions : le plan se trace en direct. Envoyez-le avec votre demande, le devis part de là.
						</p>
					</div>
					<div className="mt-14">
						<Configurator />
					</div>
				</div>
			</section>

			{/* ——— Secteur et questions ——— */}
			<section id="questions" aria-labelledby="faq-title" className="border-t border-[var(--line)] py-24 lg:py-32">
				<div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
					<div className="lg:col-span-4">
						<div className="feu-rule" aria-hidden="true" />
						<h2 id="faq-title" className="feu-h2 feu-silver mt-5 text-5xl sm:text-6xl">
							Questions fréquentes
						</h2>
						<p className="mt-5 text-lg text-[var(--muted)]">
							Atelier à Arlanc. Interventions à Ambert, Marsac-en-Livradois, Vertolaye et dans tout le Puy-de-Dôme.
						</p>
					</div>
					<div className="lg:col-span-7 lg:col-start-6">
						{faq.map((f) => (
							<details key={f.q} className="group border-b border-[var(--line)]">
								<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors hover:text-[var(--feu-vif)] [&::-webkit-details-marker]:hidden">
									<h3>{f.q}</h3>
									<Plus className="size-6 shrink-0 text-[var(--feu)] transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
								</summary>
								<p className="pb-6 pr-10 text-[var(--muted)]">{f.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			{/* ——— Contact ——— */}
			<section id="contact" aria-labelledby="contact-title" className="feu-brushed relative overflow-hidden border-t border-[var(--line)] py-24 lg:py-32">
				<div className="feu-glow pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-60" aria-hidden="true" />
				<div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
					<div className="lg:col-span-5">
						<div className="feu-rule" aria-hidden="true" />
						<h2 id="contact-title" className="feu-h2 feu-silver mt-5 text-5xl sm:text-6xl lg:text-7xl">
							Parlons de votre projet
						</h2>
						<p className="mt-6 max-w-md text-lg text-[var(--muted)]">
							N&apos;hésitez pas à m&apos;appeler pour discuter de vos besoins. Je me déplace pour étudier la faisabilité technique,
							et le devis est gratuit.
						</p>
						<a href={site.phone.href} className="feu-display mt-10 inline-flex min-h-11 items-center gap-3 text-5xl font-black text-[var(--feu)] hover:text-[var(--feu-vif)]">
							<Phone className="size-9" aria-hidden="true" />
							{site.phone.display}
						</a>
						<p className="mt-3 text-[var(--muted)]">
							Atelier : {site.address.postalCode} {site.address.locality} / Ambert
						</p>
						<p className="feu-serif mt-10 text-xl italic text-[var(--argent)]">{site.signature}</p>
					</div>
					<div className="feu-plate p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
