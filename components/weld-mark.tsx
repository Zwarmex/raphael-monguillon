/** Symbole de soudure d'angle (ISO 2553) : flèche, ligne de référence et triangle. */
export default function WeldMark({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 40 28" className={className} aria-hidden="true" focusable="false">
			<path
				d="M3 25 15 9h22"
				fill="none"
				stroke="currentColor"
				strokeWidth="2.6"
				strokeLinecap="square"
			/>
			<path d="M2 26.5 3.6 19.4 8.2 22.9z" fill="currentColor" />
			<path d="M21 9V1.5L28.5 9z" fill="var(--color-minium)" />
		</svg>
	);
}
