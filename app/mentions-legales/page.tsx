import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
	title: "Mentions légales",
	description: `Mentions légales du site de ${site.name}, ${site.trade.toLowerCase()} à ${site.address.locality}.`,
	alternates: { canonical: "/mentions-legales" },
	robots: { index: false, follow: true },
};

const rows = [
	{ k: "Éditeur", v: `${site.name}, ${site.legal.company}` },
	{ k: "SIRET", v: site.legal.siret },
	{ k: "Adresse", v: site.legal.address },
	{ k: "Téléphone", v: site.phone.display },
	{ k: "E-mail", v: site.legal.email },
	{ k: "Directeur de la publication", v: site.name },
	{ k: "Hébergeur", v: site.legal.host },
];

export default function MentionsLegales() {
	return (
		<div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
			<h1 className="font-expanded text-3xl font-extrabold tracking-[-0.015em] sm:text-4xl">Mentions légales</h1>

			<dl className="mt-10 border-t-2 border-graphite">
				{rows.map((r) => (
					<div key={r.k} className="grid gap-1 border-b border-graphite/30 py-4 sm:grid-cols-3 sm:gap-6">
						<dt className="font-semibold">{r.k}</dt>
						<dd className="text-acier sm:col-span-2">{r.v}</dd>
					</div>
				))}
			</dl>

			<h2 className="font-expanded mt-14 text-2xl font-bold">Données personnelles</h2>
			<p className="mt-4 text-acier">
				Les informations envoyées par le formulaire de contact (nom, téléphone, e-mail,
				commune, description du projet) servent uniquement à répondre à votre demande et
				à établir un devis. Elles ne sont ni cédées ni utilisées à des fins commerciales.
				Vous pouvez demander leur consultation ou leur suppression à tout moment en me
				contactant.
			</p>
			<p className="mt-4 text-acier">
				Ce site ne dépose aucun cookie de mesure d&apos;audience ou publicitaire.
			</p>

			<h2 className="font-expanded mt-14 text-2xl font-bold">Propriété intellectuelle</h2>
			<p className="mt-4 text-acier">
				L&apos;ensemble des contenus de ce site (textes, dessins, mise en page) est la
				propriété de {site.name}. Toute reproduction sans autorisation est interdite.
			</p>
		</div>
	);
}
