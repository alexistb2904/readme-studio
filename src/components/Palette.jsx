import { useDraggable } from "@dnd-kit/core";
import {
	Activity,
	Award,
	Badge,
	BarChart3,
	BriefcaseBusiness,
	Code2,
	Columns3,
	Contact,
	FolderGit2,
	Github,
	GripVertical,
	Heading1,
	HeartHandshake,
	ListTree,
	Languages,
	Minus,
	PanelTop,
	Quote,
	Rows3,
	Sparkles,
	Text,
	Scale,
	GitPullRequestArrow,
	Image,
	MousePointerClick,
	Timer,
	Type,
} from "lucide-react";
import { componentDefinitions } from "../data/templates.js";
import { t } from "../i18n.js";

const icons = {
	hero: Heading1,
	capsule: Image,
	typing: Type,
	quickBadges: Badge,
	about: Text,
	techStack: Code2,
	projects: FolderGit2,
	work: BriefcaseBusiness,
	githubStatsExtended: Github,
	topLanguagesExtended: Languages,
	streak: Sparkles,
	viewCounter: Badge,
	statsExtendedWakatime: Timer,
	statsExtendedRepo: Columns3,
	statsExtendedGist: PanelTop,
	activityGraph: Activity,
	pinnedRepositories: Columns3,
	metrics: BarChart3,
	licenses: Scale,
	pullRequests: GitPullRequestArrow,
	contributionCalendar: Activity,
	wakatime: Timer,
	codetime: Timer,
	ctaButtons: MousePointerClick,
	tableOfContents: ListTree,
	highlights: Award,
	posts: PanelTop,
	socials: Contact,
	support: HeartHandshake,
	quote: Quote,
	customMarkdown: PanelTop,
	divider: Minus,
	spacer: Rows3,
	footer: BarChart3,
};

const groups = [
	{
		id: "profile",
		types: [
			"capsule",
			"hero",
			"typing",
			"quickBadges",
			"about",
			"techStack",
			"projects",
			"work",
			"highlights",
		],
	},
	{
		id: "integrations",
		types: [
			"githubStatsExtended",
			"topLanguagesExtended",
			"statsExtendedWakatime",
			"statsExtendedRepo",
			"statsExtendedGist",
			"streak",
			"viewCounter",
			"activityGraph",
			"pinnedRepositories",
			"metrics",
			"licenses",
			"pullRequests",
			"contributionCalendar",
			"wakatime",
			"codetime",
		],
	},
	{
		id: "content",
		types: [
			"tableOfContents",
			"posts",
			"ctaButtons",
			"socials",
			"support",
			"quote",
			"customMarkdown",
			"divider",
			"spacer",
			"footer",
		],
	},
];

function PaletteItem({ type, language, onAdd }) {
	const definition = componentDefinitions[type];
	const Icon = icons[type] || Code2;
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({ id: `palette:${type}`, data: { kind: "palette", type } });
	const style = transform
		? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
		: undefined;

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`palette-item ${isDragging ? "dragging" : ""}`}
		>
			<button
				type="button"
				className="palette-drag"
				{...attributes}
				{...listeners}
				aria-label={t(language, "aria.dragComponent")}
			>
				<GripVertical size={15} />
			</button>
			<span className="palette-icon">
				<Icon size={18} />
			</span>
			<button
				type="button"
				className="palette-content"
				onClick={() => onAdd(type)}
			>
				<strong>{definition.label[language] || definition.label.en}</strong>
				<small>
					{definition.description[language] || definition.description.en}
				</small>
			</button>
			<button
				type="button"
				className="palette-add"
				onClick={() => onAdd(type)}
				aria-label={t(language, "aria.addComponent")}
			>
				+
			</button>
		</div>
	);
}

export default function Palette({ language, onAdd }) {
	return (
		<aside className="palette-panel app-panel">
			<div className="panel-heading">
				<div>
					<span className="panel-kicker">
						{t(language, "inspectorUi.library")}
					</span>
					<h2>{t(language, "components")}</h2>
				</div>
			</div>
			<div className="palette-scroll">
				{groups.map((group) => (
					<section className="palette-group" key={group.id}>
						<h3>{t(language, `paletteGroups.${group.id}`)}</h3>
						<div className="palette-list">
							{group.types.map((type) => (
								<PaletteItem
									key={type}
									type={type}
									language={language}
									onAdd={onAdd}
								/>
							))}
						</div>
					</section>
				))}
			</div>
		</aside>
	);
}
