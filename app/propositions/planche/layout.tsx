import type { Metadata } from "next";
import MobileActions from "@/components/mobile-actions";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = { title: "Planche de traçage" };

export default function PlancheLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="planche min-h-svh bg-zinc text-graphite">
			<SiteHeader />
			<main id="contenu" tabIndex={-1} className="focus:outline-none">
				{children}
			</main>
			<SiteFooter />
			<MobileActions />
		</div>
	);
}
