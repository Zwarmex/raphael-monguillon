import About from "@/components/about";
import ContactSection from "@/components/contact-section";
import Faq from "@/components/faq";
import Hero from "@/components/hero";
import Process from "@/components/process";
import ProjectSection from "@/components/project-section";
import Services from "@/components/services";

export default function Planche() {
	return (
		<>
			<Hero />
			<Services />
			<ProjectSection />
			<Process />
			<About />
			<Faq />
			<ContactSection />
		</>
	);
}
