import {
	AlertTriangle,
	ExternalLink,
	LockKeyhole,
	RotateCcw,
} from "lucide-react";
import ThemePicker from "./ThemePicker.jsx";
import { t } from "../i18n.js";

export default function SettingsPanel({
	project,
	setProject,
	language,
	onReset,
}) {
	const profile = project.profile;
	const updateProfile = (patch) =>
		setProject((current) => ({
			...current,
			profile: { ...current.profile, ...patch },
		}));
	const updateSupport = (patch) =>
		setProject((current) => ({
			...current,
			profile: {
				...current.profile,
				support: { ...current.profile.support, ...patch },
			},
		}));

	return (
		<div className="settings-panel-content">
			<section className="settings-section">
				<div className="section-heading compact-heading">
					<h3>{t(language, "appearance")}</h3>
					<p>{t(language, "settingsPanel.appearanceDescription")}</p>
				</div>
				<ThemePicker
					language={language}
					value={project.themeId}
					onChange={(themeId) =>
						setProject((current) => ({ ...current, themeId }))
					}
					customTheme={project.customTheme}
					onCustomThemeChange={(customTheme) =>
						setProject((current) => ({
							...current,
							themeId: "custom",
							customTheme,
						}))
					}
				/>
			</section>

			<section className="settings-section">
				<div className="section-heading compact-heading">
					<h3>{t(language, "outputLanguage")}</h3>
					<p>{t(language, "settingsPanel.outputLanguageDescription")}</p>
				</div>
				<label>
					<span>{t(language, "outputLanguage")}</span>
					<select
						value={profile.outputLanguage}
						onChange={(event) =>
							updateProfile({ outputLanguage: event.target.value })
						}
					>
						<option value="en">{t(language, "languageNames.en")}</option>
						<option value="fr">{t(language, "languageNames.fr")}</option>
						<option value="es">{t(language, "languageNames.es")}</option>
					</select>
				</label>
			</section>

			<section className="settings-section">
				<div className="section-heading compact-heading">
					<h3>{t(language, "support")}</h3>
					<p>{t(language, "settingsPanel.supportDescription")}</p>
				</div>
				<label>
					<span>{t(language, "buyCoffee")}</span>
					<input
						value={profile.support.coffeeUrl}
						onChange={(event) =>
							updateSupport({ coffeeUrl: event.target.value })
						}
						placeholder={t(language, "settingsPanel.coffeePlaceholder")}
					/>
				</label>
			</section>

			<section className="privacy-box">
				<LockKeyhole size={22} />
				<div>
					<strong>{t(language, "localOnly")}</strong>
					<p>{t(language, "localOnlyDescription")}</p>
					<p>{t(language, "externalAssetsDescription")}</p>
				</div>
			</section>

			<section className="danger-zone">
				<div>
					<AlertTriangle size={19} />
					<div>
						<strong>{t(language, "settingsPanel.dangerZone")}</strong>
						<p>{t(language, "settingsPanel.dangerDescription")}</p>
					</div>
				</div>
				<button type="button" className="danger-button" onClick={onReset}>
					<RotateCcw size={16} /> {t(language, "reset")}
				</button>
			</section>
		</div>
	);
}
