import { useId } from "react";

/** Enclume argentée et flamme : la marque Fer & Feu, en vectoriel. */
export function FeuMark({ className }: { className?: string }) {
	const id = useId().replace(/:/g, "");
	return (
		<svg viewBox="0 0 120 92" className={className} aria-hidden="true" focusable="false">
			<defs>
				<linearGradient id={`${id}-acier`} x1="0" x2="0" y1="0" y2="1">
					<stop offset="0" stopColor="#fbfbfb" />
					<stop offset="0.45" stopColor="#b9bdc1" />
					<stop offset="0.55" stopColor="#8d9297" />
					<stop offset="1" stopColor="#5d6267" />
				</linearGradient>
				<linearGradient id={`${id}-feu`} x1="0" x2="0" y1="1" y2="0">
					<stop offset="0" stopColor="#ffd25e" />
					<stop offset="0.45" stopColor="#f58a24" />
					<stop offset="1" stopColor="#d9481b" />
				</linearGradient>
			</defs>
			{/* Flamme : trois langues */}
			<path
				d="M64 44c-11-3-15-12-10-22 1 6 4 8 7 8-2-9 2-18 10-25-1 7 1 12 5 15 2-5 1-9-1-13 9 6 13 17 9 27-2 6-8 10-20 10z"
				fill={`url(#${id}-feu)`}
			/>
			{/* Enclume */}
			<path
				d="M4 50c10-6 22-8 34-8h76v11h-12c-8 1-12 5-14 11v7l11 4v7H45v-7l11-4v-7c-2-6-6-10-14-11-12-1-26-1-38-3z"
				fill={`url(#${id}-acier)`}
			/>
			<path d="M38 42h76" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.2" />
		</svg>
	);
}

/** Logo complet : marque + « FER & FEU » + ligne de base. */
export function FeuLogo({ size = "md", baseline = true }: { size?: "sm" | "md" | "lg"; baseline?: boolean }) {
	const s = {
		sm: { mark: "h-9 w-12", word: "text-[1.55rem]", base: "text-[0.55rem]" },
		md: { mark: "h-12 w-16", word: "text-3xl", base: "text-[0.65rem]" },
		lg: { mark: "h-24 w-32 sm:h-32 sm:w-44", word: "text-6xl sm:text-8xl", base: "text-sm sm:text-base" },
	}[size];
	return (
		<span className={`inline-flex ${size === "lg" ? "flex-col items-center" : "items-center gap-2.5"}`}>
			<FeuMark className={s.mark} />
			<span className={`flex flex-col ${size === "lg" ? "items-center" : ""}`}>
				<span className={`feu-display feu-silver font-black uppercase leading-[0.85] tracking-[0.02em] ${s.word}`}>
					Fer <span className="feu-fire-text">&amp;</span> Feu
				</span>
				{baseline && (
					<span className={`feu-baseline mt-1 font-semibold uppercase tracking-[0.22em] text-[var(--feu)] ${s.base}`}>
						Structure &amp; entretien
					</span>
				)}
			</span>
		</span>
	);
}
