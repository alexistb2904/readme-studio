const PROJECT_KEY = "readme-studio:project:v1";
const PROJECTS_KEY = "readme-studio:projects:v1";
const TEMPLATES_KEY = "readme-studio:templates:v1";

export function loadProject(fallback) {
	try {
		const raw = localStorage.getItem(PROJECT_KEY);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}

export function saveProject(project) {
	localStorage.setItem(PROJECT_KEY, JSON.stringify(project));
}

function createProjectRecord(project, index = 0) {
	const name = project?.profile?.basics?.name;
	return {
		id: `migrated-${index + 1}`,
		name: name ? `${name}'s README` : "Untitled README",
		updatedAt: new Date().toISOString(),
		project,
	};
}

export function loadProjects() {
	try {
		const rawProjects = localStorage.getItem(PROJECTS_KEY);
		if (rawProjects) {
			const projects = JSON.parse(rawProjects);
			if (Array.isArray(projects)) {
				return projects
					.map((record, index) => {
						if (record?.project)
							return {
								...createProjectRecord(record.project, index),
								...record,
							};
						if (record?.profile && Array.isArray(record?.blocks))
							return createProjectRecord(record, index);
						return null;
					})
					.filter(Boolean);
			}
		}

		const legacy = localStorage.getItem(PROJECT_KEY);
		if (legacy) {
			const project = JSON.parse(legacy);
			return [createProjectRecord(project)];
		}
	} catch {
		return [];
	}

	return [];
}

export function saveProjects(projects) {
	localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
}

export function loadTemplates() {
	try {
		return JSON.parse(localStorage.getItem(TEMPLATES_KEY) || "[]");
	} catch {
		return [];
	}
}

export function saveTemplates(templates) {
	localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
}

export function resetStorage() {
	localStorage.removeItem(PROJECT_KEY);
	localStorage.removeItem(PROJECTS_KEY);
	localStorage.removeItem(TEMPLATES_KEY);
}
