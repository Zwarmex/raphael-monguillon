import Link from "next/link";
import { offer, site } from "@/lib/site";
import { FeuLogo } from "./logo";

export default function FeuFooter() {
	return (
		<footer className="feu-brushed border-t border-[var(--line)] text-[var(--muted)]">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-10">
				<div className="md:col-span-5">
					<FeuLogo size="md" />
					<p className="feu-serif mt-5 text-lg italic text-[var(--text)]">{site.slogan}</p>
					<p className="mt-2">
						{site.trade} à {site.address.locality} ({site.address.postalCode}), au service d&apos;Ambert et du
						Livradois-Forez.
					</p>
				</div>
				<nav aria-label="Services" className="md:col-span-3">
					<p className="font-semibold uppercase tracking-[0.12em] text-[var(--text)]">Services</p>
					<ul className="mt-3">
						{offer.map((o) => (
							<li key={o.id}>
								<Link href={o.href} className="inline-flex min-h-10 items-center hover:text-[var(--text)]">
									{o.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className="md:col-span-4">
					<p className="font-semibold uppercase tracking-[0.12em] text-[var(--text)]">Contact</p>
					<ul className="mt-3">
						<li>
							<a href={site.phone.href} className="inline-flex min-h-10 items-center hover:text-[var(--text)]">
								{site.phone.display}
							</a>
						</li>
						<li>
							<Link href="/#contact" className="inline-flex min-h-10 items-center hover:text-[var(--text)]">
								Demander un devis gratuit
							</Link>
						</li>
						<li className="flex min-h-10 items-center">
							Atelier à {site.address.locality}, {site.address.department}
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-[var(--line)]">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:justify-between sm:px-6 lg:px-10">
					<p>
						© {new Date().getFullYear()} {site.name}, {site.owner}. {site.signature}
					</p>
					<Link href="/mentions-legales" className="hover:text-[var(--text)]">
						Mentions légales
					</Link>
				</div>
			</div>
		</footer>
	);
}
