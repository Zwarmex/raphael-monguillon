"use client";

import { useEffect, useRef } from "react";

/**
 * Gerbe d'étincelles jaillie une seule fois au chargement (environ 3 s), puis la toile s'éteint.
 * Rien ne s'anime si l'utilisateur préfère réduire les animations.
 */
export default function Sparks({ className }: { className?: string }) {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const { width: w, height: h } = canvas.getBoundingClientRect();
		canvas.width = w * dpr;
		canvas.height = h * dpr;
		ctx.scale(dpr, dpr);

		type P = { x: number; y: number; vx: number; vy: number; life: number; max: number };
		const parts: P[] = [];
		const origin = { x: w * 0.5, y: h * 0.98 };
		const emitUntil = 1400;
		const start = performance.now();
		let last = start;
		let raf = 0;

		const emit = (n: number) => {
			for (let i = 0; i < n; i++) {
				const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.9;
				const v = 260 + Math.random() * 520;
				parts.push({ x: origin.x + (Math.random() - 0.5) * 40, y: origin.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0, max: 0.7 + Math.random() * 1.1 });
			}
		};

		const tick = (now: number) => {
			const dt = Math.min(0.033, (now - last) / 1000);
			last = now;
			if (now - start < emitUntil) emit(7);
			ctx.clearRect(0, 0, w, h);
			ctx.globalCompositeOperation = "lighter";
			for (let i = parts.length - 1; i >= 0; i--) {
				const p = parts[i];
				p.life += dt;
				if (p.life > p.max) {
					parts.splice(i, 1);
					continue;
				}
				p.vy += 900 * dt;
				p.vx *= 0.99;
				const px = p.x;
				const py = p.y;
				p.x += p.vx * dt;
				p.y += p.vy * dt;
				const t = 1 - p.life / p.max;
				ctx.strokeStyle = `rgba(255, ${Math.round(150 + 90 * t)}, ${Math.round(60 * t)}, ${t})`;
				ctx.lineWidth = 1.6 * t + 0.4;
				ctx.beginPath();
				ctx.moveTo(px, py);
				ctx.lineTo(p.x, p.y);
				ctx.stroke();
			}
			if (parts.length || now - start < emitUntil) raf = requestAnimationFrame(tick);
			else ctx.clearRect(0, 0, w, h);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return <canvas ref={ref} className={className} aria-hidden="true" />;
}
