import { FileText, PencilRuler, Phone } from "lucide-react";
import { site } from "@/lib/site";

type Action = { href: string; label: string; icon: "phone" | "draw" | "quote" };

const icons = { phone: Phone, draw: PencilRuler, quote: FileText };

const defaults: Action[] = [
	{ href: site.phone.href, label: "Appeler", icon: "phone" },
	{ href: "#projet", label: "Dessiner", icon: "draw" },
	{ href: "#contact", label: "Devis", icon: "quote" },
];

/**
 * Barre d'actions fixée en bas de l'écran sur téléphone.
 * Couleurs : --bar-bg, --bar-fg, --bar-line, --bar-accent, --bar-on-accent (avec repli sur le thème du site).
 */
export default function MobileActions({ actions = defaults }: { actions?: Action[] }) {
	return (
		<>
			<div className="h-[calc(4rem+env(safe-area-inset-bottom))] md:hidden" aria-hidden="true" />
			<nav
				aria-label="Contact rapide"
				className="fixed inset-x-0 bottom-0 z-40 border-t border-[color:var(--bar-line,rgb(27_30_33/0.2))] bg-[var(--bar-bg,var(--color-zinc))] pb-[env(safe-area-inset-bottom)] text-[color:var(--bar-fg,var(--color-graphite))] md:hidden">
				<ul className="grid h-16" style={{ gridTemplateColumns: `repeat(${actions.length}, minmax(0, 1fr))` }}>
					{actions.map((a, i) => {
						const Icon = icons[a.icon];
						const last = i === actions.length - 1;
						return (
							<li key={a.label} className={i ? "border-l border-[color:var(--bar-line,rgb(27_30_33/0.2))]" : ""}>
								<a
									href={a.href}
									className={`flex h-full flex-col items-center justify-center gap-1 text-[0.8rem] font-semibold ${last ? "bg-[var(--bar-accent,var(--color-minium))] text-[color:var(--bar-on-accent,#fff)]" : ""}`}>
									<Icon className="size-5" aria-hidden="true" />
									{a.label}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}
