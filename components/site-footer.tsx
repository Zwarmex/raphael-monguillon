import Link from "next/link";
import { services, site } from "@/lib/site";
import WeldMark from "./weld-mark";

export default function SiteFooter() {
	return (
		<footer className="on-dark border-t border-cendre/15 bg-forge text-cendre">
			<div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 lg:px-10">
				<div className="md:col-span-5">
					<div className="flex items-center gap-3 text-zinc">
						<WeldMark className="h-7 w-10" />
						<span className="font-expanded text-lg font-extrabold">{site.name}</span>
					</div>
					<p className="mt-4 max-w-sm">
						{site.trade} à {site.address.locality} ({site.address.postalCode}), au service
						d&apos;Ambert et du Livradois-Forez.
					</p>
				</div>
				<nav aria-label="Savoir-faire" className="md:col-span-3">
					<p className="font-semibold text-zinc">Savoir-faire</p>
					<ul className="mt-3 space-y-1">
						{services.map((s) => (
							<li key={s.id}>
								<Link href={`/#${s.id}`} className="inline-flex min-h-10 items-center hover:text-zinc hover:underline">
									{s.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
				<div className="md:col-span-4">
					<p className="font-semibold text-zinc">Contact</p>
					<ul className="mt-3 space-y-1">
						<li>
							<a href={site.phone.href} className="inline-flex min-h-10 items-center hover:text-zinc hover:underline">
								{site.phone.display}
							</a>
						</li>
						<li>
							<Link href="/#contact" className="inline-flex min-h-10 items-center hover:text-zinc hover:underline">
								Demander un devis
							</Link>
						</li>
						<li className="flex min-h-10 items-center">
							Atelier à {site.address.locality}, {site.address.department}
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-cendre/15">
				<div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:justify-between sm:px-6 lg:px-10">
					<p>
						© {new Date().getFullYear()} {site.name}. Tous droits réservés.
					</p>
					<Link href="/mentions-legales" className="hover:text-zinc hover:underline">
						Mentions légales
					</Link>
				</div>
			</div>
		</footer>
	);
}
