/**
 * Poinçon de maître « RM » : losange frappé, comme la marque que les ferronniers
 * frappaient sur leurs ouvrages. Hérite de la couleur du texte.
 */
export default function Poincon({ className, label }: { className?: string; label?: string }) {
	return (
		<svg
			viewBox="0 0 120 64"
			className={className}
			role={label ? "img" : undefined}
			aria-label={label}
			aria-hidden={label ? undefined : true}
			focusable="false">
			<path d="M60 2 118 32 60 62 2 32Z" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
			<path d="M60 9 104 32 60 55 16 32Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
			{/* R */}
			<path
				d="M30 44V20h10.5c5 0 8 2.8 8 7s-3 7-8 7H36m4.5 0L49 44"
				fill="none"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
			{/* M */}
			<path
				d="M71 44V20l9 13 9-13v24"
				fill="none"
				stroke="currentColor"
				strokeWidth="5"
				strokeLinecap="square"
				strokeLinejoin="miter"
			/>
			{/* triangle de soudure, entre les initiales */}
			<path d="M57 44V36l7 8z" fill="currentColor" />
		</svg>
	);
}
