// Toutes les informations de l'entreprise, au même endroit.
// Les champs marqués TODO sont à compléter avant la mise en ligne.

export const site = {
	name: "Fer & Feu",
	owner: "Raphaël Monguillon",
	trade: "Chaudronnerie & métallerie",
	baseline: "Structure & entretien",
	slogan: "La solidité par l'expérience",
	signature: "Sérieux, savoir-faire et travail soigné.",
	tagline: "Métallier chaudronnier à Arlanc",
	// TODO : domaine définitif (ou variable NEXT_PUBLIC_SITE_URL)
	url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.feretfeu.fr",
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
		company: "Fer & Feu, entreprise individuelle (micro-entreprise) de Raphaël Monguillon",
		siret: "À compléter",
		address: "À compléter (adresse de l'atelier)",
		email: "À compléter",
		host: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
		vat: "TVA non applicable, article 293 B du Code général des impôts.",
		insurance:
			"Fer & Feu est couverte par une assurance responsabilité civile professionnelle pour l'ensemble des prestations réalisées.",
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

// --- Contenu Fer & Feu (textes fournis par l'artisan, relus) ---

export const offer = [
	{
		id: "chaudronnerie",
		title: "Chaudronnerie",
		desc: "Cuves, gaines, châssis et pièces unitaires ou petites séries, conçus et soudés sur mesure.",
	},
	{
		id: "metallerie",
		title: "Métallerie & ferronnerie",
		desc: "Escaliers, garde-corps, verrières, portails : des ouvrages sur mesure pour votre habitat.",
	},
	{
		id: "cheminee",
		title: "Entretien de cheminées",
		desc: "Entretien et nettoyage de cheminées, interventions techniques sur les conduits de fumée, chapeaux et protections sur mesure.",
	},
	{
		id: "restauration",
		title: "Restauration & réparation",
		desc: "Remise en état d'ouvrages métalliques, soudure de réparation sur godets, remorques et machines agricoles.",
	},
] as const;

export const story = {
	history:
		"Animé par l'envie d'apprendre sur le terrain, j'ai fait dès l'âge de 16 ans le choix de l'alternance pour me confronter à la réalité du métier. C'est au sein de l'entreprise Compte que j'ai fait mes premières armes et que j'ai grandi professionnellement.",
	expertise:
		"Fer & Feu est une entreprise artisanale spécialisée en métallerie, ferronnerie et interventions techniques liées aux conduits de fumée. Des prestations sérieuses, propres et adaptées aux besoins des particuliers comme des professionnels.",
} as const;

export const steps = [
	{ title: "Sélection du métal", text: "Je choisis avec soin un métal de qualité, adapté à chaque projet." },
	{ title: "Conception du modèle", text: "Chaque modèle est conçu sur mesure, en alliant design et fonctionnalité." },
	{ title: "Fabrication du modèle", text: "Je fabrique chaque pièce avec soin et précision, puis je la pose ou la livre." },
] as const;

// TODO : photos réelles à déposer dans public/realisations/ (voir README)
export const realisations = [
	{
		id: "chapeau-cheminee",
		title: "Chapeau de cheminée",
		text: "Chapeau de cheminée en métal, fabriqué sur mesure pour coiffer le conduit et le protéger des intempéries.",
		photo: null as string | null,
	},
	{
		id: "protection-murale",
		title: "Plaque de protection murale",
		text: "Protection murale en métal sur mesure avec motifs découpés, finition brossée. Idéale pour poêles et cheminées, alliant sécurité et esthétique industrielle.",
		photo: null as string | null,
	},
	{
		id: "protection-sol",
		title: "Plaque de protection de sol",
		text: "Plaque de sol en métal, découpée à la forme de votre foyer pour protéger le parquet ou le carrelage devant le poêle.",
		photo: null as string | null,
	},
	{
		id: "pied-lampe",
		title: "Pied de lampe",
		text: "Pied de lampe en métal façonné à la main : une pièce unique, entre objet de décoration et savoir-faire d'atelier.",
		photo: null as string | null,
	},
	{
		id: "divers",
		title: "Pièces diverses",
		text: "Supports, réparations, petites pièces sur mesure : si c'est en métal, parlons-en.",
		photo: null as string | null,
	},
];
