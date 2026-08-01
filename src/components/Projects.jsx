import {
	ArrowLeft,
	ArrowRight,
	Clock3,
	FileText,
	FolderGit2,
	Plus,
	Trash2,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { t } from "../i18n.js";

function formatDate(value, language) {
	if (!value) return t(language, "projectsPage.neverUpdated");
	return new Intl.DateTimeFormat(
		language === "fr" ? "fr-FR" : language === "es" ? "es-ES" : "en-US",
		{
			dateStyle: "medium",
		},
	).format(new Date(value));
}

export default function Projects({
	projects,
	language,
	onCreate,
	onOpen,
	onDelete,
	onHome,
}) {
	const text = t(language, "projectsPage");
	const projectLabel = projects.length === 1 ? text.saved : text.savedPlural;

	return (
		<main className="projects-page">
			<div className="projects-orbit projects-orbit-one" aria-hidden="true" />
			<div className="projects-orbit projects-orbit-two" aria-hidden="true" />
			<header className="projects-nav container-width">
				<button
					className="projects-brand"
					type="button"
					onClick={onHome}
					aria-label={text.back}
				>
					<span className="projects-brand-mark">
						<Github size={20} />
					</span>
					<span>
						README <em>Studio</em>
					</span>
				</button>
				<div className="projects-nav-actions">
					<button className="landing-nav-link" type="button" onClick={onHome}>
						<ArrowLeft size={15} /> {text.back}
					</button>
					<button
						className="landing-primary-action projects-create-action"
						type="button"
						onClick={onCreate}
					>
						<Plus size={17} /> {text.create}
					</button>
				</div>
			</header>

			<section className="projects-hero container-width">
				<div>
					<p className="landing-overline">
						<span /> {text.eyebrow}
					</p>
					<h1>{text.title}</h1>
					<p>{text.description}</p>
				</div>
				<aside className="projects-local-note">
					<span className="projects-local-icon">
						<Github size={17} />
					</span>
					<div>
						<strong>{text.localTitle}</strong>
						<p>{text.localText}</p>
					</div>
				</aside>
			</section>

			<section
				className="projects-library container-width"
				aria-labelledby="projects-library-title"
			>
				<div className="projects-library-heading">
					<div>
						<span>{text.library}</span>
						<h2 id="projects-library-title">
							{projects.length} {projectLabel}
						</h2>
					</div>
					<button
						className="projects-text-action"
						type="button"
						onClick={onCreate}
					>
						<Plus size={16} /> {text.create}
					</button>
				</div>

				{projects.length ? (
					<div className="projects-grid">
						{projects.map((record, index) => {
							const profile = record.project?.profile || {};
							const basics = profile.basics || {};
							const blockCount = record.project?.blocks?.length || 0;
							return (
								<article
									className="project-card"
									key={record.id}
									style={{ "--project-delay": `${index * 55}ms` }}
								>
									<button
										className="project-card-open"
										type="button"
										onClick={() => onOpen(record.id)}
										aria-label={`${text.open} ${record.name || text.untitled}`}
									>
										<div className="project-card-topline">
											<span className="project-document-icon">
												<FileText size={19} />
											</span>
											<ArrowRight size={18} />
										</div>
										<div className="project-card-content">
											<span>
												{basics.username ? `@${basics.username}` : text.profile}
											</span>
											<h3>{record.name || text.untitled}</h3>
										</div>
										<div className="project-card-meta">
											<span>
												<FolderGit2 size={14} /> {blockCount} {text.blocks}
											</span>
											<span>
												<Clock3 size={14} />{" "}
												{formatDate(record.updatedAt, language)}
											</span>
										</div>
									</button>
									<button
										className="project-card-delete"
										type="button"
										onClick={() => onDelete(record.id)}
										aria-label={`${text.delete} ${record.name || "README"}`}
										title={text.delete}
									>
										<Trash2 size={16} />
									</button>
								</article>
							);
						})}
					</div>
				) : (
					<div className="projects-empty">
						<div className="projects-empty-icon">
							<FileText size={25} />
						</div>
						<div>
							<h3>{text.emptyTitle}</h3>
							<p>{text.emptyDescription}</p>
						</div>
						<button
							className="landing-primary-action"
							type="button"
							onClick={onCreate}
						>
							<Plus size={17} /> {text.emptyAction}
						</button>
					</div>
				)}
			</section>
		</main>
	);
}
