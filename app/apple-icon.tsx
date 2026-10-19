import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		(
			<div style={{ width: "100%", height: "100%", display: "flex", background: "#1b1e21" }}>
				<svg width="180" height="180" viewBox="0 0 64 64">
					<path d="M13 49 29 28h24" fill="none" stroke="#e7e8e4" strokeWidth="4.5" strokeLinecap="square" />
					<path d="M11 52l2.4-11 7.2 5.6z" fill="#e7e8e4" />
					<path d="M36 28V15l13 13z" fill="#e2603e" />
				</svg>
			</div>
		),
		size,
	);
}
