// Toutes les informations de l'entreprise, au même endroit.
// Les champs marqués TODO sont à compléter avant la mise en ligne.

export const site = {
	name: "Raphaël Monguillon",
	trade: "Chaudronnerie & métallerie",
	tagline: "Chaudronnier métallier à Arlanc",
	// TODO : domaine définitif (ou variable NEXT_PUBLIC_SITE_URL)
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.raphael-monguillon.fr",
	// TODO : vrai numéro
	phone: {
		display: "06 XX XX XX XX",
		href: "tel:+33600000000",
		e164: "+33600000000",
	},
	address: {
		locality: "Arlanc",
		postalCode: "63220",
		department: "Puy-de-Dôme",
		region: "Auvergne-Rhône-Alpes",
		country: "FR",
	},
	area: ["Arlanc", "Ambert", "Marsac-en-Livradois", "Vertolaye", "Livradois-Forez", "Puy-de-Dôme"],
	materials: ["Acier", "Inox", "Aluminium"],
	processes: "Soudure TIG / MIG",
	quoteDelay: "sous 48 h",
	// TODO : mentions légales (obligatoires pour un professionnel)
	legal: {
		company: "À compléter (raison sociale ou nom de l'entreprise individuelle)",
		siret: "À compléter",
		address: "À compléter (adresse de l'atelier)",
		email: "À compléter",
		host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
	},
} as const;

/** Vrai tant que le numéro de téléphone n'a pas été renseigné. */
export const phoneIsPlaceholder = site.phone.display.includes("X");

export const services = [
	{
		id: "metallerie",
		title: "Métallerie & serrurerie",
		desc: "Création d'escaliers design, garde-corps, verrières et portails sur-mesure pour votre habitat.",
		items: ["Escaliers", "Garde-corps", "Verrières", "Portails"],
		for: "Particuliers",
	},
	{
		id: "chaudronnerie",
		title: "Chaudronnerie industrielle",
		desc: "Conception de cuves, gaines, châssis et pièces unitaires ou petites séries pour l'industrie.",
		items: ["Cuves", "Gaines", "Châssis", "Pièces unitaires", "Petites séries"],
		for: "Industriels",
	},
	{
		id: "reparation",
		title: "Réparation agricole & TP",
		desc: "Soudure de réparation sur godets, remorques et machines agricoles. Rechargement dur.",
		items: ["Godets", "Remorques", "Machines agricoles", "Rechargement dur"],
		for: "Agriculteurs et entreprises de TP",
	},
] as const;

export const faq = [
	{
		q: "Dans quel secteur intervenez-vous ?",
		a: "L'atelier est à Arlanc. J'interviens à Ambert, Arlanc et dans tout le Livradois-Forez, et je me déplace dans le Puy-de-Dôme.",
	},
	{
		q: "Combien de temps pour recevoir un devis ?",
		a: "Le devis est gratuit et vous le recevez sous 48 h. Pour les projets qui le demandent, je me déplace d'abord pour étudier la faisabilité technique sur place.",
	},
	{
		q: "Quels métaux travaillez-vous ?",
		a: "L'acier, l'inox et l'aluminium, en soudure TIG et MIG.",
	},
	{
		q: "Réparez-vous le matériel agricole et de TP ?",
		a: "Oui : soudure de réparation sur godets, remorques et machines agricoles, ainsi que le rechargement dur des pièces d'usure.",
	},
	{
		q: "Faites-vous des pièces à l'unité ?",
		a: "Oui. Tout est fait sur-mesure, de la pièce unitaire à la petite série, adapté aux contraintes de vos bâtiments et de vos machines.",
	},
] as const;
