import { ChevronRight, Flame, Layers, PencilRuler, Phone, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact-form";
import { illustrations } from "@/components/illustrations";
import { faq, offer, realisations, site, steps } from "@/lib/site";
import JsonLd from "./json-ld";
import { pieces } from "./pieces";

type Id = (typeof offer)[number]["id"];

const art: Record<Id, (p: { className?: string }) => React.ReactElement> = {
	chaudronnerie: illustrations.chaudronnerie,
	metallerie: illustrations.metallerie,
	cheminee: pieces["chapeau-cheminee"],
	restauration: illustrations.reparation,
};

const stepIcons = [Layers, PencilRuler, Flame];

const find = (id: Id) => offer.find((o) => o.id === id)!;

export function metierMetadata(id: Id): Metadata {
	const o = find(id);
	return {
		title: { absolute: `${o.page.title} | ${site.name}` },
		description: o.page.description,
		alternates: { canonical: o.href },
		openGraph: { type: "website", locale: "fr_FR", url: o.href, siteName: site.name, title: o.page.title, description: o.page.description },
	};
}

export default function MetierPage({ id }: { id: Id }) {
	const o = find(id);
	const Art = art[id];
	const questions = o.page.faq.map((q) => faq.find((f) => f.id === q)).filter((f) => f !== undefined);
	const related = o.related.map((r) => realisations.find((x) => x.id === r)).filter((r) => r !== undefined);
	const others = offer.filter((x) => x.id !== id);

	return (
		<>
			<JsonLd
				data={{
					"@context": "https://schema.org",
					"@graph": [
						{
							"@type": "Service",
							name: o.title,
							description: o.page.intro,
							serviceType: o.title,
							url: `${site.url}${o.href}`,
							provider: { "@id": `${site.url}/#entreprise` },
							areaServed: site.area.map((name) => ({ "@type": "Place", name })),
						},
						{
							"@type": "BreadcrumbList",
							itemListElement: [
								{ "@type": "ListItem", position: 1, name: "Accueil", item: site.url },
								{ "@type": "ListItem", position: 2, name: o.title, item: `${site.url}${o.href}` },
							],
						},
					],
				}}
			/>

			{/* En-tête de page */}
			<section aria-labelledby="metier-title" className="feu-brushed relative overflow-hidden border-b border-[var(--line)]">
				<div className="feu-glow pointer-events-none absolute -right-40 top-0 h-full w-[60%] opacity-70" aria-hidden="true" />
				<div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-20">
					<div className="lg:col-span-7">
						<nav aria-label="Fil d'Ariane">
							<ol className="flex items-center gap-1 text-sm text-[var(--muted)]">
								<li>
									<Link href="/" className="inline-flex min-h-11 items-center hover:text-[var(--text)]">
										Accueil
									</Link>
								</li>
								<li aria-hidden="true">
									<ChevronRight className="size-4" />
								</li>
								<li aria-current="page" className="text-[var(--feu-vif)]">
									{o.title}
								</li>
							</ol>
						</nav>
						<h1 id="metier-title" className="feu-h2 feu-silver mt-4 text-[clamp(2.6rem,6vw,5.2rem)]">
							{o.page.h1}
						</h1>
						<p className="mt-7 max-w-2xl text-xl leading-relaxed text-[var(--muted)]">{o.page.intro}</p>
						<div className="mt-9 flex flex-col gap-3 sm:flex-row">
							<a href="#contact" className="feu-btn">
								Demander un devis gratuit
							</a>
							<a href={site.phone.href} className="feu-btn-ghost">
								<Phone className="size-5" aria-hidden="true" />
								{site.phone.display}
							</a>
						</div>
					</div>
					<div className="mx-auto w-full max-w-sm text-[var(--argent)] lg:col-span-4 lg:col-start-9" aria-hidden="true">
						<div className="feu-frame aspect-square p-10">
							<Art className="h-full w-full" />
						</div>
					</div>
				</div>
			</section>

			{/* Ouvrages */}
			<section aria-labelledby="items-title" className="py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<div className="feu-rule" aria-hidden="true" />
					<h2 id="items-title" className="feu-h2 feu-silver mt-5 text-4xl sm:text-5xl lg:text-6xl">
						{o.page.itemsTitle}
					</h2>
					<ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{o.items.map((it) => (
							<li key={it} className="feu-plate flex min-h-20 items-center gap-4 px-6 py-5 text-lg font-semibold">
								<Flame className="size-5 shrink-0 text-[var(--feu)]" aria-hidden="true" />
								{it}
							</li>
						))}
					</ul>
					<p className="mt-8 max-w-2xl text-[var(--muted)]">
						{site.materials.join(", ")}. {site.processes}. Devis gratuit {site.quoteDelay}.
					</p>
				</div>
			</section>

			{/* Réalisations liées */}
			{related.length > 0 && (
				<section aria-labelledby="related-title" className="feu-brushed border-y border-[var(--line)] py-20 lg:py-28">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
						<h2 id="related-title" className="feu-h2 feu-silver text-4xl sm:text-5xl">
							Réalisations
						</h2>
						<ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
							{related.map((r) => {
								const Piece = pieces[r.id];
								return (
									<li key={r.id} className="feu-plate p-5">
										<div className="feu-frame grid aspect-[4/3] place-items-center p-8 text-[var(--argent)]">
											<Piece className="h-full w-full" />
										</div>
										<h3 className="feu-display mt-5 text-2xl font-extrabold uppercase">{r.title}</h3>
										<p className="mt-2 text-[var(--muted)]">{r.text}</p>
									</li>
								);
							})}
						</ul>
						<Link href="/#realisations" className="feu-link mt-8 inline-flex min-h-11 items-center">
							Voir toutes les réalisations
						</Link>
					</div>
				</section>
			)}

			{/* Méthode */}
			<section aria-labelledby="steps-title" className="py-20 lg:py-28">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<h2 id="steps-title" className="feu-serif text-4xl text-[var(--feu)] sm:text-5xl">
						Comment je travaille
					</h2>
					<ol className="mt-10 grid gap-8 md:grid-cols-3">
						{steps.map((s, i) => {
							const Icon = stepIcons[i];
							return (
								<li key={s.title} className="flex gap-5">
									<div className="grid size-14 shrink-0 place-items-center rounded-full border border-[#4a4d52] bg-[#1b1c1f] shadow-[0_0_24px_-6px_rgba(240,122,34,0.55)]">
										<Icon className="size-6 text-[var(--feu-vif)]" aria-hidden="true" />
									</div>
									<div>
										<h3 className="feu-display text-2xl font-extrabold uppercase">
											<span className="sr-only">Étape {i + 1} : </span>
											{s.title}
										</h3>
										<p className="mt-1 text-[var(--muted)]">{s.text}</p>
									</div>
								</li>
							);
						})}
					</ol>
				</div>
			</section>

			{/* Questions */}
			<section aria-labelledby="q-title" className="border-t border-[var(--line)] py-20 lg:py-28">
				<div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
					<h2 id="q-title" className="feu-h2 feu-silver text-4xl sm:text-5xl lg:col-span-4">
						Questions utiles
					</h2>
					<div className="lg:col-span-7 lg:col-start-6">
						{questions.map((f) => (
							<details key={f.id} className="group border-b border-[var(--line)]">
								<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold hover:text-[var(--feu-vif)] [&::-webkit-details-marker]:hidden">
									<h3>{f.q}</h3>
									<Plus className="size-6 shrink-0 text-[var(--feu)] transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
								</summary>
								<p className="pb-6 pr-10 text-[var(--muted)]">{f.a}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			{/* Autres services */}
			<nav aria-labelledby="others-title" className="feu-brushed border-y border-[var(--line)] py-16">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
					<h2 id="others-title" className="feu-display text-3xl font-extrabold uppercase">
						Les autres savoir-faire
					</h2>
					<ul className="mt-6 grid gap-3 sm:grid-cols-3">
						{others.map((x) => (
							<li key={x.id}>
								<Link href={x.href} className="feu-plate flex min-h-16 items-center justify-between gap-3 px-5 font-semibold transition-colors hover:text-[var(--feu-vif)]">
									{x.title}
									<ChevronRight className="size-5 text-[var(--feu)]" aria-hidden="true" />
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>

			{/* Contact */}
			<section id="contact" aria-labelledby="c-title" className="relative overflow-hidden py-20 lg:py-28">
				<div className="feu-glow pointer-events-none absolute inset-x-0 -bottom-1/2 h-full opacity-60" aria-hidden="true" />
				<div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-10">
					<div className="lg:col-span-5">
						<h2 id="c-title" className="feu-h2 feu-silver text-4xl sm:text-5xl lg:text-6xl">
							Parlons de votre projet
						</h2>
						<p className="mt-5 max-w-md text-lg text-[var(--muted)]">
							Je me déplace pour étudier la faisabilité technique. Le devis est gratuit et vous le recevez {site.quoteDelay}.
						</p>
						<a href={site.phone.href} className="feu-display mt-8 inline-flex min-h-11 items-center gap-3 text-4xl font-black text-[var(--feu)] hover:text-[var(--feu-vif)]">
							<Phone className="size-8" aria-hidden="true" />
							{site.phone.display}
						</a>
					</div>
					<div className="feu-plate p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
						<ContactForm />
					</div>
				</div>
			</section>
		</>
	);
}
