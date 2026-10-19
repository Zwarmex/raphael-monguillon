"use server";

import nodemailer from "nodemailer";

export type Field = "name" | "phone" | "email" | "town" | "kind" | "message";

export type ContactState = {
	status: "idle" | "error" | "success";
	message?: string;
	errors?: Partial<Record<Field, string>>;
	values?: Partial<Record<Field, string>>;
};

const kinds = ["Métallerie", "Chaudronnerie", "Réparation", "Autre"];

const clean = (v: FormDataEntryValue | null, max: number) =>
	typeof v === "string" ? v.trim().slice(0, max) : "";

export async function sendContact(_prev: ContactState, data: FormData): Promise<ContactState> {
	// Champ piège invisible : seuls les robots le remplissent.
	if (clean(data.get("website"), 200)) return { status: "success" };

	const values = {
		name: clean(data.get("name"), 120),
		phone: clean(data.get("phone"), 30),
		email: clean(data.get("email"), 200),
		town: clean(data.get("town"), 120),
		kind: clean(data.get("kind"), 40),
		message: clean(data.get("message"), 5000),
	};

	const errors: ContactState["errors"] = {};
	if (values.name.length < 2) errors.name = "Indiquez votre nom pour que je sache qui rappeler.";
	if (values.phone.replace(/[^\d+]/g, "").length < 10)
		errors.phone = "Indiquez un numéro de téléphone complet, par exemple 06 12 34 56 78.";
	if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
		errors.email = "Cette adresse e-mail semble incomplète. Vérifiez-la ou laissez le champ vide.";
	if (values.kind && !kinds.includes(values.kind)) values.kind = "Autre";
	if (values.message.length < 10)
		errors.message = "Décrivez votre projet en quelques mots : pièce, dimensions, matière, délai…";

	if (Object.keys(errors).length) {
		return {
			status: "error",
			message: "Le formulaire n'a pas pu partir. Corrigez les champs signalés.",
			errors,
			values,
		};
	}

	const { SMTP_USER, SMTP_PASS, SMTP_MAIL_TO, SMTP_HOST, SMTP_PORT } = process.env;
	if (!SMTP_USER || !SMTP_PASS || !SMTP_MAIL_TO) {
		console.error("[contact] Variables SMTP manquantes");
		return {
			status: "error",
			message: "L'envoi est momentanément indisponible. Appelez-moi directement, je vous réponds.",
			values,
		};
	}

	try {
		const port = Number(SMTP_PORT ?? 465);
		const transporter = nodemailer.createTransport({
			host: SMTP_HOST ?? "smtp.gmail.com",
			port,
			secure: port === 465,
			auth: { user: SMTP_USER, pass: SMTP_PASS },
		});

		await transporter.sendMail({
			from: `"Site web" <${SMTP_USER}>`,
			to: SMTP_MAIL_TO,
			replyTo: values.email || undefined,
			subject: `Demande de devis : ${values.kind || "projet"}, ${values.name}${values.town ? ` (${values.town})` : ""}`,
			text: [
				`Nom : ${values.name}`,
				`Téléphone : ${values.phone}`,
				`E-mail : ${values.email || "non renseigné"}`,
				`Commune : ${values.town || "non renseignée"}`,
				`Type de projet : ${values.kind || "non précisé"}`,
				"",
				values.message,
			].join("\n"),
		});
	} catch (err) {
		console.error("[contact] Échec d'envoi", err);
		return {
			status: "error",
			message: "L'envoi a échoué. Réessayez dans un instant, ou appelez-moi directement.",
			values,
		};
	}

	return { status: "success" };
}
