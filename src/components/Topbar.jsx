import {
	ArrowLeft,
	FileDown,
	Github,
	Import,
	LayoutTemplate,
	Settings,
} from "lucide-react";
import { t } from "../i18n.js";

export default function Topbar({
	project,
	language,
	onHome,
	onTemplates,
	onSettings,
	onExport,
	onImport,
}) {
	const username = project.profile.basics.username || "your-profile";

	return (
		<header className="app-topbar">
			<div className="app-brand">
				<span className="brand-mark">
					<Github size={20} />
				</span>
				<div>
					<strong>{t(language, "appName")}</strong>
					<small>{username}/README.md</small>
				</div>
			</div>
			<nav className="topbar-actions">
				<button
					type="button"
					className="topbar-button topbar-home-button"
					onClick={onHome}
					aria-label={t(language, "backToProjects")}
				>
					<ArrowLeft size={16} />
					<span>{t(language, "projects")}</span>
				</button>
				<button
					type="button"
					className="topbar-button"
					onClick={onTemplates}
					aria-label={t(language, "templates")}
				>
					<LayoutTemplate size={16} />
					<span>{t(language, "templates")}</span>
				</button>
				<button
					type="button"
					className="topbar-button"
					onClick={onExport}
					aria-label={t(language, "exportConfig")}
				>
					<FileDown size={16} />
					<span>{t(language, "exportConfig")}</span>
				</button>
				<label
					className="topbar-button file-button"
					aria-label={t(language, "importConfig")}
				>
					<Import size={16} />
					<span>{t(language, "importConfig")}</span>
					<input
						type="file"
						accept="application/json,.json"
						onChange={onImport}
					/>
				</label>
				<button
					type="button"
					className="topbar-button"
					onClick={onSettings}
					aria-label={t(language, "settings")}
				>
					<Settings size={16} />
					<span>{t(language, "settings")}</span>
				</button>
			</nav>
		</header>
	);
}
