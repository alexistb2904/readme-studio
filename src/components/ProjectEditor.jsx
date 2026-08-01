import { Plus, Trash2 } from "lucide-react";
import TechPicker from "./TechPicker.jsx";

const makeProject = () => ({
	id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
	name: "",
	description: "",
	repository: "",
	liveUrl: "",
	imageUrl: "",
	imageAlt: "",
	logoUrl: "",
	techIds: [],
});

export default function ProjectEditor({
	projects,
	onChange,
	labels,
	compact = false,
}) {
	const update = (id, patch) =>
		onChange(
			projects.map((project) =>
				project.id === id ? { ...project, ...patch } : project,
			),
		);
	const remove = (id) =>
		onChange(projects.filter((project) => project.id !== id));

	return (
		<div className="project-editor-list">
			{projects.map((project, index) => (
				<section className="project-editor-card" key={project.id}>
					<div className="project-editor-heading">
						<strong>
							{labels.projectName} {index + 1}
						</strong>
						<button
							type="button"
							className="danger-icon-button"
							onClick={() => remove(project.id)}
							aria-label={labels.removeProject}
						>
							<Trash2 size={16} />
						</button>
					</div>
					<div className="form-grid two-columns">
						<label>
							<span>{labels.projectName}</span>
							<input
								value={project.name}
								onChange={(event) =>
									update(project.id, { name: event.target.value })
								}
								placeholder={labels.projectPlaceholder}
							/>
						</label>
						<label>
							<span>{labels.repository}</span>
							<input
								value={project.repository}
								onChange={(event) =>
									update(project.id, { repository: event.target.value })
								}
								placeholder={labels.repositoryPlaceholder}
							/>
						</label>
						<label className="full-width">
							<span>{labels.description}</span>
							<textarea
								rows={3}
								value={project.description}
								onChange={(event) =>
									update(project.id, { description: event.target.value })
								}
								placeholder={labels.descriptionPlaceholder}
							/>
						</label>
						<label className="full-width">
							<span>{labels.liveUrl}</span>
							<input
								value={project.liveUrl}
								onChange={(event) =>
									update(project.id, { liveUrl: event.target.value })
								}
								placeholder={labels.urlPlaceholder}
							/>
						</label>
						<label>
							<span>{labels.projectImage}</span>
							<input
								value={project.imageUrl || ""}
								onChange={(event) =>
									update(project.id, { imageUrl: event.target.value })
								}
								placeholder={labels.imagePlaceholder}
							/>
						</label>
						<label>
							<span>{labels.projectLogo}</span>
							<input
								value={project.logoUrl || ""}
								onChange={(event) =>
									update(project.id, { logoUrl: event.target.value })
								}
								placeholder={labels.logoPlaceholder}
							/>
						</label>
						<label className="full-width">
							<span>{labels.projectImageAlt}</span>
							<input
								value={project.imageAlt || ""}
								onChange={(event) =>
									update(project.id, { imageAlt: event.target.value })
								}
								placeholder={labels.imageAltPlaceholder}
							/>
						</label>
					</div>
					{!compact && (
						<TechPicker
							selected={project.techIds || []}
							onChange={(techIds) => update(project.id, { techIds })}
							searchPlaceholder={labels.searchTech}
							selectedLabel={labels.selected}
							language={labels.language}
						/>
					)}
				</section>
			))}
			<button
				type="button"
				className="secondary-button full-button"
				onClick={() => onChange([...projects, makeProject()])}
			>
				<Plus size={16} />
				{labels.addProject}
			</button>
		</div>
	);
}
