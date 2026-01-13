import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

// On définit les variables CSS ici (--font-inter, etc.)
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const oswald = Oswald({
	subsets: ["latin"],
	variable: "--font-oswald",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Chaudronnerie Métallerie Ambert Arlanc | Soudure & Sur-mesure 63",
	description:
		"Artisan chaudronnier à Ambert et Arlanc. Conception métal, réparation agricole, portails et escaliers sur-mesure dans le Puy-de-Dôme. Devis gratuit.",
	keywords:
		"Chaudronnier Ambert, Métallier Arlanc, Soudure 63, Portail sur mesure, Réparation agricole Livradois",
};
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className="scroll-smooth">
			<body
				className={`${inter.variable} ${oswald.variable} antialiased bg-industrial-900 text-industrial-100`}>
				{children}
			</body>
		</html>
	);
}
