import { Phone } from "lucide-react";
import type { Metadata } from "next";
import { Libre_Franklin, Rokkitt } from "next/font/google";
import ContactForm from "@/components/contact-form";
import { illustrations } from "@/components/illustrations";
import MobileActions from "@/components/mobile-actions";
import Poincon from "@/components/poincon";
import { faq, services, site } from "@/lib/site";
import "./catalogue.css";

const slab = Rokkitt({ subsets: ["latin"], variable: "--font-cat-display", display: "swap" });
const franklin = Libre_Franklin({ subsets: ["latin"], variable: "--font-cat-body", display: "swap" });

export const metadata: Metadata = { title: "Catalogue d'atelier" };

const roman = ["I", "II", "III", "IV"];

/** Tampon rouge, légèrement irrégulier comme un vrai coup de tampon. */
function Tampon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
			<defs>
				<path id="tampon-cercle" d="M100 100m-72 0a72 72 0 1 1 144 0a72 72 0 1 1-144 0" />
				<filter id="tampon-grain">
					<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
					<feDisplacementMap in="SourceGraphic" scale="2.4" />
				</filter>
			</defs>
			<g filter="url(#tampon-grain)" fill="none" stroke="currentColor">
				<circle cx="100" cy="100" r="92" strokeWidth="4" />
				<circle cx="100" cy="100" r="54" strokeWidth="2" />
				<text fontSize="17" fontWeight="700" letterSpacing="3.2" fill="currentColor" stroke="none">
					<textPath href="#tampon-cercle">DEVIS GRATUIT ✦ SOUS 48 HEURES ✦ ARLANC ✦</textPath>
				</text>
				<text x="100" y="96" textAnchor="middle" fontSize="30" fontWeight="800" fill="currentColor" stroke="none">
					48 h
				</text>
				<text x="100" y="120" textAnchor="middle" fontSize="13" fontWeight="700" letterSpacing="2" fill="currentColor" stroke="none">
					GRATUIT
				</text>
			</g>
		</svg>
	);
}

const articles = [
	{ t: "Prise de contact", d: "Par téléphone ou par le bon de commande ci-dessous, vous décrivez votre besoin : pièce à réparer, ouvrage à créer, contraintes du lieu." },
	{ t: "Visite et relevé", d: "Je me déplace pour prendre les cotes et étudier la faisabilité technique avec vous, sur place." },
	{ t: "Devis", d: "Gratuit, remis sous 48 heures. Vous savez ce qui sera fait, en quelle matière, et pour quel prix." },
	{ t: "Fabrication", d: "Traçage, découpe, mise en forme et soudure à l'atelier d'Arlanc, puis pose ou livraison." },
];

export default function Catalogue() {
	return (
		<div className={`catalogue ${slab.variable} ${franklin.variable}`}>
			<div className="mx-auto max-w-6xl px-3 py-3 sm:px-6 sm:py-8">
				<div className="cat-page">
					{/* En-tête façon catalogue */}
					<header className="border-b-[3px] border-double border-[var(--encre)] px-4 pb-5 pt-6 text-center sm:px-10">
						<div className="flex items-center justify-between gap-4 text-[0.85rem] text-[var(--muted)]">
							<span>Arlanc, Puy-de-Dôme</span>
							<a href={site.phone.href} className="inline-flex min-h-11 items-center gap-2 font-semibold text-[var(--encre)] hover:text-[var(--rouge)]">
								<Phone className="size-4" aria-hidden="true" />
								{site.phone.display}
							</a>
						</div>
						<a href="#" className="mx-auto mt-2 inline-flex flex-col items-center" aria-label={`${site.name}, accueil`}>
							<Poincon className="h-12 w-24 text-[var(--encre)]" />
							<span className="cat-display mt-2 text-3xl font-bold tracking-[0.04em] sm:text-4xl">Ateliers R. Monguillon</span>
						</a>
						<p className="mt-1 text-[var(--muted)]">Chaudronnerie, métallerie, serrurerie, réparation agricole</p>
						<nav aria-label="Navigation principale" className="mt-4">
							<ul className="flex flex-wrap justify-center gap-x-1 text-[0.95rem]">
								{[
									["#ouvrages", "Ouvrages"],
									["#commander", "Comment commander"],
									["#maison", "La maison"],
									["#renseignements", "Renseignements"],
									["#contact", "Bon de commande"],
								].map(([h, l]) => (
									<li key={h}>
										<a href={h} className="inline-flex min-h-11 items-center px-3 underline decoration-[var(--rouge)] decoration-1 underline-offset-4 hover:decoration-2">
											{l}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</header>

					<main id="contenu" tabIndex={-1} className="focus:outline-none">
						{/* Couverture */}
						<section aria-labelledby="cat-h1" className="grid gap-10 border-b border-[var(--encre)] px-4 py-12 sm:px-10 lg:grid-cols-2 lg:py-16">
							<div className="flex flex-col justify-center">
								<p className="cat-display text-xl italic text-[var(--rouge)]">Catalogue des ouvrages, édition {new Date().getFullYear()}</p>
								<h1 id="cat-h1" className="cat-display mt-4 text-[clamp(2.5rem,5.4vw,4.4rem)] font-bold leading-[0.98]">
									Chaudronnerie et métallerie sur-mesure à Ambert et Arlanc
								</h1>
								<p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--muted)]">
									Conception, soudure et réparation pour particuliers et industriels. Intervention rapide sur Ambert, Arlanc et tout le
									Livradois-Forez.
								</p>
								<div className="mt-8 flex flex-col gap-3 sm:flex-row">
									<a href="#contact" className="cat-btn">
										Remplir le bon de commande
									</a>
									<a href={site.phone.href} className="cat-btn-ghost">
										<Phone className="size-5" aria-hidden="true" />
										Appeler l&apos;atelier
									</a>
								</div>
							</div>
							<figure className="relative">
								<div className="border border-[var(--encre)] p-2">
									<div className="cat-gravure border border-[var(--encre)] p-6 sm:p-10">
										{(() => {
											const Ill = illustrations.metallerie;
											return <Ill className="h-auto w-full text-[var(--encre)]" />;
										})()}
									</div>
								</div>
								<figcaption className="cat-display mt-3 text-center italic text-[var(--muted)]">
									Fig. 1. Escalier droit avec garde-corps à barreaux, acier.
								</figcaption>
								<Tampon className="cat-tampon absolute -right-2 -top-8 w-32 text-[var(--rouge)] sm:-right-6 sm:w-40" />
							</figure>
						</section>

						{/* Ouvrages */}
						<section id="ouvrages" aria-labelledby="cat-o" className="border-b border-[var(--encre)] px-4 py-12 sm:px-10 lg:py-16">
							<h2 id="cat-o" className="cat-display text-center text-4xl font-bold sm:text-5xl">
								Ouvrages en fer, tôle, inox et aluminium
							</h2>
							<p className="cat-display mt-2 text-center text-lg italic text-[var(--muted)]">Précision et robustesse pour tous vos projets</p>
							<div className="mt-12 space-y-12">
								{services.map((s, i) => {
									const Ill = illustrations[s.id];
									return (
										<article key={s.id} id={s.id} aria-labelledby={`cat-${s.id}`} className="grid gap-8 border-t border-[var(--encre)] pt-10 md:grid-cols-12">
											<figure className="md:col-span-5">
												<div className="cat-gravure border border-[var(--encre)] p-6">
													<Ill className="h-auto w-full text-[var(--encre)]" />
												</div>
												<figcaption className="cat-display mt-2 text-center italic text-[var(--muted)]">Fig. {i + 2}</figcaption>
											</figure>
											<div className="md:col-span-7">
												<p className="cat-display text-lg text-[var(--rouge)]">
													Planche {roman[i]}. {s.for}
												</p>
												<h3 id={`cat-${s.id}`} className="cat-display mt-1 text-3xl font-bold sm:text-4xl">
													{s.title}
												</h3>
												<p className="mt-3 text-lg text-[var(--muted)]">{s.desc}</p>
												<ul className="mt-6" aria-label={`Ouvrages : ${s.title}`}>
													{s.items.map((it) => (
														<li key={it} className="flex items-baseline gap-2 py-1.5">
															<span>{it}</span>
															<span className="cat-leader" aria-hidden="true" />
															<span className="cat-display italic text-[var(--rouge)]">sur mesure</span>
														</li>
													))}
												</ul>
											</div>
										</article>
									);
								})}
							</div>
						</section>

						{/* Comment commander */}
						<section id="commander" aria-labelledby="cat-cc" className="border-b border-[var(--encre)] px-4 py-12 sm:px-10 lg:py-16">
							<h2 id="cat-cc" className="cat-display text-center text-4xl font-bold sm:text-5xl">
								Comment commander
							</h2>
							<ol className="mx-auto mt-10 grid max-w-4xl gap-x-12 gap-y-8 md:grid-cols-2">
								{articles.map((a, i) => (
									<li key={a.t}>
										<h3 className="cat-display text-2xl font-bold">
											<span className="text-[var(--rouge)]">Art. {i + 1}.</span> {a.t}
										</h3>
										<p className="mt-2 text-[var(--muted)]">{a.d}</p>
									</li>
								))}
							</ol>
						</section>

						{/* La maison */}
						<section id="maison" aria-labelledby="cat-m" className="grid gap-10 border-b border-[var(--encre)] px-4 py-12 sm:px-10 lg:grid-cols-12 lg:py-16">
							<div className="lg:col-span-7">
								<h2 id="cat-m" className="cat-display text-4xl font-bold sm:text-5xl">
									La maison
								</h2>
								<div className="cat-colonnes mt-6 text-lg leading-relaxed text-[var(--muted)]">
									<p>
										<span className="cat-lettrine">B</span>asé entre <strong className="text-[var(--encre)]">Arlanc et Ambert</strong>, je mets mon
										savoir-faire au service des acteurs locaux. Que vous soyez agriculteur à Marsac-en-Livradois, industriel à Vertolaye ou
										particulier rénovant une maison en pierre.
									</p>
									<p className="mt-4">
										Contrairement aux produits standards, je propose des solutions <strong className="text-[var(--encre)]">100&nbsp;% sur-mesure</strong>,
										adaptées aux contraintes de vos bâtiments et machines. Je travaille l&apos;acier, l&apos;inox et l&apos;aluminium avec le
										souci du détail et de la durabilité.
									</p>
								</div>
							</div>
							<dl className="self-start border border-[var(--encre)] lg:col-span-4 lg:col-start-9">
								{[
									["Atelier", "Arlanc (63220)"],
									["Déplacement", "Tout le Puy-de-Dôme"],
									["Soudure", "TIG et MIG"],
									["Devis", "Sous 48 heures"],
								].map(([k, v], i) => (
									<div key={k} className={`flex items-baseline gap-2 px-5 py-3 ${i ? "border-t border-[var(--encre)]" : ""}`}>
										<dt>{k}</dt>
										<span className="cat-leader" aria-hidden="true" />
										<dd className="cat-display text-lg font-bold">{v}</dd>
									</div>
								))}
							</dl>
						</section>

						{/* Renseignements */}
						<section id="renseignements" aria-labelledby="cat-r" className="border-b border-[var(--encre)] px-4 py-12 sm:px-10 lg:py-16">
							<h2 id="cat-r" className="cat-display text-center text-4xl font-bold sm:text-5xl">
								Renseignements utiles
							</h2>
							<dl className="mx-auto mt-10 grid max-w-5xl gap-x-12 gap-y-8 md:grid-cols-2">
								{faq.map((f) => (
									<div key={f.q}>
										<dt className="cat-display text-xl font-bold">{f.q}</dt>
										<dd className="mt-2 text-[var(--muted)]">{f.a}</dd>
									</div>
								))}
							</dl>
						</section>

						{/* Bon de commande */}
						<section id="contact" aria-labelledby="cat-c" className="px-4 py-12 sm:px-10 lg:py-16">
							<div className="grid gap-10 lg:grid-cols-12">
								<div className="lg:col-span-4">
									<h2 id="cat-c" className="cat-display text-4xl font-bold sm:text-5xl">
										Bon de commande
									</h2>
									<p className="mt-4 text-lg text-[var(--muted)]">
										N&apos;hésitez pas à m&apos;appeler pour discuter de vos besoins. Je me déplace pour étudier la faisabilité technique.
									</p>
									<a href={site.phone.href} className="cat-display mt-8 inline-flex min-h-11 items-center text-3xl font-bold text-[var(--rouge)] hover:underline">
										{site.phone.display}
									</a>
									<p className="mt-1 text-[var(--muted)]">
										Atelier : {site.address.postalCode} {site.address.locality} / Ambert
									</p>
								</div>
								<div className="border border-[var(--encre)] p-2 lg:col-span-8">
									<div className="border border-[var(--encre)] px-5 py-7 sm:px-8">
										<ContactForm />
									</div>
								</div>
							</div>
						</section>
					</main>

					<footer className="border-t-[3px] border-double border-[var(--encre)] px-4 py-6 text-center text-sm text-[var(--muted)] sm:px-10">
						Ateliers R. Monguillon, {site.trade.toLowerCase()} à {site.address.locality}. © {new Date().getFullYear()}
					</footer>
				</div>
			</div>
			<MobileActions
				actions={[
					{ href: site.phone.href, label: "Appeler", icon: "phone" },
					{ href: "#contact", label: "Bon de commande", icon: "quote" },
				]}
			/>
		</div>
	);
}
