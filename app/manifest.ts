import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${site.name}, ${site.baseline}`,
		short_name: "Fer & Feu",
		description: `${site.tagline}. Devis gratuit ${site.quoteDelay}.`,
		start_url: "/",
		display: "browser",
		background_color: "#111214",
		theme_color: "#111214",
		lang: "fr",
		icons: [
			{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
			{ src: "/apple-icon", sizes: "180x180", type: "image/png" },
		],
	};
}
