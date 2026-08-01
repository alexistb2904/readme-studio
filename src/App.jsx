import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
	useParams,
} from "react-router";
import {
	cloneProject,
	initialProject,
	resolveTheme,
} from "./data/templates.js";
import {
	loadProjects,
	loadTemplates,
	resetStorage,
	saveProjects,
	saveTemplates,
} from "./lib/storage.js";
import Builder from "./components/Builder.jsx";
import AppFooter from "./components/AppFooter.jsx";
import Credits from "./components/Credits.jsx";
import Home from "./components/Home.jsx";
import Modal from "./components/Modal.jsx";
import Onboarding from "./components/Onboarding.jsx";
import Projects from "./components/Projects.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";
import TemplateManager from "./components/TemplateManager.jsx";
import Topbar from "./components/Topbar.jsx";
import { t } from "./i18n.js";

function downloadText(filename, content, type = "text/plain;charset=utf-8") {
	const blob = new Blob([content], { type });
	const url = URL.createObjectURL(blob);
	const anchor = document.createElement("a");
	anchor.href = url;
	anchor.download = filename;
	document.body.appendChild(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(url);
}

const removedBlockTypes = new Set([
	"now",
	"trophies",
	"youtubeCards",
	"githubStats",
	"topLanguages",
]);

function normalizeBlock(block) {
	if (block?.type !== "quickBadges") return block;
	const props = block.props || {};
	return {
		...block,
		props: {
			...props,
			showCodeTime: props.showCodeTime ?? props.showDcodeDev ?? true,
			codeTimeBadgeUrl: props.codeTimeBadgeUrl || "",
			codeTimeLink:
				props.codeTimeLink || props.codeDevLink || "https://codetime.dev/en/",
			codeTimeAlt: props.codeTimeAlt || "CodeTime coding activity",
			wakatimeBadgeUrl: props.wakatimeBadgeUrl || "",
			wakatimeLink: props.wakatimeLink || "https://wakatime.com/",
			wakatimeAlt: props.wakatimeAlt || "WakaTime coding activity",
		},
	};
}

function normalizeProject(rawProject) {
	const base = cloneProject(initialProject);
	const raw = rawProject ? cloneProject(rawProject) : base;
	return {
		...base,
		...raw,
		profile: {
			...base.profile,
			...raw.profile,
			basics: { ...base.profile.basics, ...(raw.profile?.basics || {}) },
			work: { ...base.profile.work, ...(raw.profile?.work || {}) },
			links: {
				...base.profile.links,
				...(raw.profile?.links || {}),
				custom: raw.profile?.links?.custom || [],
			},
			support: {
				...base.profile.support,
				coffeeUrl: raw.profile?.support?.coffeeUrl || "",
			},
			skills: raw.profile?.skills || [],
			projects: raw.profile?.projects || [],
			experiences: raw.profile?.experiences || [],
		},
		blocks: (raw.blocks || base.blocks)
			.filter((block) => !removedBlockTypes.has(block.type))
			.map(normalizeBlock),
	};
}

function setDocumentMetadata(pathname, language) {
	const isProjects = pathname === "/projects";
	const isEditor = pathname.startsWith("/projects/");
	const page = isEditor
		? {
				title: t(language, "metadata.editorTitle"),
				description: t(language, "metadata.editorDescription"),
			}
		: isProjects
			? {
					title: t(language, "metadata.projectsTitle"),
					description: t(language, "metadata.projectsDescription"),
				}
			: {
					title: t(language, "metadata.homeTitle"),
					description: t(language, "metadata.homeDescription"),
				};

	document.documentElement.lang = language;
	document.title = page.title;
	const description = document.querySelector('meta[name="description"]');
	if (description) description.setAttribute("content", page.description);
	let canonical = document.querySelector('link[rel="canonical"]');
	if (!canonical) {
		canonical = document.createElement("link");
		canonical.setAttribute("rel", "canonical");
		document.head.appendChild(canonical);
	}
	canonical.setAttribute("href", `${window.location.origin}${pathname}`);
}

function RouteLoading({ language }) {
	return (
		<main className="route-loading" aria-live="polite" aria-busy="true">
			<span />
			<p>{t(language, "routeLoading")}</p>
		</main>
	);
}

function ProjectRoute({
	setup,
	activeProjectId,
	project,
	onResolve,
	...workspaceProps
}) {
	const { projectId } = useParams();

	useEffect(() => {
		onResolve(projectId, setup);
	}, [onResolve, projectId, setup]);

	if (activeProjectId !== projectId)
		return <RouteLoading language={workspaceProps.language} />;
	if (setup)
		return (
			<Onboarding
				project={project}
				setProject={workspaceProps.setProject}
				onComplete={workspaceProps.onCompleteOnboarding}
				onSkip={workspaceProps.onCompleteOnboarding}
				onCancel={workspaceProps.onBackToProjects}
			/>
		);

	return <BuilderWorkspace project={project} {...workspaceProps} />;
}

function BuilderWorkspace({
	project,
	setProject,
	selectedId,
	setSelectedId,
	language,
	copied,
	onCopy,
	onDownload,
	onImportGithubProfile,
	onBackToProjects,
	onTemplates,
	onSettings,
	onExport,
	onImport,
	support,
	onLanguageChange,
	onCredits,
	templatesOpen,
	settingsOpen,
	creditsOpen,
	customTemplates,
	onApplyTemplate,
	onSaveTemplate,
	onDeleteTemplate,
	onCloseTemplates,
	onCloseSettings,
	onCloseCredits,
	onReset,
}) {
	return (
		<div className="app-shell">
			<Topbar
				project={project}
				onHome={onBackToProjects}
				language={language}
				onTemplates={onTemplates}
				onSettings={onSettings}
				onExport={onExport}
				onImport={onImport}
			/>
			<Builder
				project={project}
				setProject={setProject}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				language={language}
				copied={copied}
				onCopy={onCopy}
				onDownload={onDownload}
				onImportGithubProfile={onImportGithubProfile}
			/>
			<AppFooter
				language={language}
				support={support}
				onLanguageChange={onLanguageChange}
				onCredits={onCredits}
			/>

			<Modal
				open={templatesOpen}
				title={t(language, "templates")}
				onClose={onCloseTemplates}
				size="xl"
				language={language}
			>
				<TemplateManager
					project={project}
					language={language}
					customTemplates={customTemplates}
					onApply={onApplyTemplate}
					onSave={onSaveTemplate}
					onDelete={onDeleteTemplate}
				/>
			</Modal>
			<Modal
				open={settingsOpen}
				title={t(language, "settings")}
				onClose={onCloseSettings}
				size="lg"
				language={language}
			>
				<SettingsPanel
					project={project}
					setProject={setProject}
					language={language}
					onReset={onReset}
				/>
			</Modal>
			<Modal
				open={creditsOpen}
				title={t(language, "credits")}
				onClose={onCloseCredits}
				size="xl"
				language={language}
			>
				<Credits language={language} />
			</Modal>
		</div>
	);
}

export default function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const [projects, setProjects] = useState(() =>
		loadProjects().map((record) => ({
			...record,
			project: normalizeProject(record.project),
		})),
	);
	const [activeProjectId, setActiveProjectId] = useState(null);
	const [project, setProject] = useState(() =>
		normalizeProject(initialProject),
	);
	const [customTemplates, setCustomTemplates] = useState(() => loadTemplates());
	const [templatesOpen, setTemplatesOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [creditsOpen, setCreditsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(
		() => project.blocks?.[0]?.id || null,
	);
	const [copied, setCopied] = useState(false);
	const copyTimer = useRef(null);
	const importedGithubUsers = useRef(new Set());
	const [interfaceLanguage, setInterfaceLanguage] = useState(() => {
		const saved = localStorage.getItem("readme-studio:interface-language");
		return ["fr", "en", "es"].includes(saved)
			? saved
			: ["fr", "en", "es"].includes(project.profile.interfaceLanguage)
				? project.profile.interfaceLanguage
				: "en";
	});
	const language = interfaceLanguage;
	const theme = useMemo(() => resolveTheme(project), [project]);

	useEffect(() => saveProjects(projects), [projects]);
	useEffect(() => saveTemplates(customTemplates), [customTemplates]);
	useEffect(
		() =>
			localStorage.setItem(
				"readme-studio:interface-language",
				interfaceLanguage,
			),
		[interfaceLanguage],
	);
	useEffect(
		() => setDocumentMetadata(location.pathname, language),
		[language, location.pathname],
	);
	useEffect(() => {
		if (!activeProjectId) return;
		setProjects((current) =>
			current.map((record) =>
				record.id === activeProjectId
					? { ...record, project, updatedAt: new Date().toISOString() }
					: record,
			),
		);
	}, [project, activeProjectId]);
	useEffect(() => {
		document.documentElement.style.setProperty("--accent", `#${theme.accent}`);
		document.documentElement.style.setProperty(
			"--accent-alt",
			`#${theme.accentAlt}`,
		);
	}, [theme]);
	useEffect(() => () => clearTimeout(copyTimer.current), []);

	const importGithubProfile = useCallback(
		async ({ onlyMissing = false } = {}) => {
			const username = project.profile.basics.username.trim().replace(/^@/, "");
			if (!username) return { ok: false, reason: "missing" };
			try {
				const response = await fetch(
					`https://api.github.com/users/${encodeURIComponent(username)}`,
					{ headers: { Accept: "application/vnd.github+json" } },
				);
				if (!response.ok)
					return {
						ok: false,
						reason: response.status === 404 ? "notFound" : "requestFailed",
					};
				const user = await response.json();
				setProject((current) => {
					if (
						current.profile.basics.username
							.trim()
							.replace(/^@/, "")
							.toLowerCase() !== username.toLowerCase()
					)
						return current;
					const prefer = (currentValue, importedValue) =>
						onlyMissing && currentValue
							? currentValue
							: importedValue || currentValue;
					return {
						...current,
						profile: {
							...current.profile,
							basics: {
								...current.profile.basics,
								name: prefer(current.profile.basics.name, user.name),
								bio: prefer(current.profile.basics.bio, user.bio),
								location: prefer(
									current.profile.basics.location,
									user.location,
								),
								avatarUrl: prefer(
									current.profile.basics.avatarUrl,
									user.avatar_url,
								),
							},
							work: {
								...current.profile.work,
								company: prefer(current.profile.work.company, user.company),
							},
							links: {
								...current.profile.links,
								website: prefer(current.profile.links.website, user.blog),
								x: prefer(
									current.profile.links.x,
									user.twitter_username
										? `https://x.com/${user.twitter_username}`
										: "",
								),
							},
						},
					};
				});
				return { ok: true };
			} catch {
				return { ok: false, reason: "requestFailed" };
			}
		},
		[project.profile.basics.username],
	);

	useEffect(() => {
		const username = project.profile.basics.username
			.trim()
			.replace(/^@/, "")
			.toLowerCase();
		if (
			!username ||
			project.profile.basics.avatarUrl ||
			importedGithubUsers.current.has(username)
		)
			return;
		importedGithubUsers.current.add(username);
		void importGithubProfile({ onlyMissing: true });
	}, [
		project.profile.basics.username,
		project.profile.basics.avatarUrl,
		importGithubProfile,
	]);

	const createProject = () => {
		const id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
		const draft = normalizeProject(initialProject);
		draft.profile.interfaceLanguage = interfaceLanguage;
		setProjects((current) => [
			{
				id,
				name: t(interfaceLanguage, "untitledReadme"),
				updatedAt: new Date().toISOString(),
				project: draft,
			},
			...current,
		]);
		setProject(draft);
		setActiveProjectId(id);
		setSelectedId(draft.blocks?.[0]?.id || null);
		navigate(`/projects/${id}/setup`);
	};

	const openProject = useCallback(
		(id) => {
			const record = projects.find((item) => item.id === id);
			if (!record) return;
			const nextProject = normalizeProject(record.project);
			setProject(nextProject);
			setActiveProjectId(id);
			setSelectedId(nextProject.blocks?.[0]?.id || null);
			navigate(`/projects/${id}`);
		},
		[navigate, projects],
	);

	const resolveProjectRoute = useCallback(
		(id) => {
			if (activeProjectId === id) return;
			const record = projects.find((item) => item.id === id);
			if (!record) {
				navigate("/projects", { replace: true });
				return;
			}
			const nextProject = normalizeProject(record.project);
			setProject(nextProject);
			setActiveProjectId(id);
			setSelectedId(nextProject.blocks?.[0]?.id || null);
		},
		[activeProjectId, navigate, projects],
	);

	const completeOnboarding = () => {
		setProjects((current) =>
			current.map((record) =>
				record.id === activeProjectId
					? {
							...record,
							name: project.profile.basics.name.trim()
								? `${project.profile.basics.name.trim()}'s README`
								: record.name,
						}
					: record,
			),
		);
		setSelectedId(project.blocks?.[0]?.id || null);
		navigate(`/projects/${activeProjectId}`);
	};

	const deleteProject = (id) => {
		const record = projects.find((item) => item.id === id);
		if (
			!record ||
			!window.confirm(
				`${t(language, "deleteProjectConfirm")}\n\n${record.name}`,
			)
		)
			return;
		setProjects((current) => current.filter((item) => item.id !== id));
		if (activeProjectId === id) {
			setActiveProjectId(null);
			navigate("/projects");
		}
	};

	const goProjects = () => {
		setActiveProjectId(null);
		setTemplatesOpen(false);
		setSettingsOpen(false);
		navigate("/projects");
	};

	const copyMarkdown = async (markdown) => {
		try {
			await navigator.clipboard.writeText(markdown);
		} catch {
			const textarea = document.createElement("textarea");
			textarea.value = markdown;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			textarea.remove();
		}
		setCopied(true);
		clearTimeout(copyTimer.current);
		copyTimer.current = setTimeout(() => setCopied(false), 1800);
	};

	const importConfig = (event) => {
		const file = event.target.files?.[0];
		event.target.value = "";
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const imported = JSON.parse(reader.result);
				if (!imported?.profile || !Array.isArray(imported?.blocks))
					throw new Error(t(language, "invalidJson"));
				const normalized = normalizeProject(imported);
				setProject(normalized);
				setSelectedId(normalized.blocks[0]?.id || null);
			} catch (error) {
				window.alert(error.message || t(language, "invalidJson"));
			}
		};
		reader.readAsText(file);
	};

	const reset = () => {
		if (!window.confirm(t(language, "resetConfirm"))) return;
		resetStorage();
		const fresh = normalizeProject(initialProject);
		setProjects([]);
		setProject(fresh);
		setCustomTemplates([]);
		setSelectedId(fresh.blocks[0]?.id || null);
		setActiveProjectId(null);
		setSettingsOpen(false);
		navigate("/");
	};

	const changeInterfaceLanguage = (nextLanguage) => {
		setInterfaceLanguage(nextLanguage);
		if (activeProjectId)
			setProject((current) => ({
				...current,
				profile: { ...current.profile, interfaceLanguage: nextLanguage },
			}));
	};

	const workspaceProps = {
		setProject,
		selectedId,
		setSelectedId,
		language,
		copied,
		onCopy: copyMarkdown,
		onDownload: (markdown) => downloadText("README.md", markdown),
		onImportGithubProfile: importGithubProfile,
		onBackToProjects: goProjects,
		onCompleteOnboarding: completeOnboarding,
		onTemplates: () => setTemplatesOpen(true),
		onSettings: () => setSettingsOpen(true),
		onExport: () =>
			downloadText(
				"readme-studio-config.json",
				JSON.stringify(project, null, 2),
				"application/json;charset=utf-8",
			),
		onImport: importConfig,
		support: project.profile.support,
		onLanguageChange: changeInterfaceLanguage,
		onCredits: () => setCreditsOpen(true),
		templatesOpen,
		settingsOpen,
		creditsOpen,
		customTemplates,
		onApplyTemplate: (nextProject) => {
			const normalized = normalizeProject(nextProject);
			setProject(normalized);
			setSelectedId(normalized.blocks?.[0]?.id || null);
			setTemplatesOpen(false);
		},
		onSaveTemplate: (name) =>
			setCustomTemplates((current) => [
				...current,
				{
					id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
					name,
					createdAt: new Date().toISOString(),
					project: cloneProject(project),
				},
			]),
		onDeleteTemplate: (id) =>
			setCustomTemplates((current) =>
				current.filter((template) => template.id !== id),
			),
		onCloseTemplates: () => setTemplatesOpen(false),
		onCloseSettings: () => setSettingsOpen(false),
		onCloseCredits: () => setCreditsOpen(false),
		onReset: reset,
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<>
						<Home
							language={language}
							projects={projects}
							onCreate={createProject}
							onProjects={() => navigate("/projects")}
							onLanguageChange={changeInterfaceLanguage}
							onCredits={() => setCreditsOpen(true)}
						/>
						<Modal
							open={creditsOpen}
							title={t(language, "credits")}
							onClose={() => setCreditsOpen(false)}
							size="xl"
							language={language}
						>
							<Credits language={language} />
						</Modal>
					</>
				}
			/>
			<Route
				path="/projects"
				element={
					<>
						<Projects
							projects={projects}
							language={language}
							onCreate={createProject}
							onOpen={openProject}
							onDelete={deleteProject}
							onHome={() => navigate("/")}
						/>
						<AppFooter
							language={language}
							onLanguageChange={changeInterfaceLanguage}
							onCredits={() => setCreditsOpen(true)}
						/>
						<Modal
							open={creditsOpen}
							title={t(language, "credits")}
							onClose={() => setCreditsOpen(false)}
							size="xl"
							language={language}
						>
							<Credits language={language} />
						</Modal>
					</>
				}
			/>
			<Route
				path="/projects/:projectId/setup"
				element={
					<ProjectRoute
						setup
						activeProjectId={activeProjectId}
						project={project}
						onResolve={resolveProjectRoute}
						{...workspaceProps}
					/>
				}
			/>
			<Route
				path="/projects/:projectId"
				element={
					<ProjectRoute
						activeProjectId={activeProjectId}
						project={project}
						onResolve={resolveProjectRoute}
						{...workspaceProps}
					/>
				}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}
