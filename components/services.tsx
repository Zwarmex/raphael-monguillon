import { Factory, Hammer, Wrench } from "lucide-react";

const services = [
	{
		icon: <Hammer className="w-10 h-10 text-safety" />,
		title: "Métallerie & Serrurerie",
		desc: "Création d'escaliers design, garde-corps, verrières et portails sur-mesure pour votre habitat.",
	},
	{
		icon: <Factory className="w-10 h-10 text-safety" />,
		title: "Chaudronnerie Industrielle",
		desc: "Conception de cuves, gaines, châssis et pièces unitaires ou petites séries pour l'industrie.",
	},
	{
		icon: <Wrench className="w-10 h-10 text-safety" />,
		title: "Réparation Agricole & TP",
		desc: "Soudure de réparation sur godets, remorques et machines agricoles. Rechargement dur.",
	},
];

export default function Services() {
	return (
		<section className="py-20 bg-industrial-900" id="services">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
					<div>
						<h2 className="font-heading text-4xl text-white uppercase mb-2">
							Nos Expertises
						</h2>
						<p className="text-gray-400">
							Précision et robustesse pour tous vos projets.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{services.map((service, index) => (
						<div
							key={index}
							className="bg-industrial-800 p-8 border border-industrial-700 hover:border-safety transition-all duration-300 group">
							<div className="mb-6 bg-industrial-900 w-fit p-4 group-hover:bg-safety/10 transition-colors">
								{service.icon}
							</div>
							<h3 className="font-heading text-2xl text-white mb-4 uppercase">
								{service.title}
							</h3>
							<p className="text-gray-400 leading-relaxed">
								{service.desc}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
