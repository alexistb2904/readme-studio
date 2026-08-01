import { useState } from "react";
import { Check, LayoutTemplate, Plus, Trash2 } from "lucide-react";
import {
	builtInTemplates,
	cloneProject,
	createBuiltInTemplateProject,
	resolveTheme,
} from "../data/templates.js";
import { t } from "../i18n.js";

export function TemplateGallery({
	project,
	onApply,
	language = "en",
	compact = false,
}) {
	const applyBuiltIn = (template) =>
		onApply(
			createBuiltInTemplateProject(
				project,
				template,
				project.profile.outputLanguage || language,
			),
		);
	return (
		<div className={`template-grid ${compact ? "template-grid-compact" : ""}`}>
			{builtInTemplates.map((template) => {
				const theme = resolveTheme(template.themeId);
				const previewBlocks = template.blocks
					.filter(
						(block) => !["divider", "spacer", "footer"].includes(block.type),
					)
					.slice(0, compact ? 5 : 7);
				const templateStyle = {
					"--template-accent": `#${theme.accent}`,
					"--template-accent-alt": `#${theme.accentAlt}`,
					"--template-background": `#${theme.background}`,
					"--template-surface": `#${theme.surface}`,
					"--template-text": `#${theme.text}`,
					"--template-muted": `#${theme.muted}`,
					"--template-border": `#${theme.border}`,
				};
				return (
					<article
						className="template-card"
						key={template.id}
						style={templateStyle}
					>
						<div className="template-thumb" data-template={template.id}>
							<div className="template-document-preview" aria-hidden="true">
								{previewBlocks.map((block, index) => (
									<span
										key={`${block.type}-${index}`}
										className={`template-preview-line type-${block.type}`}
									/>
								))}
							</div>
							<span className="template-block-count">
								<LayoutTemplate size={11} /> {template.blocks.length}{" "}
								{t(language, "templatesPanel.blocks")}
							</span>
						</div>
						<div className="template-card-body">
							<div className="template-card-kicker">
								<span>{t(language, `templateCatalog.${template.id}.tag`)}</span>
								<i aria-hidden="true">
									<b />
									<b />
									<b />
								</i>
							</div>
							<strong>
								{t(language, `templateCatalog.${template.id}.name`)}
							</strong>
							{!compact && (
								<p>
									{t(language, `templateCatalog.${template.id}.description`)}
								</p>
							)}
							{compact && (
								<small>
									{t(language, `templateCatalog.${template.id}.description`)}
								</small>
							)}
							<button
								type="button"
								className="secondary-button full-button"
								onClick={() => applyBuiltIn(template)}
							>
								<Check size={15} /> {t(language, "templatesPanel.use")}
							</button>
						</div>
					</article>
				);
			})}
		</div>
	);
}

export default function TemplateManager({
	project,
	language,
	customTemplates,
	onApply,
	onSave,
	onDelete,
}) {
	const [name, setName] = useState("");

	const save = () => {
		const trimmed = name.trim();
		if (!trimmed) return;
		onSave(trimmed);
		setName("");
	};

	return (
		<div className="template-manager">
			<section>
				<div className="section-heading compact-heading">
					<h3>{t(language, "templatesPanel.builtIn")}</h3>
					<p>{t(language, "templatesPanel.builtInDescription")}</p>
				</div>
				<TemplateGallery
					project={project}
					onApply={onApply}
					language={language}
				/>
			</section>

			<section className="saved-template-section">
				<div className="section-heading compact-heading">
					<h3>{t(language, "templatesPanel.local")}</h3>
					<p>{t(language, "templatesPanel.localDescription")}</p>
				</div>
				<div className="save-template-row">
					<input
						value={name}
						onChange={(event) => setName(event.target.value)}
						placeholder={t(language, "templateName")}
						onKeyDown={(event) => event.key === "Enter" && save()}
					/>
					<button className="primary-button" type="button" onClick={save}>
						<Plus size={16} /> {t(language, "save")}
					</button>
				</div>
				<div className="local-template-list">
					{customTemplates.map((template) => (
						<div className="local-template-item" key={template.id}>
							<div>
								<strong>{template.name}</strong>
								<small>{new Date(template.createdAt).toLocaleString()}</small>
							</div>
							<div>
								<button
									type="button"
									className="secondary-button compact-button"
									onClick={() => onApply(cloneProject(template.project))}
								>
									{t(language, "templatesPanel.load")}
								</button>
								<button
									type="button"
									className="plain-icon danger"
									onClick={() => onDelete(template.id)}
								>
									<Trash2 size={16} />
								</button>
							</div>
						</div>
					))}
					{!customTemplates.length && (
						<div className="empty-state compact">
							{t(language, "templatesPanel.empty")}
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
