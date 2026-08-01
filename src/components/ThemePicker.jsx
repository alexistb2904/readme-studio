import { Check, Palette } from "lucide-react";
import { customThemeFallback, themes } from "../data/templates.js";

import { t } from "../i18n.js";

const colorFields = [
	"accent",
	"accentAlt",
	"background",
	"surface",
	"text",
	"muted",
	"border",
];

export default function ThemePicker({
	value,
	onChange,
	customTheme,
	onCustomThemeChange,
	language = "en",
}) {
	const custom = { ...customThemeFallback, ...(customTheme || {}) };
	const updateColor = (key, value) =>
		onCustomThemeChange?.({ ...custom, [key]: value.replace("#", "") });

	return (
		<div className="theme-picker-wrap">
			<div className="theme-grid">
				{themes.map((theme) => (
					<button
						type="button"
						key={theme.id}
						className={`theme-card ${value === theme.id ? "selected" : ""}`}
						onClick={() => onChange(theme.id)}
					>
						<span
							className="theme-preview"
							style={{
								background: `#${theme.background}`,
								borderColor: `#${theme.border}`,
							}}
						>
							<span style={{ background: `#${theme.accent}` }} />
							<span style={{ background: `#${theme.accentAlt}` }} />
							<span style={{ background: `#${theme.surface}` }} />
						</span>
						<span className="theme-name">
							{t(language, `themeNames.${theme.id}`)}
						</span>
						{value === theme.id && <Check size={16} />}
					</button>
				))}
				<button
					type="button"
					className={`theme-card custom-theme-card ${value === "custom" ? "selected" : ""}`}
					onClick={() => onChange("custom")}
					aria-label={t(language, "aria.customTheme")}
				>
					<span
						className="theme-preview"
						style={{
							background: `#${custom.background}`,
							borderColor: `#${custom.border}`,
						}}
					>
						<span style={{ background: `#${custom.accent}` }} />
						<span style={{ background: `#${custom.accentAlt}` }} />
						<span style={{ background: `#${custom.surface}` }} />
					</span>
					<span className="theme-name">
						<Palette size={14} /> {t(language, "themePicker.custom")}
					</span>
					{value === "custom" && <Check size={16} />}
				</button>
			</div>
			{value === "custom" && (
				<div className="custom-theme-controls">
					<div className="custom-theme-heading">
						<strong>{t(language, "themePicker.customColors")}</strong>
						<select
							value={custom.mode}
							onChange={(event) =>
								onCustomThemeChange?.({ ...custom, mode: event.target.value })
							}
						>
							<option value="dark">{t(language, "themePicker.dark")}</option>
							<option value="light">{t(language, "themePicker.light")}</option>
						</select>
					</div>
					<div className="custom-color-grid">
						{colorFields.map((key) => (
							<label key={key}>
								<span>{t(language, `themePicker.colorLabels.${key}`)}</span>
								<span className="color-input-wrap">
									<input
										type="color"
										value={`#${custom[key]}`}
										onChange={(event) => updateColor(key, event.target.value)}
									/>
									<input
										value={`#${custom[key]}`}
										onChange={(event) => updateColor(key, event.target.value)}
										maxLength={7}
									/>
								</span>
							</label>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
