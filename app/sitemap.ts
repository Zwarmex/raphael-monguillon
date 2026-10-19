import type { MetadataRoute } from "next";
import { offer, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: site.url, changeFrequency: "monthly", priority: 1 },
		...offer.map((o) => ({ url: `${site.url}${o.href}`, changeFrequency: "monthly" as const, priority: 0.8 })),
		{ url: `${site.url}/mentions-legales`, changeFrequency: "yearly" as const, priority: 0.1 },
	];
}
