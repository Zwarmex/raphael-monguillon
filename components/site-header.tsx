import { Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import Poincon from "./poincon";

const links = [
	{ href: "#savoir-faire", label: "Savoir-faire" },
	{ href: "#projet", label: "Votre projet" },
	{ href: "#methode", label: "Méthode" },
	{ href: "#atelier", label: "L'atelier" },
	{ href: "#questions", label: "Questions" },
];

export default function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-graphite/15 bg-zinc/92 backdrop-blur-md supports-[backdrop-filter]:bg-zinc/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
				<Link href="/propositions/planche" className="group flex min-h-11 items-center gap-3" aria-label={`${site.name}, accueil`}>
					<Poincon className="h-9 w-[4.2rem] text-graphite" />
					<span className="leading-none">
						<span className="font-expanded block text-[1.05rem] font-extrabold tracking-tight">
							Monguillon
						</span>
						<span className="font-condensed mt-1 hidden text-[0.8rem] font-medium text-acier sm:block">
							Chaudronnerie & métallerie
						</span>
					</span>
				</Link>

				<nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
					<ul className="flex items-center gap-1">
						{links.map((l) => (
							<li key={l.href}>
								<Link
									href={l.href}
									className="inline-flex min-h-11 items-center px-3 text-[0.95rem] font-medium text-graphite/80 underline-offset-[6px] transition-colors hover:text-graphite hover:underline hover:decoration-minium hover:decoration-2">
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<div className="ml-auto hidden items-center gap-2 md:flex lg:ml-4">
					<a
						href={site.phone.href}
						className="inline-flex min-h-11 items-center gap-2 border border-graphite/25 px-3 text-sm font-semibold transition-colors hover:border-graphite hover:bg-graphite hover:text-zinc sm:px-4">
						<Phone className="size-4" aria-hidden="true" />
						<span className="hidden sm:inline">{site.phone.display}</span>
						<span className="sm:hidden">Appeler</span>
					</a>
					<Link
						href="#contact"
						className="inline-flex min-h-11 items-center bg-minium px-4 text-sm font-semibold text-white transition-colors hover:bg-minium-dark">
						<span className="sm:hidden">Devis</span>
						<span className="hidden sm:inline">Demander un devis</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
