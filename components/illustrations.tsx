// Petits dessins au trait, dans le même langage que la planche du haut.

const base = {
	viewBox: "0 0 240 160",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2.2,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
	"aria-hidden": true,
	focusable: false,
};

function Escalier({ className }: { className?: string }) {
	// 5 marches de 24 × 18, palier à droite, main courante à 44 au-dessus des nez de marche
	const rail = (x: number) => (x <= 116 ? 88 - (x - 20) * 0.75 : 16);
	const tread = (x: number) => (x <= 116 ? 132 - Math.floor((x - 20) / 24) * 18 : 60);
	const balusters = [32, 56, 80, 104, 128, 152, 176, 200];
	return (
		<svg {...base} className={className}>
			<path
				d={`M20 150 ${[0, 1, 2, 3, 4].map((i) => `V${132 - 18 * i} H${44 + 24 * i}`).join(" ")} V60 H224`}
				strokeWidth={2.6}
			/>
			<path d="M44 150 L140 78 V72 H224" />
			{balusters.map((x) => (
				<path key={x} d={`M${x} ${rail(x)} V${tread(x)}`} strokeWidth={1.6} />
			))}
			<path d="M20 150 V88 L116 16 H224 V60" strokeWidth={3.4} />
			<path d="M8 150 H232" strokeWidth={1.2} strokeDasharray="10 6" opacity={0.5} />
		</svg>
	);
}

function Cuve({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path d="M58 46 H182 A20 34 0 0 1 182 114 H58 A20 34 0 0 1 58 46 Z" strokeWidth={2.6} />
			<path d="M58 46 A12 34 0 0 1 58 114 M182 46 A12 34 0 0 0 182 114" strokeWidth={1.4} opacity={0.6} />
			<path d="M100 46 V114 M140 46 V114" stroke="var(--color-minium)" strokeDasharray="4 4" />
			<path d="M108 46 V34 H132 V46 M104 34 H136" />
			<path d="M76 114 L68 136 H100 L92 114 M148 114 L140 136 H172 L164 114" />
			<path d="M196 92 H214 M214 86 V98" />
			<path d="M8 136 H232" strokeWidth={1.2} strokeDasharray="10 6" opacity={0.5} />
		</svg>
	);
}

function Godet({ className }: { className?: string }) {
	return (
		<svg {...base} className={className}>
			<path
				d="M34 120 L150 130 C188 128 206 88 190 54 C182 38 172 32 160 30 L74 30 C62 60 50 90 34 120 Z"
				strokeWidth={2.6}
			/>
			<path d="M34 114 L12 122 L34 128" strokeWidth={2.6} />
			<path d="M148 30 V14 H178 V30" />
			<circle cx="163" cy="21" r="4" />
			<path d="M80 38 C70 64 60 88 48 112" opacity={0.5} strokeWidth={1.4} />
			<path
				d="M46 114 L148 123 C176 120 192 96 190 70"
				stroke="var(--color-minium)"
				strokeWidth={5}
				strokeDasharray="3 6"
			/>
			<path d="M8 146 H232" strokeWidth={1.2} strokeDasharray="10 6" opacity={0.5} />
		</svg>
	);
}

export const illustrations = {
	metallerie: Escalier,
	chaudronnerie: Cuve,
	reparation: Godet,
} as const;
