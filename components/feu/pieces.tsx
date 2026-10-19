// Dessins au trait des réalisations, en attendant les vraies photos.

const base = {
	viewBox: "0 0 240 200",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2.4,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
	"aria-hidden": true,
	focusable: false,
};

function Chapeau({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M100 190V96h40v94" />
			<path d="M92 96h56" strokeWidth={3.4} />
			<path d="M108 96V78m24 18V78" />
			<path d="M70 78h100L120 40Z" strokeWidth={3.4} />
			<path d="M84 78l36-30 36 30" opacity={0.45} />
			<path d="M120 40V26" />
			<path d="M60 190h120" opacity={0.4} strokeDasharray="8 6" />
		</svg>
	);
}

function Murale({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M58 20h124v150H58z" strokeWidth={3.2} />
			{Array.from({ length: 11 }, (_, i) => (
				<path key={i} d={`M${68 + i * 10.4} 26c-3 30 3 60 0 90s3 34 0 48`} opacity={0.35} strokeWidth={1.4} />
			))}
			{/* sapins découpés, comme les motifs du Livradois */}
			<path d="M92 120l14-34 14 34zm8 0v10M128 120l14-40 14 40zm9 0v10" stroke="var(--feu)" strokeWidth={2.2} />
			<path d="M40 190h160" opacity={0.4} strokeDasharray="8 6" />
		</svg>
	);
}

function Sol({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M30 150l40-50h100l40 50z" strokeWidth={3.2} />
			<path d="M44 150v8h152v-8" />
			<path d="M96 100V40h48v60" opacity={0.5} />
			<path d="M88 40h64" opacity={0.5} />
			<path d="M84 130h72" stroke="var(--feu)" strokeDasharray="2 7" strokeWidth={3} />
		</svg>
	);
}

function Lampe({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M88 26h64l18 46H70z" opacity={0.55} />
			<path d="M120 72v14" />
			<path d="M120 86c-10 10 10 18 0 28s10 18 0 28 10 18 0 28" strokeWidth={3.2} />
			<path d="M92 176h56l-8-6h-40z" strokeWidth={3} />
			<circle cx="120" cy="80" r="4" fill="var(--feu)" stroke="none" />
		</svg>
	);
}

function Divers({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M40 60h70v20H60v70H40z" strokeWidth={3.2} />
			<circle cx="50" cy="70" r="4" />
			<circle cx="50" cy="140" r="4" />
			<path d="M130 150l60-60m-48 72l60-60" />
			<path d="M130 150l12 12m48-72l12 12" />
			<path d="M150 60c10-10 30-10 40 0" stroke="var(--feu)" />
		</svg>
	);
}

export const pieces: Record<string, (p: { className?: string }) => React.ReactElement> = {
	"chapeau-cheminee": Chapeau,
	"protection-murale": Murale,
	"protection-sol": Sol,
	"pied-lampe": Lampe,
	divers: Divers,
};
