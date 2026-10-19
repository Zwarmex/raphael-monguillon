import { ImageResponse } from "next/og";
import { pathOf, squareToRound, type V2 } from "@/lib/trace";

export const alt = "Raphaël Monguillon, chaudronnerie et métallerie sur-mesure à Ambert et Arlanc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	const { flat, n } = squareToRound({ side: 600, diameter: 400, height: 350, divisions: 4 });
	const s = 0.34;
	const o: V2 = [640, 190];
	const f = (p: V2): V2 => [o[0] + p[0] * s, o[1] + p[1] * s];
	const bottom = [flat.m0, ...flat.c, flat.m1].map(f);
	const arc = flat.p.map(f);
	const folds = flat.c.flatMap((c, k) =>
		Array.from({ length: n + 1 }, (_, j) => pathOf([f(c), f(flat.p[k * n + j])])),
	);

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					background: "#e7e8e4",
					color: "#1b1e21",
					padding: 64,
					position: "relative",
				}}>
				<svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
					{folds.map((d, i) => (
						<path key={i} d={d} stroke="#1b1e21" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />
					))}
					<path d={pathOf(bottom)} stroke="#1b1e21" strokeWidth="3.5" fill="none" />
					<path d={pathOf(arc)} stroke="#1b1e21" strokeWidth="3.5" fill="none" />
					<path d={pathOf([bottom[0], arc[0]])} stroke="#b3371a" strokeWidth="5" fill="none" />
					<path d={pathOf([bottom[bottom.length - 1], arc[arc.length - 1]])} stroke="#b3371a" strokeWidth="5" fill="none" />
				</svg>
				<div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#4b5157" }}>
					Raphaël Monguillon
				</div>
				<div style={{ display: "flex", flexDirection: "column", maxWidth: 600 }}>
					<div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.04, letterSpacing: -1.5 }}>
						Chaudronnerie et métallerie sur-mesure
					</div>
					<div style={{ fontSize: 30, marginTop: 20, color: "#4b5157" }}>
						Ambert, Arlanc, Livradois-Forez. Devis gratuit sous 48 h.
					</div>
				</div>
				<div
					style={{
						position: "absolute",
						left: 0,
						bottom: 0,
						width: "100%",
						height: 14,
						backgroundImage: "linear-gradient(90deg, #d9b56a, #b4783b 28%, #7b3f73 55%, #3a4f9c 78%, #6f93be)",
					}}
				/>
			</div>
		),
		size,
	);
}
