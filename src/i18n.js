import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";

export const translations = { en, fr, es };

function getValue(source, key) {
	return key.split(".").reduce((value, part) => value?.[part], source);
}

export const t = (language, key, values = {}) => {
	const value =
		getValue(translations[language] || {}, key) ??
		getValue(translations.en, key) ??
		key;
	if (typeof value !== "string") return value;
	return Object.entries(values).reduce(
		(result, [name, replacement]) =>
			result.replaceAll(`{${name}}`, String(replacement)),
		value,
	);
};
