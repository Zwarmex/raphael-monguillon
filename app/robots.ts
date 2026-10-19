import type { MetadataRoute } from "next";
import { isProduction } from "@/lib/env";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
	// Staging : tout est fermé aux robots (le site est aussi en noindex, voir next.config.ts)
	if (!isProduction) return { rules: { userAgent: "*", disallow: "/" } };
	return {
		rules: { userAgent: "*", allow: "/" },
		sitemap: `${site.url}/sitemap.xml`,
		host: site.url,
	};
}
