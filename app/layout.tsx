import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { site } from "@/lib/site";
import "./globals.css";

// Une seule famille, utilisée dans trois largeurs : étendue (titres), normale (texte), étroite (annotations).
const archivo = Archivo({
	subsets: ["latin"],
	axes: ["wdth"],
	variable: "--font-archivo",
	display: "swap",
});

const title = "Chaudronnier métallier à Ambert et Arlanc (63) | Raphaël Monguillon";
const description =
	"Chaudronnerie et métallerie sur-mesure à Arlanc et Ambert : portails, escaliers, garde-corps, cuves, châssis, réparation agricole et TP. Soudure TIG/MIG. Devis gratuit sous 48 h.";

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: title, template: `%s | ${site.name}` },
	description,
	applicationName: site.name,
	authors: [{ name: site.name }],
	alternates: { canonical: "/" },
	openGraph: {
		type: "website",
		locale: "fr_FR",
		url: "/",
		siteName: `${site.name}, ${site.trade}`,
		title,
		description,
	},
	twitter: { card: "summary_large_image", title, description },
	robots: { index: true, follow: true, "max-image-preview": "large" },
	formatDetection: { telephone: false, email: false, address: false },
	category: "business",
};

export const viewport: Viewport = {
	themeColor: "#e7e8e4",
	colorScheme: "light",
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
				<SiteHeader />
				<main id="contenu" tabIndex={-1} className="focus:outline-none">
					{children}
				</main>
				<SiteFooter />
			</body>
		</html>
	);
}
