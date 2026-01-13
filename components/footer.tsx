// components/Footer.tsx
export default function Footer() {
	return (
		<footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 text-sm">
			<p>
				© {new Date().getFullYear()} Chaudronnerie du Livradois. Tous
				droits réservés.
			</p>
			<p className="mt-2">
				Site web réalisé avec Next.js - Optimisé pour le référencement
				local 63.
			</p>
		</footer>
	);
}
