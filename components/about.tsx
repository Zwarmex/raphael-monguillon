export default function AboutLocal() {
	return (
		<section className="py-20 bg-industrial-800 relative">
			<div className="container mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
				{/* Colonne Texte */}
				<div className="md:w-1/2">
					<h2 className="font-heading text-3xl md:text-4xl text-white uppercase mb-6">
						Artisan Chaudronnier au cœur du{" "}
						<span className="text-safety">Livradois-Forez</span>
					</h2>
					<div className="space-y-4 text-gray-300">
						<p>
							Basé entre <strong>Arlanc et Ambert</strong>, je
							mets mon savoir-faire au service des acteurs locaux.
							Que vous soyez agriculteur à Marsac-en-Livradois,
							industriel à Vertolaye ou particulier rénovant une
							maison en pierre.
						</p>
						<p>
							Contrairement aux produits standards, je propose des
							solutions <strong>100% sur-mesure</strong>, adaptées
							aux contraintes de vos bâtiments et machines. Je
							travaille l'acier, l'inox et l'aluminium avec le
							souci du détail et de la durabilité.
						</p>
					</div>

					<ul className="mt-8 grid grid-cols-2 gap-4">
						{[
							"Atelier à Arlanc",
							"Déplacement 63",
							"Soudure TIG/MIG",
							"Devis sous 48h",
						].map((item) => (
							<li
								key={item}
								className="flex items-center text-white font-bold">
								<span className="w-2 h-2 bg-safety mr-3"></span>{" "}
								{item}
							</li>
						))}
					</ul>
				</div>

				{/* Colonne Image (Placeholder) */}
				<div className="md:w-1/2 h-96 bg-industrial-900 border-2 border-white/10 relative flex items-center justify-center">
					{/* Remplacer par <Image /> de Next.js */}
					<p className="text-gray-500 text-center px-4">
						[Photo de l'artisan ou de l'atelier ici]
						<br />
						Important pour la confiance client
					</p>
					<div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-4 border-b-4 border-safety"></div>
				</div>
			</div>
		</section>
	);
}
