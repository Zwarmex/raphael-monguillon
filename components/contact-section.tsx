// components/ContactSection.tsx
import { MapPin, Phone } from "lucide-react";

export default function ContactSection() {
	return (
		<section className="py-20 bg-industrial-900" id="contact">
			<div className="container mx-auto px-4">
				<div className="bg-safety p-1 md:p-2">
					<div className="bg-industrial-800 p-8 md:p-16 flex flex-col md:flex-row gap-12">
						<div className="md:w-1/2">
							<h2 className="font-heading text-4xl text-white uppercase mb-6">
								Parlons de votre projet
							</h2>
							<p className="text-gray-400 mb-8">
								N'hésitez pas à m'appeler pour discuter de vos
								besoins. Je me déplace pour étudier la
								faisabilité technique.
							</p>

							<div className="space-y-6">
								<div className="flex items-center gap-4">
									<div className="bg-industrial-900 p-3">
										<Phone className="text-safety" />
									</div>
									<div>
										<p className="text-sm text-gray-500 uppercase">
											Téléphone
										</p>
										<p className="text-white text-xl font-bold">
											06 XX XX XX XX
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="bg-industrial-900 p-3">
										<MapPin className="text-safety" />
									</div>
									<div>
										<p className="text-sm text-gray-500 uppercase">
											Atelier
										</p>
										<p className="text-white text-xl font-bold">
											63220 Arlanc / Ambert
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Formulaire simple (Placeholder visuel) */}
						<form className="md:w-1/2 space-y-4">
							<input
								type="text"
								placeholder="Nom complet"
								className="w-full bg-industrial-900 border border-white/10 p-4 text-white focus:border-safety outline-none"
							/>
							<input
								type="text"
								placeholder="Téléphone"
								className="w-full bg-industrial-900 border border-white/10 p-4 text-white focus:border-safety outline-none"
							/>
							<textarea
								placeholder="Description du projet..."
								rows={4}
								className="w-full bg-industrial-900 border border-white/10 p-4 text-white focus:border-safety outline-none"></textarea>
							<button className="w-full bg-safety text-white font-bold uppercase py-4 hover:bg-safety-hover transition-colors">
								Envoyer ma demande
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
