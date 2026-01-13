import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
	return (
		<section className="relative h-screen flex items-center justify-center overflow-hidden">
			{/* Background avec overlay sombre */}
			<div className="absolute inset-0 bg-black/60 z-10" />
			<div
				className="absolute inset-0 bg-cover bg-center z-0"
				style={{
					backgroundImage: "url('/chemin-vers-photo-soudure.jpg')",
				}} // Mettre une photo ici
			/>

			<div className="container mx-auto px-4 z-20 text-center relative pt-20">
				<div className="inline-block border border-safety/50 bg-black/30 px-4 py-1 mb-6 backdrop-blur-sm">
					<span className="text-safety font-bold tracking-widest text-sm uppercase">
						Puy-de-Dôme (63)
					</span>
				</div>

				<h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 leading-tight uppercase">
					Chaudronnerie & Métallerie <br />
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-safety to-orange-300">
						Sur-Mesure
					</span>
				</h1>

				<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
					Conception, soudure et réparation pour particuliers et
					industriels. Intervention rapide sur{" "}
					<strong>Ambert, Arlanc</strong> et tout le Livradois-Forez.
				</p>

				<div className="flex flex-col md:flex-row gap-4 justify-center items-center">
					<a
						href="#contact"
						className="bg-safety text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-safety-hover transition-all flex items-center gap-2">
						Devis Gratuit <ArrowRight className="w-5 h-5" />
					</a>
					<a
						href="tel:0600000000"
						className="border border-white/20 bg-white/5 text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
						<Phone className="w-5 h-5" /> 06 XX XX XX XX
					</a>
				</div>
			</div>
		</section>
	);
}
