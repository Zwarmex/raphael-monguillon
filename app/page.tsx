import About from "@/components/about";
import ContactSection from "@/components/contact-section";
import Faq from "@/components/faq";
import Hero from "@/components/hero";
import Process from "@/components/process";
import Services from "@/components/services";
import { faq, phoneIsPlaceholder, services, site } from "@/lib/site";

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "HomeAndConstructionBusiness",
	"@id": `${site.url}/#entreprise`,
	name: site.name,
	description:
		"Artisan chaudronnier métallier à Arlanc : métallerie et serrurerie sur-mesure, chaudronnerie industrielle, réparation agricole et TP.",
	url: site.url,
	image: `${site.url}/opengraph-image`,
	...(phoneIsPlaceholder ? {} : { telephone: site.phone.e164 }),
	address: {
		"@type": "PostalAddress",
		addressLocality: site.address.locality,
		postalCode: site.address.postalCode,
		addressRegion: site.address.region,
		addressCountry: site.address.country,
	},
	areaServed: site.area.map((name) => ({ "@type": "Place", name })),
	knowsAbout: ["Chaudronnerie", "Métallerie", "Serrurerie", "Soudure TIG", "Soudure MIG", "Rechargement dur"],
	hasOfferCatalog: {
		"@type": "OfferCatalog",
		name: "Savoir-faire",
		itemListElement: services.map((s) => ({
			"@type": "Offer",
			itemOffered: { "@type": "Service", name: s.title, description: s.desc },
		})),
	},
	// Rappel des questions visibles sur la page (aide les moteurs et les assistants IA)
	subjectOf: {
		"@type": "FAQPage",
		mainEntity: faq.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: { "@type": "Answer", text: f.a },
		})),
	},
};

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
			/>
			<Hero />
			<Services />
			<Process />
			<About />
			<Faq />
			<ContactSection />
		</>
	);
}
