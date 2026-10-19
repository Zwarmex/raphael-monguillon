import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Une seule famille, utilisée dans trois largeurs : étendue (titres), normale (texte), étroite (annotations).
const archivo = Archivo({
	subsets: ["latin"],
	axes: ["wdth"],
	variable: "--font-archivo",
	display: "swap",
});

const title = "Fer & Feu | Métallier chaudronnier à Ambert et Arlanc (63)";
const description =
	"Fer & Feu, artisan à Arlanc : chaudronnerie, métallerie et ferronnerie sur mesure, restauration, entretien et nettoyage de cheminées. Ambert, Livradois-Forez. Devis gratuit sous 48 h.";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: title, template: `%s | ${site.name}` },
	description,
	applicationName: site.name,
	authors: [{ name: site.owner }],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "/",
		siteName: site.name,
		title,
		description,
	},
	twitter: { card: "summary_large_image", title, description },
	robots: { index: true, follow: true, "max-image-preview": "large" },
	formatDetection: { telephone: false, email: false, address: false },
	category: "business",
};

export const viewport: Viewport = {
	themeColor: "#111214",
	colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr" className={archivo.variable}>
			<body className="antialiased">
				<a
					href="#contenu"
					className="sr-only z-50 bg-graphite px-4 py-3 font-semibold text-zinc focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
					Aller au contenu
				</a>
				{children}
			</body>
		</html>
	);
}
