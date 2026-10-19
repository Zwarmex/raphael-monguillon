import { Menu, Phone } from "lucide-react";
import Link from "next/link";
import { site } from "@/lib/site";
import { FeuLogo } from "./logo";

const left = [
	{ href: "/#services", label: "Services" },
	{ href: "/#artisan", label: "Qui suis-je ?" },
];
const right = [
	{ href: "/#realisations", label: "Réalisations" },
	{ href: "/#contact", label: "Contact" },
];

const linkCls =
	"inline-flex min-h-11 items-center px-3 text-[0.95rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:text-[var(--text)]";

export default function FeuHeader() {
	return (
		<header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[#111214]/88 backdrop-blur-md">
			<div className="mx-auto grid h-[4.75rem] max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-10">
				<nav aria-label="Navigation principale, partie gauche" className="hidden lg:block">
					<ul className="flex">
						{left.map((l) => (
							<li key={l.href}>
								<Link href={l.href} className={linkCls}>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Menu mobile, sans JavaScript */}
				<details className="feu-menu relative lg:hidden">
					<summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
						<Menu className="size-5" aria-hidden="true" />
						Menu
					</summary>
					<nav aria-label="Navigation principale" className="absolute left-0 top-full mt-3 w-64 border border-[var(--line)] bg-[#18191c] p-2 shadow-2xl">
						<ul>
							{[...left, ...right].map((l) => (
								<li key={l.href}>
									<Link href={l.href} className={`${linkCls} w-full`}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</details>

				<Link href="/" className="justify-self-center" aria-label={`${site.name}, accueil`}>
					<FeuLogo size="sm" />
				</Link>

				<div className="flex items-center justify-end gap-2">
					<nav aria-label="Navigation principale, partie droite" className="hidden lg:block">
						<ul className="flex">
							{right.map((l) => (
								<li key={l.href}>
									<Link href={l.href} className={linkCls}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<a
						href={site.phone.href}
						className="hidden min-h-11 items-center gap-2 border border-[#4a4d52] px-3.5 text-sm font-semibold transition-colors hover:border-[var(--feu)] hover:text-[var(--feu-vif)] sm:inline-flex">
						<Phone className="size-4" aria-hidden="true" />
						<span className="hidden xl:inline">{site.phone.display}</span>
						<span className="xl:hidden">Appeler</span>
					</a>
				</div>
			</div>
		</header>
	);
}
