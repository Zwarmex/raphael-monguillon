// Dessins paramétriques du configurateur : tout est calculé en centimètres,
// puis mis à l'échelle sur la largeur réelle du dessin (1 unité SVG = 1 px).

import type { ReactNode } from "react";

export type Kind = "garde-corps" | "portail" | "escalier";
export type Material = "Acier" | "Inox" | "Aluminium";

export type Config = {
	kind: Kind;
	material: Material;
	gc: { length: number; height: number; infill: "barreaux" | "lisses" | "tole" };
	portail: { width: number; height: number; opening: "battant" | "coulissant"; infill: "barreaux" | "tole" | "lames" };
	escalier: { rise: number; rail: boolean };
};

export const defaultConfig: Config = {
	kind: "garde-corps",
	material: "Acier",
	gc: { length: 400, height: 100, infill: "barreaux" },
	portail: { width: 350, height: 150, opening: "battant", infill: "barreaux" },
	escalier: { rise: 270, rail: true },
};

/** Espacement maximal entre deux éléments de remplissage (cm). */
const GAP = 11;

const nf1 = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const m2 = (cm: number) => `${nf2.format(cm / 100)} m`;

type Frame = {
	/** cm → px */
	x: (cm: number) => number;
	y: (cm: number) => number;
	s: number;
};

export type Drawing = { height: number; body: ReactNode; summary: string; facts: { k: string; v: string }[] };

const PAD = { l: 64, r: 28, t: 28, b: 64 };

function frame(width: number, spanX: [number, number], spanY: [number, number], maxH = 440): { f: Frame; height: number } {
	const w = spanX[1] - spanX[0];
	const h = spanY[1] - spanY[0];
	const s = Math.min((width - PAD.l - PAD.r) / w, (maxH - PAD.t - PAD.b) / h);
	const height = Math.round(h * s + PAD.t + PAD.b);
	return {
		height,
		f: {
			s,
			x: (cm) => PAD.l + (cm - spanX[0]) * s,
			y: (cm) => PAD.t + (spanY[1] - cm) * s,
		},
	};
}

function HDim({ f, x1, x2, y, label }: { f: Frame; x1: number; x2: number; y: number; label: string }) {
	const py = f.y(y) + 30;
	return (
		<g className="cfg-dim">
			<path d={`M${f.x(x1)} ${f.y(y) + 6}V${py + 8}M${f.x(x2)} ${f.y(y) + 6}V${py + 8}`} className="ext" />
			<path d={`M${f.x(x1)} ${py}H${f.x(x2)}`} markerStart="url(#cfg-arrow)" markerEnd="url(#cfg-arrow)" />
			<text x={(f.x(x1) + f.x(x2)) / 2} y={py - 7} textAnchor="middle">
				{label}
			</text>
		</g>
	);
}

function VDim({ f, y1, y2, x, label }: { f: Frame; y1: number; y2: number; x: number; label: string }) {
	const px = f.x(x) - 30;
	const cy = (f.y(y1) + f.y(y2)) / 2;
	return (
		<g className="cfg-dim">
			<path d={`M${f.x(x) - 6} ${f.y(y1)}H${px - 8}M${f.x(x) - 6} ${f.y(y2)}H${px - 8}`} className="ext" />
			<path d={`M${px} ${f.y(y1)}V${f.y(y2)}`} markerStart="url(#cfg-arrow)" markerEnd="url(#cfg-arrow)" />
			<text x={px - 8} y={cy} textAnchor="middle" transform={`rotate(-90 ${px - 8} ${cy})`}>
				{label}
			</text>
		</g>
	);
}

function Ground({ f, x1, x2 }: { f: Frame; x1: number; x2: number }) {
	const y = f.y(0);
	const hatch = [];
	for (let x = f.x(x1); x < f.x(x2); x += 12) hatch.push(`M${x} ${y + 10}l10 -10`);
	return (
		<g>
			<path d={`M${f.x(x1)} ${y}H${f.x(x2)}`} className="cfg-bold" />
			<path d={hatch.join("")} className="cfg-thin" />
		</g>
	);
}

/** Barreaux verticaux entre x1 et x2, du bas `yb` au haut `yt`. Renvoie aussi leur nombre. */
function bars(f: Frame, x1: number, x2: number, yb: number, yt: number) {
	const n = Math.max(0, Math.ceil((x2 - x1) / GAP) - 1);
	const step = (x2 - x1) / (n + 1);
	const d = Array.from({ length: n }, (_, i) => `M${f.x(x1 + step * (i + 1))} ${f.y(yb)}V${f.y(yt)}`).join("");
	return { n, el: <path d={d} className="cfg-mid" /> };
}

function rails(f: Frame, x1: number, x2: number, yb: number, yt: number) {
	const n = Math.max(0, Math.ceil((yt - yb) / GAP) - 1);
	const step = (yt - yb) / (n + 1);
	const d = Array.from({ length: n }, (_, i) => `M${f.x(x1)} ${f.y(yb + step * (i + 1))}H${f.x(x2)}`).join("");
	return { n, el: <path d={d} className="cfg-mid" /> };
}

function gardeCorps(c: Config["gc"], width: number): Drawing {
	const { length: L, height: H, infill } = c;
	const { f, height } = frame(width, [0, L], [-6, H]);
	const spans = Math.ceil(L / 150);
	const posts = Array.from({ length: spans + 1 }, (_, i) => (L / spans) * i);
	let count = 0;
	const fills: ReactNode[] = [];
	for (let i = 0; i < spans; i++) {
		const x1 = posts[i] + 2;
		const x2 = posts[i + 1] - 2;
		if (infill === "barreaux") {
			const b = bars(f, x1, x2, 10, H - 5);
			count += b.n;
			fills.push(<g key={i}>{b.el}</g>);
		} else if (infill === "lisses") {
			const r = rails(f, x1, x2, 10, H - 5);
			count += r.n;
			fills.push(<g key={i}>{r.el}</g>);
		} else {
			fills.push(
				<rect
					key={i}
					x={f.x(x1 + 3)}
					y={f.y(H - 10)}
					width={(x2 - x1 - 6) * f.s}
					height={(H - 25) * f.s}
					fill="url(#cfg-perfo)"
					className="cfg-mid"
				/>,
			);
		}
	}
	const infillLabel =
		infill === "barreaux" ? `${count} barreaux` : infill === "lisses" ? `${count} lisses par travée` : `${spans} panneaux de tôle perforée`;
	return {
		height,
		body: (
			<>
				<Ground f={f} x1={-20} x2={L + 20} />
				{fills}
				<path d={`M${f.x(0)} ${f.y(10)}H${f.x(L)}`} className="cfg-mid" />
				{posts.map((p) => (
					<rect key={p} x={f.x(p) - 3} y={f.y(H)} width={6} height={H * f.s} className="cfg-solid" />
				))}
				<rect x={f.x(-3)} y={f.y(H + 2)} width={(L + 6) * f.s} height={Math.max(5, 5 * f.s)} className="cfg-solid" />
				<HDim f={f} x1={0} x2={L} y={-6} label={m2(L)} />
				<VDim f={f} y1={0} y2={H} x={-6} label={m2(H)} />
			</>
		),
		summary: `Garde-corps de ${m2(L)} de long sur ${m2(H)} de haut, ${infillLabel}, ${spans + 1} poteaux`,
		facts: [
			{ k: "Longueur", v: m2(L) },
			{ k: "Hauteur", v: m2(H) },
			{ k: "Poteaux", v: String(spans + 1) },
			{ k: "Remplissage", v: infillLabel },
		],
	};
}

function portail(c: Config["portail"], width: number): Drawing {
	const { width: W, height: H, opening, infill } = c;
	const pil = 35;
	const slide = opening === "coulissant";
	const x0 = slide ? -W - pil : -pil;
	const { f, height } = frame(width, [x0, W + pil], [-6, H + 20]);
	const leaves: [number, number][] = slide ? [[2, W - 2]] : [[2, W / 2 - 1], [W / 2 + 1, W - 2]];
	let count = 0;
	const leafEls = leaves.map(([a, b], i) => {
		let fill: ReactNode;
		if (infill === "barreaux") {
			const r = bars(f, a + 4, b - 4, 12, H - 4);
			count += r.n;
			fill = r.el;
		} else if (infill === "lames") {
			const n = Math.floor((H - 18) / 15);
			count += n;
			fill = (
				<path
					d={Array.from({ length: n }, (_, k) => {
						const y = 12 + 3 + k * 15;
						return `M${f.x(a + 4)} ${f.y(y)}H${f.x(b - 4)}V${f.y(y + 12)}H${f.x(a + 4)}Z`;
					}).join("")}
					className="cfg-mid"
				/>
			);
		} else {
			fill = <rect x={f.x(a + 4)} y={f.y(H - 4)} width={(b - a - 8) * f.s} height={(H - 16) * f.s} fill="url(#cfg-hatch)" />;
		}
		return (
			<g key={i}>
				<rect x={f.x(a)} y={f.y(H)} width={(b - a) * f.s} height={(H - 8) * f.s} className="cfg-frame" />
				{fill}
			</g>
		);
	});
	const infillLabel = infill === "barreaux" ? `${count} barreaux` : infill === "lames" ? `${count} lames` : "tôle pleine";
	return {
		height,
		body: (
			<>
				<Ground f={f} x1={x0 - 10} x2={W + pil + 10} />
				{[-pil, W].map((x) => (
					<rect key={x} x={f.x(x)} y={f.y(H + 20)} width={pil * f.s} height={(H + 20) * f.s} fill="url(#cfg-hatch)" className="cfg-mid" />
				))}
				{slide && (
					<g>
						<path d={`M${f.x(-W - pil)} ${f.y(3)}H${f.x(W)}`} className="cfg-mid" />
						<rect x={f.x(-W + 2 - pil)} y={f.y(H)} width={(W - 4) * f.s} height={(H - 8) * f.s} className="cfg-ghost" />
						<path
							d={`M${f.x(W * 0.75)} ${f.y(H / 2)}H${f.x(W * 0.25)}`}
							className="cfg-accent"
							markerEnd="url(#cfg-arrow)"
						/>
					</g>
				)}
				{leafEls}
				<HDim f={f} x1={0} x2={W} y={-6} label={`${m2(W)} entre piliers`} />
				<VDim f={f} y1={0} y2={H} x={x0 - 4} label={m2(H)} />
			</>
		),
		summary: `Portail ${slide ? "coulissant" : "battant à deux vantaux"} de ${m2(W)} entre piliers sur ${m2(H)} de haut, ${infillLabel}`,
		facts: [
			{ k: "Ouverture", v: slide ? "Coulissant" : "Battant, 2 vantaux" },
			{ k: "Passage", v: m2(W) },
			{ k: "Hauteur", v: m2(H) },
			{ k: "Remplissage", v: infillLabel },
		],
	};
}

function escalier(c: Config["escalier"], width: number): Drawing {
	const { rise: R, rail } = c;
	const n = Math.max(2, Math.round(R / 17.5));
	const h = R / n;
	// Loi de Blondel : 2h + g ≈ 63 cm pour un pas confortable
	const g = Math.min(30, Math.max(22, 63 - 2 * h));
	const run = (n - 1) * g;
	const top = R + (rail ? 95 : 20);
	const { f, height } = frame(width, [-10, run + 90], [-6, top]);
	const profile = [`M${f.x(0)} ${f.y(0)}`];
	for (let i = 0; i < n; i++) {
		profile.push(`V${f.y((i + 1) * h)}`);
		profile.push(`H${f.x(i < n - 1 ? (i + 1) * g : run + 90)}`);
	}
	// Ligne des nez de marche : y = h + x·h/g ; main courante 90 cm au-dessus.
	const railY = (x: number) => h + (x * h) / g + 90;
	const tread = (x: number) => (Math.floor(x / g) + 1) * h;
	const balusters = rail
		? Array.from({ length: (n - 1) * 2 }, (_, i) => {
				const x = (i + 0.5) * (g / 2);
				return `M${f.x(x)} ${f.y(tread(x))}V${f.y(railY(x))}`;
			}).join("")
		: "";
	return {
		height,
		body: (
			<>
				<Ground f={f} x1={-10} x2={run + 90} />
				<rect x={f.x(run)} y={f.y(R)} width={90 * f.s} height={18 * f.s} fill="url(#cfg-hatch)" className="cfg-mid" />
				<path d={profile.join("")} className="cfg-bold" />
				<path d={`M${f.x(g * 0.6)} ${f.y(0)}L${f.x(run)} ${f.y(R - 22)}`} className="cfg-mid" />
				{rail && (
					<>
						<path d={balusters} className="cfg-thin" />
						<path d={`M${f.x(0)} ${f.y(h + 90)}L${f.x(run)} ${f.y(R + 90)}`} className="cfg-bold" />
						<path d={`M${f.x(0)} ${f.y(h)}V${f.y(h + 90)}M${f.x(run)} ${f.y(R)}V${f.y(R + 90)}`} className="cfg-bold" />
					</>
				)}
				<HDim f={f} x1={0} x2={run} y={-6} label={`${m2(run)} au sol`} />
				<VDim f={f} y1={0} y2={R} x={-10} label={m2(R)} />
			</>
		),
		summary: `Escalier droit pour ${m2(R)} de hauteur à monter : ${n} marches de ${nf1.format(h)} cm, giron de ${nf1.format(g)} cm, ${m2(run)} d'emprise au sol, ${rail ? "avec" : "sans"} garde-corps`,
		facts: [
			{ k: "Marches", v: `${n} × ${nf1.format(h)} cm` },
			{ k: "Giron", v: `${nf1.format(g)} cm` },
			{ k: "Emprise au sol", v: m2(run) },
			{ k: "Pas (2h + g)", v: `${nf1.format(2 * h + g)} cm` },
		],
	};
}

export function draw(c: Config, width: number): Drawing {
	if (c.kind === "portail") return portail(c.portail, width);
	if (c.kind === "escalier") return escalier(c.escalier, width);
	return gardeCorps(c.gc, width);
}
