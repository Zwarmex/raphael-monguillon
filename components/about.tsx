const facts = [
	{ k: "Atelier", v: "à Arlanc" },
	{ k: "Déplacement", v: "dans tout le 63" },
	{ k: "Soudure", v: "TIG et MIG" },
	{ k: "Devis", v: "sous 48 h" },
];

// Coordonnées approximatives, projetées simplement (x = longitude, y = latitude)
const towns = [
	{ name: "Vertolaye", lat: 45.643, lon: 3.703 },
	{ name: "Ambert", lat: 45.55, lon: 3.742 },
	{ name: "Marsac-en-Livradois", lat: 45.479, lon: 3.727 },
	{ name: "Arlanc", lat: 45.414, lon: 3.724, atelier: true },
];
const px = (lon: number) => 40 + (lon - 3.6) * 700;
const py = (lat: number) => (45.7 - lat) * 1000;
const tenKm = 0.09 * 1000;

function ZoneMap() {
	return (
		<svg
			viewBox="0 0 320 340"
			className="h-auto w-full"
			role="img"
			aria-labelledby="zone-title">
			<title id="zone-title">
				Secteur d&apos;intervention : de Vertolaye au nord jusqu&apos;à Arlanc au sud,
				en passant par Ambert et Marsac-en-Livradois
			</title>
			<path
				d={`M${towns.map((t) => `${px(t.lon).toFixed(1)} ${py(t.lat).toFixed(1)}`).join(" L")}`}
				fill="none"
				stroke="var(--color-trait)"
				strokeWidth="2"
				strokeDasharray="6 5"
			/>
			{towns.map((t) => {
				const x = px(t.lon);
				const y = py(t.lat);
				return (
					<g key={t.name}>
						{t.atelier ? (
							<>
								<circle cx={x} cy={y} r="22" fill="var(--color-minium)" opacity="0.12" />
								<rect x={x - 7} y={y - 7} width="14" height="14" fill="var(--color-minium)" />
							</>
						) : (
							<circle cx={x} cy={y} r="5.5" fill="var(--color-zinc)" stroke="var(--color-graphite)" strokeWidth="2.5" />
						)}
						<text
							x={x + 20}
							y={y + 5}
							fontSize="15"
							fontWeight={t.atelier ? 700 : 500}
							fill="var(--color-graphite)">
							{t.name}
							{t.atelier && (
								<tspan x={x + 20} dy="18" fontSize="13" fontWeight="500" fill="var(--color-minium)">
									l&apos;atelier
								</tspan>
							)}
						</text>
					</g>
				);
			})}
			{/* Nord */}
			<g transform="translate(270 40)" stroke="var(--color-graphite)" fill="none" strokeWidth="1.8">
				<path d="M0 -16 L7 10 L0 5 L-7 10 Z" fill="var(--color-graphite)" />
				<text y="30" textAnchor="middle" fontSize="13" stroke="none" fill="var(--color-graphite)">
					N
				</text>
			</g>
			{/* Échelle */}
			<g transform="translate(200 318)" stroke="var(--color-graphite)" strokeWidth="2">
				<path d={`M0 -5 V0 H${tenKm} V-5`} fill="none" />
				<text x={tenKm / 2} y="-10" textAnchor="middle" fontSize="13" stroke="none" fill="var(--color-graphite)">
					10 km
				</text>
			</g>
		</svg>
	);
}

export default function About() {
	return (
		<section id="atelier" aria-labelledby="atelier-title" className="py-20 lg:py-28">
			<div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
				<div className="lg:col-span-6">
					<h2
						id="atelier-title"
						className="font-expanded text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:text-[2.75rem]">
						Artisan chaudronnier au cœur du Livradois-Forez
					</h2>
					<div className="mt-8 max-w-[38rem] space-y-5 text-lg leading-relaxed text-acier">
						<p>
							Basé entre <strong className="font-semibold text-graphite">Arlanc et Ambert</strong>, je mets mon
							savoir-faire au service des acteurs locaux. Que vous soyez agriculteur à
							Marsac-en-Livradois, industriel à Vertolaye ou particulier rénovant une
							maison en pierre.
						</p>
						<p>
							Contrairement aux produits standards, je propose des solutions{" "}
							<strong className="font-semibold text-graphite">100&nbsp;% sur-mesure</strong>, adaptées aux
							contraintes de vos bâtiments et machines. Je travaille l&apos;acier,
							l&apos;inox et l&apos;aluminium avec le souci du détail et de la durabilité.
						</p>
					</div>

					<dl className="mt-10 grid max-w-[38rem] grid-cols-2 border-l-2 border-t-2 border-graphite">
						{facts.map((f) => (
							<div key={f.k} className="border-b-2 border-r-2 border-graphite px-4 py-4 sm:px-5">
								<dt className="font-condensed text-[0.95rem] font-medium text-acier">{f.k}</dt>
								<dd className="font-expanded mt-1 text-lg font-bold leading-tight">{f.v}</dd>
							</div>
						))}
					</dl>
				</div>

				<figure className="lg:col-span-5 lg:col-start-8">
					<div className="border-2 border-graphite bg-[#eceee9] p-5 shadow-[10px_10px_0_0_var(--color-tole)] sm:p-8">
						<ZoneMap />
					</div>
					<figcaption className="font-condensed mt-5 text-[0.95rem] text-acier">
						Secteur d&apos;intervention principal. Déplacements dans tout le
						Puy-de-Dôme sur demande.
					</figcaption>
				</figure>
			</div>
		</section>
	);
}
