/** Vrai uniquement en production : la préproduction (staging) n'est jamais indexée. */
export const isProduction = process.env.SITE_ENV === "production";
