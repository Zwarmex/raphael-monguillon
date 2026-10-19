// Traçage d'une trémie carré-rond par triangulation, comme à l'atelier :
// on calcule les vraies longueurs en 3D, puis on déplie les triangles un à un.

type V2 = [number, number];
type V3 = [number, number, number];

const dist3 = (a: V3, b: V3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

/** Troisième sommet d'un triangle connaissant deux sommets et deux longueurs, du côté opposé à `away`. */
function third(A: V2, B: V2, dA: number, dB: number, away: V2): V2 {
	const dx = B[0] - A[0];
	const dy = B[1] - A[1];
	const d = Math.hypot(dx, dy);
	const a = (dA * dA - dB * dB + d * d) / (2 * d);
	const h = Math.sqrt(Math.max(0, dA * dA - a * a));
	const mx = A[0] + (a * dx) / d;
	const my = A[1] + (a * dy) / d;
	const c1: V2 = [mx - (h * dy) / d, my + (h * dx) / d];
	const c2: V2 = [mx + (h * dy) / d, my - (h * dx) / d];
	const side = (p: V2) => Math.sign(dx * (p[1] - A[1]) - dy * (p[0] - A[0]));
	return side(c1) !== side(away) ? c1 : c2;
}

export type Transition = {
	/** Côté du carré (mm) */
	side: number;
	/** Diamètre du rond (mm) */
	diameter: number;
	/** Hauteur (mm) */
	height: number;
	/** Divisions par quart de cercle */
	divisions: number;
};

export function squareToRound({ side, diameter, height, divisions: n }: Transition) {
	const s = side / 2;
	const r = diameter / 2;
	const corners: V3[] = [
		[s, s, 0],
		[-s, s, 0],
		[-s, -s, 0],
		[s, -s, 0],
	];
	const P: V3[] = Array.from({ length: 4 * n + 1 }, (_, i) => {
		const t = (i * Math.PI) / (2 * n);
		return [r * Math.cos(t), r * Math.sin(t), height];
	});
	const M: V3 = [s, 0, 0];

	// --- Développé ---
	const p2: V2[] = [];
	const c2: V2[] = [];
	const m0: V2 = [0, 0];
	p2[0] = [0, dist3(M, P[0])];
	c2[0] = third(m0, p2[0], dist3(M, corners[0]), dist3(P[0], corners[0]), [-1, p2[0][1] / 2]);
	let prev: V2 = m0;
	for (let k = 0; k < 4; k++) {
		const C = corners[k];
		for (let i = k * n; i < (k + 1) * n; i++) {
			p2[i + 1] = third(c2[k], p2[i], dist3(C, P[i + 1]), dist3(P[i], P[i + 1]), prev);
			prev = p2[i];
		}
		const last = (k + 1) * n;
		if (k < 3) {
			c2[k + 1] = third(c2[k], p2[last], dist3(C, corners[k + 1]), dist3(P[last], corners[k + 1]), prev);
			prev = c2[k];
		}
	}
	const m1 = third(c2[3], p2[4 * n], dist3(corners[3], M), dist3(P[4 * n], M), prev);

	// On remet la ligne m0 → m1 à l'horizontale, rond vers le haut.
	const ang = Math.atan2(m1[1] - m0[1], m1[0] - m0[0]);
	const rot = (p: V2): V2 => {
		const c = Math.cos(-ang);
		const si = Math.sin(-ang);
		return [p[0] * c - p[1] * si, p[0] * si + p[1] * c];
	};
	let flat = { m0: rot(m0), m1: rot(m1), p: p2.map(rot), c: c2.map(rot) };
	if (flat.p[2 * n][1] > flat.c[1][1]) {
		const flip = (p: V2): V2 => [p[0], -p[1]];
		flat = { m0: flip(flat.m0), m1: flip(flat.m1), p: flat.p.map(flip), c: flat.c.map(flip) };
	}

	// --- Vue en perspective (isométrique), posée comme une trémie : carré en haut, rond en bas ---
	const cos30 = Math.cos(Math.PI / 6);
	const iso = (v: V3): V2 => [(v[0] - v[1]) * cos30, (v[0] + v[1]) * 0.5 - (height - v[2])];
	const axo = {
		corners: corners.map(iso),
		top: P.map(iso),
		/** Une génératrice est vue si elle est tournée vers l'observateur. */
		generators: corners.flatMap((C, k) =>
			Array.from({ length: n + 1 }, (_, j) => {
				const i = k * n + j;
				const t = (i * Math.PI) / (2 * n);
				return { from: iso(C), to: iso(P[i]), visible: Math.cos(t) + Math.sin(t) > -0.01 };
			}),
		),
	};

	return { flat, axo, n };
}

export const pathOf = (pts: V2[], close = false) =>
	pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join("") + (close ? "Z" : "");

export type { V2 };
