"use client";

import { Check } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { type Config, defaultConfig, draw, type Kind, type Material } from "@/lib/configurator";

const kinds: { id: Kind; label: string }[] = [
	{ id: "garde-corps", label: "Garde-corps" },
	{ id: "portail", label: "Portail" },
	{ id: "escalier", label: "Escalier" },
];
const materials: Material[] = ["Acier", "Inox", "Aluminium"];

const MARK = "Projet dessiné sur le site :";

function Segmented<T extends string>({
	legend,
	name,
	value,
	options,
	onChange,
}: {
	legend: string;
	name: string;
	value: T;
	options: { id: T; label: string }[];
	onChange: (v: T) => void;
}) {
	return (
		<fieldset>
			<legend className="mb-2.5 font-semibold">{legend}</legend>
			<div className="flex flex-wrap gap-2">
				{options.map((o) => (
					<label key={o.id} className="cursor-pointer">
						<input
							type="radio"
							name={name}
							value={o.id}
							checked={value === o.id}
							onChange={() => onChange(o.id)}
							className="peer sr-only"
						/>
						<span className="inline-flex min-h-11 items-center border-2 border-(--cfg-line-soft) px-3.5 font-medium transition-colors hover:border-(--cfg-line) peer-checked:border-(--cfg-chip) peer-checked:bg-(--cfg-chip) peer-checked:text-(--cfg-on-chip) peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus)">
							{o.label}
						</span>
					</label>
				))}
			</div>
		</fieldset>
	);
}

function Slider({
	label,
	value,
	min,
	max,
	step,
	format,
	onChange,
}: {
	label: string;
	value: number;
	min: number;
	max: number;
	step: number;
	format: (v: number) => string;
	onChange: (v: number) => void;
}) {
	const id = useId();
	return (
		<div>
			<div className="mb-2 flex items-baseline justify-between gap-4">
				<label htmlFor={id} className="font-semibold">
					{label}
				</label>
				<output htmlFor={id} className="font-expanded font-bold tabular-nums">
					{format(value)}
				</output>
			</div>
			<input
				id={id}
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				aria-valuetext={format(value)}
				onChange={(e) => onChange(Number(e.target.value))}
				className="cfg-range w-full"
			/>
		</div>
	);
}

const cm = (v: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(v / 100)} m`;

export default function Configurator() {
	const [c, setC] = useState<Config>(defaultConfig);
	const [width, setWidth] = useState(720);
	const [sent, setSent] = useState(false);
	const box = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = box.current;
		if (!el) return;
		const ro = new ResizeObserver(([e]) => setWidth(Math.max(280, Math.round(e.contentRect.width))));
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const d = draw(c, width);
	const set = (patch: Partial<Config>) => {
		setSent(false);
		setC((prev) => ({ ...prev, ...patch }));
	};

	function addToQuote() {
		const summary = `${d.summary}, en ${c.material.toLowerCase()}.`;
		const form = document.getElementById("contact-form");
		const message = form?.querySelector<HTMLTextAreaElement>("textarea[name=message]");
		if (message) {
			const rest = message.value
				.split("\n")
				.filter((l) => !l.startsWith(MARK))
				.join("\n")
				.trim();
			message.value = `${MARK} ${summary}${rest ? `\n\n${rest}` : "\n\n"}`;
			const kind = form?.querySelector<HTMLInputElement>("input[name=kind][value='Métallerie']");
			if (kind) kind.checked = true;
			message.focus({ preventScroll: true });
			message.setSelectionRange(message.value.length, message.value.length);
		}
		document.getElementById("contact")?.scrollIntoView({
			behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
		});
		setSent(true);
	}

	let controls: ReactNode;
	if (c.kind === "garde-corps") {
		controls = (
			<>
				<Slider label="Longueur" value={c.gc.length} min={100} max={1500} step={10} format={cm} onChange={(v) => set({ gc: { ...c.gc, length: v } })} />
				<Slider label="Hauteur" value={c.gc.height} min={90} max={120} step={1} format={cm} onChange={(v) => set({ gc: { ...c.gc, height: v } })} />
				<Segmented
					legend="Remplissage"
					name="gc-infill"
					value={c.gc.infill}
					options={[
						{ id: "barreaux", label: "Barreaux" },
						{ id: "lisses", label: "Lisses" },
						{ id: "tole", label: "Tôle perforée" },
					]}
					onChange={(v) => set({ gc: { ...c.gc, infill: v } })}
				/>
			</>
		);
	} else if (c.kind === "portail") {
		controls = (
			<>
				<Segmented
					legend="Ouverture"
					name="p-opening"
					value={c.portail.opening}
					options={[
						{ id: "battant", label: "Battant" },
						{ id: "coulissant", label: "Coulissant" },
					]}
					onChange={(v) => set({ portail: { ...c.portail, opening: v } })}
				/>
				<Slider label="Largeur entre piliers" value={c.portail.width} min={200} max={600} step={10} format={cm} onChange={(v) => set({ portail: { ...c.portail, width: v } })} />
				<Slider label="Hauteur" value={c.portail.height} min={100} max={200} step={5} format={cm} onChange={(v) => set({ portail: { ...c.portail, height: v } })} />
				<Segmented
					legend="Remplissage"
					name="p-infill"
					value={c.portail.infill}
					options={[
						{ id: "barreaux", label: "Barreaux" },
						{ id: "lames", label: "Lames" },
						{ id: "tole", label: "Tôle pleine" },
					]}
					onChange={(v) => set({ portail: { ...c.portail, infill: v } })}
				/>
			</>
		);
	} else {
		controls = (
			<>
				<Slider label="Hauteur à monter" value={c.escalier.rise} min={100} max={400} step={5} format={cm} onChange={(v) => set({ escalier: { ...c.escalier, rise: v } })} />
				<Segmented
					legend="Garde-corps"
					name="e-rail"
					value={c.escalier.rail ? "oui" : "non"}
					options={[
						{ id: "oui", label: "Avec" },
						{ id: "non", label: "Sans" },
					]}
					onChange={(v) => set({ escalier: { ...c.escalier, rail: v === "oui" } })}
				/>
			</>
		);
	}

	return (
		<div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
			<form className="space-y-7 lg:col-span-4" autoComplete="off" onSubmit={(e) => e.preventDefault()} aria-label="Réglages du projet">
				<Segmented legend="Ouvrage" name="ouvrage" value={c.kind} options={kinds} onChange={(v) => set({ kind: v })} />
				{/* Clé par ouvrage : les boutons radio sont recréés au lieu d'être réutilisés d'un ouvrage à l'autre */}
				<div key={c.kind} className="space-y-7">
					{controls}
				</div>
				<Segmented
					legend="Matière"
					name="material"
					value={c.material}
					options={materials.map((m) => ({ id: m, label: m }))}
					onChange={(v) => set({ material: v })}
				/>
			</form>

			<figure className="lg:col-span-8">
				<div className="cfg-board border-2 border-(--cfg-line) bg-(--cfg-sheet) p-2">
					<div className="border border-(--cfg-line-soft)">
						<div ref={box} className="px-2 pt-4 sm:px-4">
							<svg
								viewBox={`0 0 ${width} ${d.height}`}
								width="100%"
								className="cfg-sheet block h-auto"
								role="img"
								aria-label={`Dessin : ${d.summary}, en ${c.material.toLowerCase()}`}>
								<defs>
									<marker id="cfg-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
										<path d="M0 1.5 10 5 0 8.5z" />
									</marker>
									<pattern id="cfg-hatch" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
										<path d="M0 0V9" className="cfg-thin" />
									</pattern>
									<pattern id="cfg-perfo" width="9" height="9" patternUnits="userSpaceOnUse">
										<circle cx="4.5" cy="4.5" r="1.6" className="cfg-dot" />
									</pattern>
								</defs>
								{d.body}
							</svg>
						</div>
						<dl className="grid grid-cols-2 border-t-2 border-(--cfg-line) text-sm sm:grid-cols-5">
							{[...d.facts, { k: "Matière", v: c.material }].map((f, i) => (
								<div
									key={f.k}
									className={`border-(--cfg-line-soft) px-3 py-2.5 sm:px-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} ${i ? "sm:border-l" : ""} ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
									<dt className="font-condensed text-[0.8rem] font-medium text-(--cfg-muted)">{f.k}</dt>
									<dd className="mt-0.5 font-semibold leading-snug tabular-nums">{f.v}</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
				<figcaption className="font-condensed mt-5 text-[0.95rem] text-(--cfg-muted)">
					Dessin indicatif, calculé sur vos réglages. Les cotes définitives sont prises sur place.
				</figcaption>

				<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
					<button
						type="button"
						onClick={addToQuote}
						className="inline-flex min-h-13 shrink-0 items-center justify-center bg-(--cfg-btn) px-7 text-base font-semibold text-(--cfg-on-btn) transition-colors hover:bg-(--cfg-btn-hover)">
						Demander un devis pour ce projet
					</button>
					<p aria-live="polite" className="text-[0.95rem] text-(--cfg-muted)">
						{sent && (
							<span className="inline-flex items-center gap-2">
								<Check className="size-4 text-(--cfg-accent)" aria-hidden="true" />
								Le dessin est ajouté à votre demande, en bas de page.
							</span>
						)}
					</p>
				</div>
			</figure>
		</div>
	);
}
