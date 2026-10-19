import type { Metadata } from "next";
import Link from "next/link";
import Poincon from "@/components/poincon";

export const metadata: Metadata = { title: { absolute: "Propositions de design" } };

const options = [
	{
		href: "/propositions/planche",
		name: "Planche de traçage",
		desc: "Clair et technique. Le site se lit comme un plan d'atelier, avec un vrai développé de tôle et le configurateur.",
		swatch: ["#e7e8e4", "#1b1e21", "#b3371a"],
	},
	{
		href: "/propositions/forge",
		name: "Forge",
		desc: "Sombre et cinématographique. Très grande typographie d'affiche, un cordon de soudure aux couleurs de l'acier chauffé.",
		swatch: ["#0e0f10", "#ece8e1", "#e7c27d"],
	},
	{
		href: "/propositions/plaque",
		name: "Plaque constructeur",
		desc: "Industriel et franc. Plaques rivetées sur inox brossé, lettrage pochoir, couleurs de marquage des barres d'acier.",
		swatch: ["#c9cdcf", "#15191c", "#f2c230"],
	},
	{
		href: "/propositions/catalogue",
		name: "Catalogue d'atelier",
		desc: "Patrimoine et caractère. L'esprit des catalogues stéphanois d'autrefois : gravures à l'encre bleue, tampon rouge.",
		swatch: ["#f2f1ec", "#1c3366", "#b3261e"],
	},
];

export default function Propositions() {
	return (
		<main id="contenu" tabIndex={-1} className="mx-auto max-w-5xl px-4 py-16 focus:outline-none sm:px-6 lg:py-24">
			<Poincon className="h-12 w-24 text-graphite" />
			<h1 className="font-expanded mt-6 text-4xl font-extrabold tracking-[-0.015em] sm:text-5xl">Quatre directions pour le site</h1>
			<p className="mt-4 max-w-2xl text-lg text-acier">
				Même contenu, même formulaire de devis, même poinçon « RM ». Seule l&apos;identité visuelle change. Ouvrez-les sur
				ordinateur et sur téléphone.
			</p>
			<ul className="mt-12 grid gap-5 sm:grid-cols-2">
				{options.map((o) => (
					<li key={o.href}>
						<Link
							href={o.href}
							className="group flex h-full flex-col border-2 border-graphite bg-[#eceee9] p-6 transition-colors hover:bg-white">
							<span className="flex gap-1.5" aria-hidden="true">
								{o.swatch.map((c) => (
									<span key={c} className="size-8 border border-graphite/30" style={{ background: c }} />
								))}
							</span>
							<span className="font-expanded mt-5 text-2xl font-bold group-hover:underline group-hover:decoration-minium group-hover:decoration-2">
								{o.name}
							</span>
							<span className="mt-2 text-acier">{o.desc}</span>
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
