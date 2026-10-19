"use client";

import { Check, LoaderCircle } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { type ContactState, type Field, sendContact } from "@/app/actions";

const initial: ContactState = { status: "idle" };
const kinds = ["Métallerie", "Chaudronnerie", "Réparation", "Autre"];
const order: Field[] = ["name", "phone", "email", "town", "kind", "message"];

const input =
	"block w-full border-2 border-cendre/40 bg-forge-2 px-4 py-3 text-base text-zinc placeholder:text-cendre/70 transition-colors hover:border-cendre/70 aria-[invalid=true]:border-minium-light";

function FieldError({ id, msg }: { id: string; msg?: string }) {
	if (!msg) return null;
	return (
		<p id={id} className="mt-2 text-[0.95rem] font-medium text-minium-light">
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
				className="border-2 border-paille/60 bg-forge-2 p-8 focus:outline-none">
				<Check className="size-8 text-paille" aria-hidden="true" />
				<p className="font-expanded mt-4 text-2xl font-bold text-zinc">Demande envoyée</p>
				<p className="mt-3 text-cendre">
					Merci. Je vous rappelle rapidement pour en parler, et vous recevez le devis
					sous 48 h.
				</p>
			</div>
		);
	}

	return (
		<form ref={formRef} action={action} noValidate className="space-y-6">
			<div aria-live="polite" role="status">
				{state.status === "error" && state.message && (
					<p className="border-l-4 border-minium-light bg-forge-2 px-4 py-3 font-medium text-zinc">
						{state.message}
					</p>
				)}
			</div>

			<div className="grid gap-6 sm:grid-cols-2">
				<div>
					<label htmlFor="name" className="mb-2 block font-semibold text-zinc">
						Nom <span className="font-normal text-cendre">(obligatoire)</span>
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
					<label htmlFor="phone" className="mb-2 block font-semibold text-zinc">
						Téléphone <span className="font-normal text-cendre">(obligatoire)</span>
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
					<label htmlFor="email" className="mb-2 block font-semibold text-zinc">
						E-mail <span className="font-normal text-cendre">(facultatif)</span>
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
					<label htmlFor="town" className="mb-2 block font-semibold text-zinc">
						Commune <span className="font-normal text-cendre">(facultatif)</span>
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
				<legend className="mb-3 font-semibold text-zinc">Type de projet</legend>
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
							<span className="inline-flex min-h-11 items-center border-2 border-cendre/40 px-4 font-medium text-cendre transition-colors hover:border-cendre/80 hover:text-zinc peer-checked:border-paille peer-checked:bg-paille peer-checked:text-forge peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-paille">
								{k}
							</span>
						</label>
					))}
				</div>
			</fieldset>

			<div>
				<label htmlFor="message" className="mb-2 block font-semibold text-zinc">
					Votre projet <span className="font-normal text-cendre">(obligatoire)</span>
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
					<p id="message-hint" className="mt-2 text-[0.95rem] text-cendre">
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
					className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2.5 whitespace-nowrap bg-minium px-8 text-base font-semibold text-white transition-colors hover:bg-[#c84423] disabled:cursor-wait disabled:opacity-80">
					{pending && <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
					{pending ? "Envoi en cours…" : "Envoyer ma demande"}
				</button>
				<p className="text-[0.9rem] text-cendre">
					Vos coordonnées servent uniquement à vous répondre.
				</p>
			</div>
		</form>
	);
}
