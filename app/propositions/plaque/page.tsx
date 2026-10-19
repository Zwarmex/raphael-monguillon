import { Phone, Plus } from "lucide-react";
import type { Metadata } from "next";
import { Saira, Saira_Stencil } from "next/font/google";
import type { ReactNode } from "react";
import ContactForm from "@/components/contact-form";
import { illustrations } from "@/components/illustrations";
import MobileActions from "@/components/mobile-actions";
import Poincon from "@/components/poincon";
import { faq, services, site } from "@/lib/site";
import "./plaque.css";

const saira = Saira({ subsets: ["latin"], axes: ["wdth"], variable: "--font-plaque", display: "swap" });
const stencil = Saira_Stencil({ subsets: ["latin"], variable: "--font-plaque-stencil", display: "swap" });

export const metadata: Metadata = { title: "Plaque constructeur" };

// Couleurs de marquage des barres d'acier, une par métier
const marks: Record<string, string> = {
	metallerie: "var(--bleu)",
	chaudronnerie: "var(--vert)",
	reparation: "var(--jaune)",
};

/** Plaque rivetée : bord gravé et quatre rivets. */
function Plate({ children, className = "", label }: { children: ReactNode; className?: string; label?: string }) {
	return (
		<div className={`plaque-plate ${className}`}>
			<span className="plaque-rivet left-3 top-3" aria-hidden="true" />
			<span className="plaque-rivet right-3 top-3" aria-hidden="true" />
			<span className="plaque-rivet bottom-3 left-3" aria-hidden="true" />
			<span className="plaque-rivet bottom-3 right-3" aria-hidden="true" />
			{label && <p className="plaque-label border-b-2 border-[var(--grave)] pb-2 text-center">{label}</p>}
			{children}
		</div>
	);
}

const ops = [
	{ t: "Prise de contact", d: "Vous décrivez votre besoin : pièce à réparer, ouvrage à créer, contraintes du lieu." },
	{ t: "Relevé sur place", d: "Je me déplace pour prendre les cotes et étudier la faisabilité technique avec vous." },
	{ t: "Devis", d: "Gratuit, sous 48 h. Vous savez ce qui sera fait, en quelle matière, et pour quel prix." },
	{ t: "Fabrication et pose", d: "Traçage, découpe, mise en forme et soudure à l'atelier d'Arlanc, puis pose ou livraison." },
];

export default function Plaque() {
	return (
		<div className={`plaque ${saira.variable} ${stencil.variable}`}>
			<header className="border-b-2 border-[var(--grave)] bg-[var(--plaque)]">
				<div className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-10">
					<a href="#" className="flex min-h-11 items-center gap-3" aria-label={`${site.name}, accueil`}>
						<Poincon className="h-9 w-[4.2rem]" />
						<span className="plaque-stencil hidden text-xl sm:inline">Monguillon</span>
					</a>
					<nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
						<ul className="plaque-label flex gap-1">
							{[
								["#savoir-faire", "Savoir-faire"],
								["#gamme", "Méthode"],
								["#atelier", "Atelier"],
								["#questions", "Questions"],
							].map(([h, l]) => (
								<li key={h}>
									<a href={h} className="inline-flex min-h-11 items-center px-3 hover:underline hover:decoration-2 hover:underline-offset-4">
										{l}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<a href="#contact" className="plaque-btn ml-auto min-h-11 px-4 text-sm lg:ml-4">
						Demander un devis
					</a>
				</div>
			</header>

			<main id="contenu" tabIndex={-1} className="focus:outline-none">
				{/* Hero : la plaque signalétique */}
				<section aria-labelledby="plaque-h1" className="px-4 py-14 sm:px-6 lg:py-24">
					<Plate className="mx-auto max-w-4xl px-6 pb-8 pt-8 sm:px-12 sm:pb-12 sm:pt-10" label="Constructeur">
						<div className="mt-6 flex flex-col items-center gap-2 text-center">
							<Poincon className="h-14 w-28" label="Poinçon RM" />
							<p className="plaque-stencil mt-2 text-2xl tracking-[0.06em] sm:text-3xl">{site.name}</p>
						</div>
						<h1 id="plaque-h1" className="plaque-stencil mt-6 text-center text-[clamp(2.1rem,5.6vw,4.2rem)] leading-[1.02]">
							Chaudronnerie et métallerie sur-mesure à Ambert et Arlanc
						</h1>
						<dl className="mt-9 grid border-2 border-[var(--grave)] sm:grid-cols-2">
							{[
								["Atelier", `${site.address.locality} (${site.address.postalCode})`],
								["Secteur", "Ambert, Livradois-Forez, Puy-de-Dôme"],
								["Matières", site.materials.join(", ")],
								["Procédés", site.processes],
								["Devis", `Gratuit, ${site.quoteDelay}`],
								["Téléphone", site.phone.display],
							].map(([k, v], i) => (
								<div key={k} className={`flex items-baseline gap-4 px-4 py-3 ${i > 0 ? "border-t-2 border-[var(--grave)]" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${i % 2 ? "sm:border-l-2 sm:border-[var(--grave)]" : ""}`}>
									<dt className="plaque-label w-24 shrink-0">{k}</dt>
									<dd className="font-semibold">{v}</dd>
								</div>
							))}
						</dl>
						<p className="mx-auto mt-7 max-w-2xl text-center text-lg text-[var(--muted)]">
							Conception, soudure et réparation pour particuliers et industriels. Intervention rapide sur Ambert, Arlanc et tout
							le Livradois-Forez.
						</p>
					</Plate>
					<div className="mx-auto mt-8 flex max-w-4xl flex-col justify-center gap-3 sm:flex-row">
						<a href="#contact" className="plaque-btn min-h-14 px-8 text-base">
							Demander un devis gratuit
						</a>
						<a href={site.phone.href} className="plaque-btn-ghost min-h-14 px-8 text-base">
							<Phone className="size-5" aria-hidden="true" />
							Appeler
						</a>
					</div>
				</section>

				{/* Savoir-faire */}
				<section id="savoir-faire" aria-labelledby="plaque-sf" className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-7xl">
						<h2 id="plaque-sf" className="plaque-stencil text-4xl sm:text-5xl">
							Trois métiers, un seul atelier
						</h2>
						<p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
							Chaque métier a sa couleur, comme les marquages peints au bout des barres d&apos;acier pour reconnaître leur
							nuance.
						</p>
						<ul className="mt-12 grid gap-8 md:grid-cols-3">
							{services.map((s) => {
								const Ill = illustrations[s.id];
								return (
									<li key={s.id} id={s.id}>
										<Plate className="h-full overflow-hidden pl-9 pr-6 pb-8 pt-8">
											<span className="absolute inset-y-0 left-0 w-3" style={{ background: marks[s.id] }} aria-hidden="true" />
											<p className="plaque-label">{s.for}</p>
											<Ill className="mt-4 h-28 w-full text-[var(--grave)]" />
											<h3 className="plaque-stencil mt-6 text-2xl leading-tight">{s.title}</h3>
											<p className="mt-3 text-[var(--muted)]">{s.desc}</p>
											<ul className="mt-5 flex flex-wrap gap-2" aria-label={`Exemples : ${s.title}`}>
												{s.items.map((it) => (
													<li key={it} className="plaque-label border-2 border-[var(--grave)] px-2 py-0.5 text-[0.75rem]">
														{it}
													</li>
												))}
											</ul>
										</Plate>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* Méthode : la gamme de fabrication */}
				<section id="gamme" aria-labelledby="plaque-g" className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-5xl">
						<h2 id="plaque-g" className="plaque-stencil text-4xl sm:text-5xl">
							La gamme de fabrication
						</h2>
						<p className="mt-4 max-w-2xl text-lg text-[var(--muted)]">
							À l&apos;atelier, chaque pièce suit une gamme : des opérations numérotées de dix en dix. La vôtre aussi, du
							premier appel à la pose.
						</p>
						<Plate className="mt-10 px-5 pb-6 pt-6 sm:px-10" label="Fiche de suivi">
							<ol className="mt-2">
								{ops.map((o, i) => (
									<li key={o.t} className="grid gap-2 border-b-2 border-[var(--grave)]/25 py-5 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-6">
										<p className="plaque-label">Opération {(i + 1) * 10}</p>
										<div>
											<h3 className="text-lg font-bold">{o.t}</h3>
											<p className="mt-1 text-[var(--muted)]">{o.d}</p>
										</div>
									</li>
								))}
							</ol>
						</Plate>
					</div>
				</section>

				{/* Atelier */}
				<section id="atelier" aria-labelledby="plaque-a" className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
						<div>
							<h2 id="plaque-a" className="plaque-stencil text-4xl sm:text-5xl">
								Artisan au cœur du Livradois-Forez
							</h2>
							<div className="mt-6 space-y-5 text-lg text-[var(--muted)]">
								<p>
									Basé entre <strong className="text-[var(--grave)]">Arlanc et Ambert</strong>, je mets mon savoir-faire au service des
									acteurs locaux. Que vous soyez agriculteur à Marsac-en-Livradois, industriel à Vertolaye ou particulier rénovant
									une maison en pierre.
								</p>
								<p>
									Contrairement aux produits standards, je propose des solutions <strong className="text-[var(--grave)]">100&nbsp;% sur-mesure</strong>,
									adaptées aux contraintes de vos bâtiments et machines. Je travaille l&apos;acier, l&apos;inox et l&apos;aluminium avec
									le souci du détail et de la durabilité.
								</p>
							</div>
						</div>
						<Plate className="self-start px-6 pb-8 pt-8 sm:px-10" label="Caractéristiques">
							<dl className="mt-4 grid grid-cols-2 gap-x-6">
								{[
									["Atelier", "Arlanc"],
									["Déplacement", "Tout le 63"],
									["Soudure", "TIG et MIG"],
									["Devis", "Sous 48 h"],
								].map(([k, v]) => (
									<div key={k} className="border-b-2 border-[var(--grave)]/25 py-4">
										<dt className="plaque-label">{k}</dt>
										<dd className="plaque-stencil mt-1 text-2xl">{v}</dd>
									</div>
								))}
							</dl>
						</Plate>
					</div>
				</section>

				{/* FAQ */}
				<section id="questions" aria-labelledby="plaque-q" className="px-4 py-16 sm:px-6 lg:py-24">
					<div className="mx-auto max-w-4xl">
						<h2 id="plaque-q" className="plaque-stencil text-4xl sm:text-5xl">
							Questions fréquentes
						</h2>
						<Plate className="mt-10 px-5 pb-4 pt-4 sm:px-10">
							{faq.map((f) => (
								<details key={f.q} className="group border-b-2 border-[var(--grave)]/25 last:border-b-0">
									<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
										<h3>{f.q}</h3>
										<Plus className="size-6 shrink-0 transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
									</summary>
									<p className="pb-5 pr-8 text-[var(--muted)]">{f.a}</p>
								</details>
							))}
						</Plate>
					</div>
				</section>

				{/* Contact : le bon de commande */}
				<section id="contact" aria-labelledby="plaque-c" className="px-4 pb-20 pt-16 sm:px-6 lg:pb-28 lg:pt-24">
					<div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
						<div className="lg:col-span-4">
							<h2 id="plaque-c" className="plaque-stencil text-4xl sm:text-5xl">
								Parlons de votre projet
							</h2>
							<p className="mt-5 text-lg text-[var(--muted)]">
								N&apos;hésitez pas à m&apos;appeler pour discuter de vos besoins. Je me déplace pour étudier la faisabilité technique.
							</p>
							<a href={site.phone.href} className="plaque-stencil mt-8 inline-flex min-h-11 items-center gap-3 text-3xl hover:underline">
								<Phone className="size-7" aria-hidden="true" />
								{site.phone.display}
							</a>
							<p className="mt-2 text-[var(--muted)]">
								Atelier : {site.address.postalCode} {site.address.locality} / Ambert
							</p>
						</div>
						<Plate className="px-5 pb-8 pt-6 sm:px-10 lg:col-span-8" label="Demande de devis">
							<div className="mt-6">
								<ContactForm />
							</div>
						</Plate>
					</div>
				</section>
			</main>

			<footer className="border-t-2 border-[var(--grave)] bg-[var(--plaque)]">
				<div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
					<div className="flex items-center gap-3">
						<Poincon className="h-8 w-[3.75rem]" />
						<span>
							{site.name}, {site.trade.toLowerCase()} à {site.address.locality}
						</span>
					</div>
					<p>© {new Date().getFullYear()} {site.name}</p>
				</div>
			</footer>
			<MobileActions
				actions={[
					{ href: site.phone.href, label: "Appeler", icon: "phone" },
					{ href: "#contact", label: "Devis gratuit", icon: "quote" },
				]}
			/>
		</div>
	);
}
