import { Barlow, Big_Shoulders, Fraunces } from "next/font/google";
import FeuFooter from "@/components/feu/footer";
import FeuHeader from "@/components/feu/header";
import MobileActions from "@/components/mobile-actions";
import { site } from "@/lib/site";
import "./feu.css";

// Trois voix : capitales d'affiche (titres), serif chaleureux (sous-titres), sans robuste (texte).
const display = Big_Shoulders({ subsets: ["latin"], variable: "--font-feu-display", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-feu-serif", display: "swap" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-feu-body", display: "swap" });

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className={`feu min-h-svh ${display.variable} ${serif.variable} ${body.variable}`}>
			<FeuHeader />
			<main id="contenu" tabIndex={-1} className="focus:outline-none">
				{children}
			</main>
			<FeuFooter />
			<MobileActions
				actions={[
					{ href: site.phone.href, label: "Appeler", icon: "phone" },
					{ href: "/#realisations", label: "Réalisations", icon: "draw" },
					{ href: "/#contact", label: "Devis gratuit", icon: "quote" },
				]}
			/>
		</div>
	);
}
