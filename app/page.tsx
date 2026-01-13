import AboutLocal from "@/components/about";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Services from "@/components/services";

export default function Home() {
	return (
		<main className="min-h-screen flex flex-col">
			{/* Navbar simplifiée incluse directement ou via un composant à part */}
			<nav className="fixed w-full z-50 bg-industrial-900/90 backdrop-blur border-b border-white/10 px-6 py-4 flex justify-between items-center">
				<div className="font-heading text-2xl font-bold tracking-wider text-white">
					NOM<span className="text-safety">ARTISAN</span>
				</div>
				<a
					href="#contact"
					className="bg-safety px-4 py-2 text-white font-bold uppercase text-sm hover:bg-safety-hover transition-colors">
					Demander un devis
				</a>
			</nav>

			<Hero />
			<Services />
			<AboutLocal />
			<ContactSection />
			<Footer />
		</main>
	);
}
