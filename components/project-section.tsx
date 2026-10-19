import Configurator from "./configurator";

export default function ProjectSection() {
	return (
		<section id="projet" aria-labelledby="projet-title" className="border-t-2 border-graphite py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
				<div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
					<h2
						id="projet-title"
						className="font-expanded text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:col-span-6 lg:text-[2.75rem]">
						Dessinez votre projet
					</h2>
					<p className="max-w-xl text-lg text-acier lg:col-span-5 lg:col-start-8 lg:pt-2">
						Réglez les dimensions : le plan se trace comme à l&apos;atelier. Envoyez-le
						avec votre demande, le devis part de là.
					</p>
				</div>
				<div className="mt-14">
					<Configurator />
				</div>
				<p className="mt-12 max-w-2xl text-acier">
					Une cuve, une pièce industrielle ou une machine à réparer ?{" "}
					<a href="#contact" className="font-semibold text-graphite underline decoration-minium decoration-2 underline-offset-4 hover:text-minium">
						Décrivez-la directement dans le formulaire
					</a>
					.
				</p>
			</div>
		</section>
	);
}
