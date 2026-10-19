import { site } from "@/lib/site";

const steps = [
	{
		title: "Vous m'appelez",
		text: "Par téléphone ou via le formulaire, vous décrivez votre besoin : pièce à réparer, ouvrage à créer, contraintes du lieu.",
	},
	{
		title: "Je viens voir",
		text: "Je me déplace pour prendre les cotes et étudier la faisabilité technique avec vous, sur place.",
	},
	{
		title: "Vous recevez le devis",
		text: `Gratuit, ${site.quoteDelay}. Vous savez ce qui sera fait, en quelle matière, et pour quel prix.`,
	},
	{
		title: "Je fabrique",
		text: "Traçage, découpe, mise en forme et soudure à l'atelier d'Arlanc, puis pose ou livraison.",
	},
];

export default function Process() {
	return (
		<section id="methode" aria-labelledby="methode-title" className="border-y-2 border-graphite bg-tole py-20 lg:py-28">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
				<h2
					id="methode-title"
					className="font-expanded max-w-3xl text-3xl font-extrabold leading-[1.05] tracking-[-0.015em] sm:text-4xl lg:text-[2.75rem]">
					Du premier appel à la pièce posée
				</h2>

				<ol className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((s, i) => (
						<li key={s.title} className="relative">
							<div className="flex items-center gap-3" aria-hidden="true">
								<span className="font-expanded grid size-11 shrink-0 place-items-center border-2 border-graphite bg-zinc text-lg font-extrabold">
									{i + 1}
								</span>
								{i < steps.length - 1 && (
									<span className="hidden h-0.5 flex-1 bg-graphite/40 lg:block" />
								)}
							</div>
							<h3 className="mt-5 text-xl font-bold">
								<span className="sr-only">Étape {i + 1} : </span>
								{s.title}
							</h3>
							<p className="mt-2 text-acier">{s.text}</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
