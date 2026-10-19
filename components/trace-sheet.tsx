import { pathOf, squareToRound, type V2 } from "@/lib/trace";

const piece = { side: 600, diameter: 400, height: 350, divisions: 4 };
const { flat, axo, n } = squareToRound(piece);

// Mise en page de la planche (unités SVG = mm à l'échelle 1)
const AXO: V2 = [700, 720];
const FLAT_SCALE = 0.86;
const FLAT: V2 = [300, 1020];
const W = 1700;
const H = 1720;

const at = (o: V2, s = 1) => (p: V2): V2 => [o[0] + p[0] * s, o[1] + p[1] * s];
const a = at(AXO);
const f = at(FLAT, FLAT_SCALE);

/** Cote parallèle au segment p→q, décalée de `off` vers l'extérieur. */
function Dim({ p, q, off, label }: { p: V2; q: V2; off: number; label: string }) {
	const dx = q[0] - p[0];
	const dy = q[1] - p[1];
	const len = Math.hypot(dx, dy);
	const nx = (-dy / len) * off;
	const ny = (dx / len) * off;
	const p1: V2 = [p[0] + nx, p[1] + ny];
	const q1: V2 = [q[0] + nx, q[1] + ny];
	const mid: V2 = [(p1[0] + q1[0]) / 2 + nx * 0.35, (p1[1] + q1[1]) / 2 + ny * 0.35];
	let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
	if (angle > 90) angle -= 180;
	if (angle < -90) angle += 180;
	return (
		<g className="dim">
			<path d={pathOf([p, [p1[0] + nx * 0.25, p1[1] + ny * 0.25]])} className="ext" />
			<path d={pathOf([q, [q1[0] + nx * 0.25, q1[1] + ny * 0.25]])} className="ext" />
			<path d={pathOf([p1, q1])} markerStart="url(#arrow)" markerEnd="url(#arrow)" />
			<text
				x={mid[0]}
				y={mid[1]}
				transform={`rotate(${angle.toFixed(1)} ${mid[0].toFixed(1)} ${mid[1].toFixed(1)})`}
				textAnchor="middle"
				dominantBaseline="middle">
				{label}
			</text>
		</g>
	);
}

export default function TraceSheet() {
	const corners = axo.corners.map(a);
	const bottomRing = axo.top.map(a); // le rond, en bas de la trémie

	const bottom = [flat.m0, ...flat.c, flat.m1].map(f);
	const arc = flat.p.map(f);
	const folds = flat.c.flatMap((c, k) =>
		Array.from({ length: n + 1 }, (_, j) => [f(c), f(flat.p[k * n + j])] as V2[]),
	);

	// Cote de hauteur : entre le plan du carré et le plan du rond
	const ringLeft = a(axo.top[(3 * n) / 2]);
	const hx = corners[1][0] - 70;
	const front = a(axo.top[n / 2]);
	const seamMid: V2 = [(bottom[0][0] + arc[0][0]) / 2, (bottom[0][1] + arc[0][1]) / 2];
	const midBottom: V2 = [(bottom[2][0] + bottom[3][0]) / 2, (bottom[2][1] + bottom[3][1]) / 2];

	return (
		<svg
			viewBox={`0 0 ${W} ${H}`}
			className="trace-sheet h-auto w-full"
			role="img"
			aria-labelledby="trace-title trace-desc">
			<title id="trace-title">Plan de traçage d&apos;une trémie carré-rond</title>
			<desc id="trace-desc">
				Vue en perspective d&apos;une trémie de 600 mm de côté, Ø 400 mm, hauteur
				350 mm, et son développé de tôle obtenu par triangulation, avec les lignes
				de pliage.
			</desc>
			<defs>
				<marker
					id="arrow"
					viewBox="0 0 10 10"
					refX="5"
					refY="5"
					markerWidth="9"
					markerHeight="9"
					orient="auto-start-reverse">
					<path d="M0 1.5 10 5 0 8.5z" fill="currentColor" />
				</marker>
			</defs>

			{/* Vue en perspective */}
			<g className="t t1">
				{axo.generators
					.filter((g) => !g.visible)
					.map((g, i) => (
						<path key={i} d={pathOf([a(g.from), a(g.to)])} className="hidden-line" />
					))}
			</g>
			<g className="t t2">
				{axo.generators
					.filter((g) => g.visible)
					.map((g, i) => (
						<path key={i} d={pathOf([a(g.from), a(g.to)])} className="fine" pathLength={1} />
					))}
			</g>
			<g className="t t1">
				<path d={pathOf(corners, true)} className="bold" pathLength={1} />
				<path d={pathOf(bottomRing, true)} className="bold" pathLength={1} />
			</g>

			<g className="t-fade t3">
				<Dim p={corners[1]} q={corners[2]} off={-70} label="600" />
				<g className="dim">
					<path d={pathOf([[corners[1][0] - 20, corners[1][1]], [hx - 30, corners[1][1]]])} className="ext" />
					<path d={pathOf([[ringLeft[0] - 20, ringLeft[1]], [hx - 30, ringLeft[1]]])} className="ext" />
					<path
						d={pathOf([[hx, ringLeft[1]], [hx, corners[1][1]]])}
						markerStart="url(#arrow)"
						markerEnd="url(#arrow)"
					/>
					<text
						x={hx - 24}
						y={(ringLeft[1] + corners[1][1]) / 2}
						transform={`rotate(-90 ${hx - 24} ${(ringLeft[1] + corners[1][1]) / 2})`}
						textAnchor="middle">
						350
					</text>
				</g>
				<g className="dim">
					<path d={pathOf([front, [front[0] + 110, front[1] + 110], [front[0] + 290, front[1] + 110]])} />
					<text x={front[0] + 125} y={front[1] + 92}>
						Ø 400
					</text>
				</g>
			</g>

			{/* Développé */}
			<g className="t t4">
				{folds.map((seg, i) => (
					<path key={i} d={pathOf(seg)} className="fold" />
				))}
			</g>
			<g className="t t5">
				<path d={pathOf(bottom)} className="bold" pathLength={1} />
				<path d={pathOf(arc)} className="bold" pathLength={1} />
				<path d={pathOf([bottom[0], arc[0]])} className="seam" pathLength={1} />
				<path d={pathOf([bottom[bottom.length - 1], arc[arc.length - 1]])} className="seam" pathLength={1} />
			</g>
			<g className="t-fade t6 notes">
				<text x={seamMid[0] - 24} y={seamMid[1] - 36} textAnchor="end">
					Soudure
				</text>
				<text x={midBottom[0]} y={midBottom[1] + 64} textAnchor="middle">
					Développé de la tôle, 16 divisions
				</text>
			</g>
		</svg>
	);
}
