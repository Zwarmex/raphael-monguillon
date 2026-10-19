import type { NextConfig } from "next";

// SITE_ENV vient du fichier .env de l'environnement (voir .env.example) : seule la prod est indexable.
const isProduction = process.env.SITE_ENV === "production";

const securityHeaders = [
	{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "DENY" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
	...(isProduction ? [] : [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]),
];

const nextConfig: NextConfig = {
	// Image Docker : serveur Node autonome (activé par le Dockerfile)
	output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
	poweredByHeader: false,
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
};

export default nextConfig;
