import { Coffee, Heart, Languages, Sparkles } from "lucide-react";
import { t } from "../i18n.js";
import { buyMeACoffeeUrl } from "../lib/siteConfig.js";

const languages = ["fr", "en", "es"];

export default function AppFooter({
	language,
	onLanguageChange,
	support = {},
	onCredits,
}) {
	return (
		<footer className="app-footer">
			<div className="app-footer-copy">
				<span>{t(language, "footerTagline")}</span>
			</div>
			<div className="app-footer-actions">
				{buyMeACoffeeUrl && (
					<a
						className="coffee-link"
						href={buyMeACoffeeUrl}
						target="_blank"
						rel="noreferrer"
					>
						<Coffee size={14} /> {t(language, "buyCoffee")}
					</a>
				)}
				<button type="button" onClick={onCredits}>
					<Heart size={14} /> {t(language, "credits")}
				</button>
				<label className="footer-language">
					<Languages size={14} aria-hidden="true" />
					<span className="sr-only">{t(language, "interfaceLanguage")}</span>
					<select
						value={language}
						onChange={(event) => onLanguageChange(event.target.value)}
						aria-label={t(language, "interfaceLanguage")}
					>
						{languages.map((item) => (
							<option key={item} value={item}>
								{t(language, `languageNames.${item}`)}
							</option>
						))}
					</select>
				</label>
			</div>
		</footer>
	);
}
