"use client";

import Image from "next/image";
import { type KeyboardEvent, useRef, useState } from "react";
import { realisations } from "@/lib/site";
import { pieces } from "./pieces";

/** Réalisations en onglets d'acier brossé (motif ARIA « tabs », flèches du clavier). */
export default function Realisations() {
	const [active, setActive] = useState(realisations[1].id);
	const tabs = useRef<(HTMLButtonElement | null)[]>([]);

	function onKey(e: KeyboardEvent, i: number) {
		const n = realisations.length;
		const next = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: n - 1 }[e.key];
		if (next === undefined) return;
		e.preventDefault();
		const j = (next + n) % n;
		setActive(realisations[j].id);
		tabs.current[j]?.focus();
	}

	return (
		<div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
			<div
				role="tablist"
				aria-label="Réalisations"
				className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:col-span-4 lg:flex lg:flex-col lg:gap-3">
				{realisations.map((r, i) => {
					const on = r.id === active;
					return (
						<button
							key={r.id}
							ref={(el) => {
								tabs.current[i] = el;
							}}
							id={`tab-${r.id}`}
							role="tab"
							type="button"
							aria-selected={on}
							aria-controls={`panel-${r.id}`}
							tabIndex={on ? 0 : -1}
							onClick={() => setActive(r.id)}
							onKeyDown={(e) => onKey(e, i)}
							className={`feu-tab ${on ? "is-on" : ""}`}>
							{r.title}
						</button>
					);
				})}
			</div>

			{realisations.map((r) => {
				const Piece = pieces[r.id];
				const on = r.id === active;
				return (
					<div
						key={r.id}
						id={`panel-${r.id}`}
						role="tabpanel"
						aria-labelledby={`tab-${r.id}`}
						hidden={!on}
						tabIndex={0}
						className="feu-plate grid gap-8 p-5 sm:p-8 md:grid-cols-2 md:items-center lg:col-span-8">
						<div className="feu-frame relative aspect-[4/5] overflow-hidden">
							{r.photo ? (
								<Image src={r.photo} alt={r.title} fill sizes="(min-width: 1024px) 30vw, 90vw" className="object-cover" />
							) : (
								<div className="grid h-full place-items-center p-8 text-[var(--argent)]">
									<Piece className="h-full max-h-80 w-full" />
								</div>
							)}
						</div>
						<div>
							<h3 className="feu-display text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">{r.title}</h3>
							<p className="mt-5 text-lg leading-relaxed text-[var(--muted)]">{r.text}</p>
							<a href="#contact" className="feu-link mt-7 inline-flex min-h-11 items-center">
								Demander la même chose, à vos mesures
							</a>
						</div>
					</div>
				);
			})}
		</div>
	);
}
