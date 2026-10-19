import { MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site";
import ContactForm from "./contact-form";

export default function ContactSection() {
	return (
		<section id="contact" aria-labelledby="contact-title" className="on-dark bg-forge text-zinc">
			<div className="revenu h-1.5 w-full" aria-hidden="true" />
			<div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:py-28">
				<div className="lg:col-span-5">
					<h2
						id="contact-title"
						className="font-expanded text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:text-[2.75rem]">
						Parlons de votre projet
					</h2>
					<p className="mt-6 max-w-md text-lg leading-relaxed text-cendre">
						N&apos;hésitez pas à m&apos;appeler pour discuter de vos besoins. Je me
						déplace pour étudier la faisabilité technique.
					</p>

					<ul className="mt-10 space-y-4">
						<li>
							<a
								href={site.phone.href}
								className="group flex items-center gap-4 border-2 border-cendre/25 p-4 transition-colors hover:border-paille">
								<span className="grid size-12 shrink-0 place-items-center bg-minium">
									<Phone className="size-5 text-white" aria-hidden="true" />
								</span>
								<span>
									<span className="font-condensed block text-[0.95rem] text-cendre">Téléphone</span>
									<span className="font-expanded block text-xl font-bold">{site.phone.display}</span>
								</span>
							</a>
						</li>
						<li className="flex items-center gap-4 border-2 border-cendre/25 p-4">
							<span className="grid size-12 shrink-0 place-items-center bg-forge-2">
								<MapPin className="size-5 text-paille" aria-hidden="true" />
							</span>
							<span>
								<span className="font-condensed block text-[0.95rem] text-cendre">Atelier</span>
								<span className="font-expanded block text-xl font-bold">
									{site.address.postalCode} {site.address.locality} / Ambert
								</span>
							</span>
						</li>
					</ul>
				</div>

				<div className="lg:col-span-6 lg:col-start-7">
					<ContactForm />
				</div>
			</div>
		</section>
	);
}
