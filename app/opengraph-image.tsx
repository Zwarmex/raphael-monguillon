import { ImageResponse } from "next/og";

export const alt = "Fer & Feu, métallier chaudronnier à Ambert et Arlanc";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					background: "radial-gradient(ellipse 50% 60% at 78% 62%, rgba(240,122,34,0.35), rgba(17,18,20,0) 70%), #111214",
					color: "#efede9",
					padding: "0 72px",
					position: "relative",
				}}>
				<div style={{ display: "flex", flexDirection: "column", width: 640 }}>
					<div style={{ fontSize: 26, letterSpacing: 6, color: "#ffb347" }}>FER &amp; FEU · AMBERT · ARLANC</div>
					<div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1, marginTop: 24, color: "#e4e6e8" }}>
						Quand le fer rencontre l&apos;artisanat
					</div>
					<div style={{ fontSize: 28, marginTop: 28, color: "#a6a39e" }}>
						Chaudronnerie, métallerie, entretien de cheminées. Devis gratuit sous 48 h.
					</div>
				</div>
				<svg width="420" height="322" viewBox="0 0 120 92" style={{ position: "absolute", right: 40, top: 150 }}>
					<defs>
						<linearGradient id="a" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0" stopColor="#fbfbfb" />
							<stop offset="0.5" stopColor="#a9adb2" />
							<stop offset="1" stopColor="#5d6267" />
						</linearGradient>
						<linearGradient id="f" x1="0" x2="0" y1="1" y2="0">
							<stop offset="0" stopColor="#ffd25e" />
							<stop offset="0.5" stopColor="#f58a24" />
							<stop offset="1" stopColor="#d9481b" />
						</linearGradient>
					</defs>
					<path d="M64 44c-11-3-15-12-10-22 1 6 4 8 7 8-2-9 2-18 10-25-1 7 1 12 5 15 2-5 1-9-1-13 9 6 13 17 9 27-2 6-8 10-20 10z" fill="url(#f)" />
					<path d="M4 50c10-6 22-8 34-8h76v11h-12c-8 1-12 5-14 11v7l11 4v7H45v-7l11-4v-7c-2-6-6-10-14-11-12-1-26-1-38-3z" fill="url(#a)" />
				</svg>
			</div>
		),
		size,
	);
}
