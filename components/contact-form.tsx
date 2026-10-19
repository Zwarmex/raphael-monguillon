"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { type ContactState, type Field, sendContact } from "@/app/actions";

const initial: ContactState = { status: "idle" };
const kinds = ["Métallerie", "Chaudronnerie", "Cheminée", "Réparation", "Autre"];
const order: Field[] = ["name", "phone", "email", "town", "kind", "message"];

const input =
	"block w-full border-2 border-(--f-line) bg-(--f-field) px-4 py-3 text-base text-(--f-text) placeholder:text-(--f-muted) transition-colors hover:border-(--f-line-hover) aria-[invalid=true]:border-(--f-error)";

function FieldError({ id, msg }: { id: string; msg?: string }) {
	if (!msg) return null;
	return (
		<p id={id} className="mt-2 text-[0.95rem] font-medium text-(--f-error)">
			{msg}
		</p>
	);
}

export default function ContactForm() {
	const [state, action, pending] = useActionState(sendContact, initial);
	const formRef = useRef<HTMLFormElement>(null);
	const doneRef = useRef<HTMLDivElement>(null);
	const e = state.errors ?? {};
	const v = state.values ?? {};

	useEffect(() => {
		if (state.status === "error" && state.errors) {
			const first = order.find((f) => state.errors?.[f]);
			if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
		}
		if (state.status === "success") doneRef.current?.focus();
	}, [state]);

	if (state.status === "success") {
		return (
			<div
				ref={doneRef}
				tabIndex={-1}
				role="status"
				className="border-2 border-(--f-accent) bg-(--f-field) p-8 focus:outline-none">
				<Check className="size-8 text-(--f-accent)" aria-hidden="true" />
				<p className="font-expanded mt-4 text-2xl font-bold text-(--f-text)">Demande envoyée</p>
				<p className="mt-3 text-(--f-muted)">
					Merci. Je vous rappelle rapidement pour en parler, et vous recevez le devis
					sous 48 h.
				</p>
			</div>
		);
	}

	return (
		<form id="contact-form" ref={formRef} action={action} noValidate className="space-y-6">
			<div aria-live="polite" role="status">
				{state.status === "error" && state.message && (
					<p className="border-l-4 border-(--f-error) bg-(--f-field) px-4 py-3 font-medium text-(--f-text)">
						{state.message}
					</p>
				)}
			</div>

			<div className="grid gap-6 sm:grid-cols-2">
				<div>
					<label htmlFor="name" className="mb-2 block font-semibold text-(--f-text)">
						Nom <span className="font-normal text-(--f-muted)">(obligatoire)</span>
					</label>
					<input
						id="name"
						name="name"
						type="text"
						autoComplete="name"
						required
						defaultValue={v.name}
						aria-invalid={!!e.name}
						aria-describedby={e.name ? "name-error" : undefined}
						className={input}
					/>
					<FieldError id="name-error" msg={e.name} />
				</div>
				<div>
					<label htmlFor="phone" className="mb-2 block font-semibold text-(--f-text)">
						Téléphone <span className="font-normal text-(--f-muted)">(obligatoire)</span>
					</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						inputMode="tel"
						autoComplete="tel"
						required
						placeholder="06 12 34 56 78"
						defaultValue={v.phone}
						aria-invalid={!!e.phone}
						aria-describedby={e.phone ? "phone-error" : undefined}
						className={input}
					/>
					<FieldError id="phone-error" msg={e.phone} />
				</div>
				<div>
					<label htmlFor="email" className="mb-2 block font-semibold text-(--f-text)">
						E-mail <span className="font-normal text-(--f-muted)">(facultatif)</span>
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autoComplete="email"
						spellCheck={false}
						defaultValue={v.email}
						aria-invalid={!!e.email}
						aria-describedby={e.email ? "email-error" : undefined}
						className={input}
					/>
					<FieldError id="email-error" msg={e.email} />
				</div>
				<div>
					<label htmlFor="town" className="mb-2 block font-semibold text-(--f-text)">
						Commune <span className="font-normal text-(--f-muted)">(facultatif)</span>
					</label>
					<input
						id="town"
						name="town"
						type="text"
						autoComplete="address-level2"
						placeholder="Ambert, Arlanc, Marsac…"
						defaultValue={v.town}
						className={input}
					/>
				</div>
			</div>

			<fieldset>
				<legend className="mb-3 font-semibold text-(--f-text)">Type de projet</legend>
				<div className="flex flex-wrap gap-2">
					{kinds.map((k) => (
						<label key={k} className="cursor-pointer">
							<input
								type="radio"
								name="kind"
								value={k}
								defaultChecked={v.kind === k}
								className="peer sr-only"
							/>
							<span className="inline-flex min-h-11 items-center border-2 border-(--f-line) px-4 font-medium text-(--f-muted) transition-colors hover:border-(--f-line-hover) hover:text-(--f-text) peer-checked:border-(--f-accent) peer-checked:bg-(--f-accent) peer-checked:text-(--f-on-accent) peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus)">
								{k}
							</span>
						</label>
					))}
				</div>
			</fieldset>

			<div>
				<label htmlFor="message" className="mb-2 block font-semibold text-(--f-text)">
					Votre projet <span className="font-normal text-(--f-muted)">(obligatoire)</span>
				</label>
				<textarea
					id="message"
					name="message"
					rows={5}
					required
					placeholder="Ex. : garde-corps de 4 m en acier pour une terrasse, à peindre…"
					defaultValue={v.message}
					aria-invalid={!!e.message}
					aria-describedby={e.message ? "message-error" : "message-hint"}
					className={`${input} resize-y`}
				/>
				{e.message ? (
					<FieldError id="message-error" msg={e.message} />
				) : (
					<p id="message-hint" className="mt-2 text-[0.95rem] text-(--f-muted)">
						Dimensions, matière, usage, délai : tout aide à chiffrer juste.
					</p>
				)}
			</div>

			{/* Piège à robots, invisible pour les visiteurs */}
			<div className="hidden" aria-hidden="true">
				<label htmlFor="website">Ne pas remplir</label>
				<input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
			</div>

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
				<button
					type="submit"
					disabled={pending}
					className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap bg-(--f-btn) px-8 text-base font-semibold text-(--f-on-btn) transition-colors hover:bg-(--f-btn-hover) disabled:cursor-wait disabled:opacity-80">
					{pending && <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
					{pending ? "Envoi en cours…" : "Envoyer ma demande"}
				</button>
				<p className="text-[0.9rem] text-(--f-muted)">
					Vos coordonnées servent uniquement à vous répondre.
				</p>
			</div>
		</form>
	);
}
