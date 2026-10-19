import { Phone, Plus } from "lucide-react";
import type { Metadata } from "next";
import { Big_Shoulders, Public_Sans } from "next/font/google";
import ContactForm from "@/components/contact-form";
import { illustrations } from "@/components/illustrations";
import MobileActions from "@/components/mobile-actions";
import Poincon from "@/components/poincon";
import { faq, services, site } from "@/lib/site";
import "./forge.css";

const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-forge-display", display: "swap" });
const body = Public_Sans({ subsets: ["latin"], variable: "--font-forge-body", display: "swap" });

export const metadata: Metadata = { title: "Forge" };

/** Cordon de soudure TIG : écailles successives, teintes de revenu, point encore chaud au bout. */
function Bead({ className, id = "bead" }: { className?: string; id?: string }) {
	const W = 1200;
	const n = 78;
	const ripples = Array.from({ length: n }, (_, i) => {
		const x = 40 + i * 14.2;
		const wob = Math.sin(i * 0.9) * 1.6;
		return `M${x} ${26 + wob}Q${x + 22} ${50} ${x} ${74 - wob}`;
	}).join("");
	return (
		<svg viewBox={`0 0 ${W} 100`} className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
			<defs>
				<linearGradient id={`${id}-revenu`} x1="0" x2={W} y1="0" y2="0" gradientUnits="userSpaceOnUse">
					<stop offset="0" stopColor="#3a4f9c" />
					<stop offset="0.25" stopColor="#7b3f73" />
					<stop offset="0.5" stopColor="#b4783b" />
					<stop offset="0.78" stopColor="#e7c27d" />
					<stop offset="1" stopColor="#fff4dc" />
				</linearGradient>
				<radialGradient id={`${id}-chaud`}>
					<stop offset="0" stopColor="#fffaf0" />
					<stop offset="0.35" stopColor="#ffd27a" />
					<stop offset="1" stopColor="#ff7a1a" stopOpacity="0" />
				</radialGradient>
			</defs>
			<path d={`M40 50H${W - 70}`} stroke={`url(#${id}-revenu)`} strokeWidth="70" opacity="0.14" />
			<path d={`M40 27C400 23 800 29 ${W - 80} 26M40 73C400 77 800 71 ${W - 80} 74`} fill="none" stroke={`url(#${id}-revenu)`} strokeWidth="2" />
			<path d={ripples} fill="none" stroke={`url(#${id}-revenu)`} strokeWidth="2.6" strokeLinecap="round" />
			<circle cx={W - 62} cy="50" r="34" fill={`url(#${id}-chaud)`} className="forge-ember" />
		</svg>
	);
}

const steps = [
	{ t: "Vous appelez", d: "Vous décrivez votre besoin : pièce à réparer, ouvrage à créer, contraintes du lieu." },
	{ t: "Je viens voir", d: "Je me déplace pour prendre les cotes et étudier la faisabilité technique avec vous." },
	{ t: "Devis sous 48 h", d: "Gratuit. Vous savez ce qui sera fait, en quelle matière, et pour quel prix." },
	{ t: "Je fabrique", d: "Traçage, découpe, mise en forme et soudure à l'atelier d'Arlanc, puis pose ou livraison." },
];

export default function Forge() {
	return (
		<div className={`forge ${display.variable} ${body.variable}`}>
			<div className="forge-progress" aria-hidden="true" />
			<header className="absolute inset-x-0 top-0 z-30">
				<div className="mx-auto flex h-20 max-w-[90rem] items-center gap-6 px-5 sm:px-8 lg:px-12">
					<a href="#" className="flex min-h-11 items-center gap-3 text-[var(--paille)]" aria-label={`${site.name}, accueil`}>
						<Poincon className="h-9 w-[4.2rem]" />
						<span className="forge-display hidden text-2xl font-bold tracking-wide text-[var(--text)] sm:inline">
							Monguillon
						</span>
					</a>
					<nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
						<ul className="flex gap-1 text-[0.95rem]">
							{[
								["#savoir-faire", "Savoir-faire"],
								["#methode", "Méthode"],
								["#atelier", "L'atelier"],
								["#questions", "Questions"],
							].map(([h, l]) => (
								<li key={h}>
									<a href={h} className="inline-flex min-h-11 items-center px-3 text-[var(--muted)] transition-colors hover:text-[var(--text)]">
										{l}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<a
						href={site.phone.href}
						className="ml-auto inline-flex min-h-11 items-center gap-2 border border-[var(--line)] px-4 text-sm font-semibold transition-colors hover:border-[var(--paille)] hover:text-[var(--paille)] lg:ml-4">
						<Phone className="size-4" aria-hidden="true" />
						{site.phone.display}
					</a>
				</div>
			</header>

			<main id="contenu" tabIndex={-1} className="focus:outline-none">
				{/* Hero */}
				<section aria-labelledby="forge-h1" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-32">
					<div className="mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12">
						<p className="text-lg text-[var(--muted)]">Artisan chaudronnier à Arlanc, Puy-de-Dôme</p>
						<h1 id="forge-h1" className="forge-display mt-4 text-[clamp(3.4rem,10.5vw,10rem)] font-extrabold leading-[0.86] tracking-[-0.01em]">
							Chaudronnerie
							<br />
							et métallerie
							<br />
							sur-mesure
						</h1>
						<div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
							<p className="max-w-xl text-lg leading-relaxed text-[var(--muted)] lg:col-span-6">
								Conception, soudure et réparation pour particuliers et industriels.
								Intervention rapide sur <strong className="font-semibold text-[var(--text)]">Ambert, Arlanc</strong> et tout le
								Livradois-Forez.
							</p>
							<div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
								<a href="#contact" className="forge-btn">
									Demander un devis gratuit
								</a>
								<a href={site.phone.href} className="forge-btn-ghost">
									<Phone className="size-5" aria-hidden="true" />
									{site.phone.display}
								</a>
							</div>
						</div>
					</div>
					<Bead className="forge-bead mt-14 h-16 w-full sm:h-24" />
				</section>

				{/* Savoir-faire */}
				<section id="savoir-faire" aria-labelledby="forge-sf" className="border-t border-[var(--line)] py-24 lg:py-32">
					<div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
						<h2 id="forge-sf" className="forge-display max-w-3xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
							Trois métiers, un seul atelier
						</h2>
						<ul className="mt-16 grid gap-px bg-[var(--line)] md:grid-cols-3">
							{services.map((s) => {
								const Ill = illustrations[s.id];
								return (
									<li key={s.id} id={s.id} className="forge-card group bg-[var(--bg)] p-7 sm:p-9">
										<Ill className="h-36 w-full text-[var(--paille)] opacity-90" />
										<p className="mt-8 text-[0.95rem] text-[var(--muted)]">{s.for}</p>
										<h3 className="forge-display mt-1 text-4xl font-bold leading-none">{s.title}</h3>
										<p className="mt-4 text-[var(--muted)]">{s.desc}</p>
										<p className="mt-6 text-[0.95rem] text-[var(--text)]">{s.items.join(", ")}</p>
									</li>
								);
							})}
						</ul>
					</div>
				</section>

				{/* Méthode */}
				<section id="methode" aria-labelledby="forge-m" className="bg-[var(--surface)] py-24 lg:py-32">
					<div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
						<h2 id="forge-m" className="forge-display max-w-3xl text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
							Du premier appel à la pièce posée
						</h2>
						<ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
							{steps.map((s, i) => (
								<li key={s.t}>
									<span className="forge-display block text-7xl font-extrabold leading-none text-[var(--paille)]" aria-hidden="true">
										{i + 1}
									</span>
									<h3 className="mt-4 text-xl font-semibold">
										<span className="sr-only">Étape {i + 1} : </span>
										{s.t}
									</h3>
									<p className="mt-2 text-[var(--muted)]">{s.d}</p>
								</li>
							))}
						</ol>
					</div>
				</section>

				{/* Atelier */}
				<section id="atelier" aria-labelledby="forge-a" className="py-24 lg:py-32">
					<div className="mx-auto grid max-w-[90rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
						<h2 id="forge-a" className="forge-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:col-span-5 lg:text-7xl">
							Au cœur du Livradois-Forez
						</h2>
						<div className="space-y-6 text-xl leading-relaxed text-[var(--muted)] lg:col-span-6 lg:col-start-7">
							<p>
								Basé entre <strong className="font-semibold text-[var(--text)]">Arlanc et Ambert</strong>, je mets mon savoir-faire au
								service des acteurs locaux. Que vous soyez agriculteur à Marsac-en-Livradois, industriel à Vertolaye ou
								particulier rénovant une maison en pierre.
							</p>
							<p>
								Contrairement aux produits standards, je propose des solutions{" "}
								<strong className="font-semibold text-[var(--text)]">100&nbsp;% sur-mesure</strong>, adaptées aux contraintes de vos
								bâtiments et machines. Je travaille l&apos;acier, l&apos;inox et l&apos;aluminium avec le souci du détail et de la
								durabilité.
							</p>
							<dl className="grid grid-cols-2 gap-px bg-[var(--line)] pt-px text-base">
								{[
									["Atelier", "Arlanc"],
									["Déplacement", "Tout le 63"],
									["Soudure", "TIG et MIG"],
									["Devis", "Sous 48 h"],
								].map(([k, v]) => (
									<div key={k} className="bg-[var(--bg)] py-4 pr-4">
										<dt className="text-[var(--muted)]">{k}</dt>
										<dd className="forge-display mt-1 text-3xl font-bold text-[var(--text)]">{v}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</section>

				{/* FAQ */}
				<section id="questions" aria-labelledby="forge-q" className="border-t border-[var(--line)] py-24 lg:py-32">
					<div className="mx-auto grid max-w-[90rem] gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
						<h2 id="forge-q" className="forge-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:col-span-4">
							Questions fréquentes
						</h2>
						<div className="lg:col-span-7 lg:col-start-6">
							{faq.map((f) => (
								<details key={f.q} className="group border-b border-[var(--line)]">
									<summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
										<h3>{f.q}</h3>
										<Plus className="size-6 shrink-0 text-[var(--paille)] transition-transform group-open:rotate-45 motion-reduce:transition-none" aria-hidden="true" />
									</summary>
									<p className="pb-6 pr-10 text-[var(--muted)]">{f.a}</p>
								</details>
							))}
						</div>
					</div>
				</section>

				{/* Contact */}
				<section id="contact" aria-labelledby="forge-c" className="relative bg-[var(--surface)] py-24 lg:py-32">
					<Bead id="bead2" className="absolute inset-x-0 top-0 h-6 w-full -translate-y-1/2 opacity-80" />
					<div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
						<div className="lg:col-span-5">
							<h2 id="forge-c" className="forge-display text-5xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
								Parlons de votre projet
							</h2>
							<p className="mt-6 max-w-md text-lg text-[var(--muted)]">
								N&apos;hésitez pas à m&apos;appeler pour discuter de vos besoins. Je me déplace pour étudier la faisabilité technique.
							</p>
							<a href={site.phone.href} className="forge-display mt-10 block text-5xl font-extrabold text-[var(--paille)] hover:underline">
								{site.phone.display}
							</a>
							<p className="mt-3 text-[var(--muted)]">
								Atelier : {site.address.postalCode} {site.address.locality} / Ambert
							</p>
						</div>
						<div className="lg:col-span-6 lg:col-start-7">
							<ContactForm />
						</div>
					</div>
				</section>
			</main>

			<footer className="border-t border-[var(--line)] py-10 text-sm text-[var(--muted)]">
				<div className="mx-auto flex max-w-[90rem] flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
					<div className="flex items-center gap-3 text-[var(--paille)]">
						<Poincon className="h-8 w-[3.75rem]" />
						<span className="text-[var(--text)]">
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
