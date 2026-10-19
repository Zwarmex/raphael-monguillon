import type { Metadata } from "next";

// Pistes de design à comparer : non indexées, hors sitemap.
export const metadata: Metadata = {
	title: { default: "Propositions de design", template: "%s | Propositions de design" },
	robots: { index: false, follow: false },
};

export default function PropositionsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
