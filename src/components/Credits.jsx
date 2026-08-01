import { ExternalLink, Heart, PackageOpen, WandSparkles } from "lucide-react";
import { t } from "../i18n.js";

const credits = [
	{
		title: "Application",
		items: [
			["React", "https://react.dev/"],
			["Vite", "https://vite.dev/"],
			["Lucide", "https://lucide.dev/"],
			["dnd kit", "https://dndkit.com/"],
			[
				"React Markdown, remark-gfm & rehype-raw",
				"https://github.com/remarkjs/react-markdown",
			],
			[
				"github-markdown-css",
				"https://github.com/sindresorhus/github-markdown-css",
			],
		],
	},
	{
		title: "README services",
		items: [
			["GitHub REST API", "https://docs.github.com/rest"],
			[
				"GitHub Stats Extended",
				"https://github.com/stats-organization/github-stats-extended",
			],
			["Shields.io", "https://shields.io/"],
			["Simple Icons", "https://simpleicons.org/"],
			[
				"Readme Typing SVG",
				"https://github.com/DenverCoder1/readme-typing-svg",
			],
			[
				"GitHub Streak Stats",
				"https://github.com/DenverCoder1/github-readme-streak-stats",
			],
			[
				"GitHub Activity Graph",
				"https://github.com/Ashutosh00710/github-readme-activity-graph",
			],
			[
				"GitHub Licenses Stats",
				"https://github.com/lheintzmann1/github-licenses-stats",
			],
			["GitHub PR Stats", "https://github.com/f14XuanLv/github-pr-stats"],
			["Metrics", "https://github.com/lowlighter/metrics"],
			["GHChart", "https://ghchart.rshah.org/"],
		],
	},
	{
		title: "Inspiration",
		items: [
			["lowlighter/metrics", "https://github.com/lowlighter/metrics"],
			[
				"matiassingers/awesome-readme",
				"https://github.com/matiassingers/awesome-readme",
			],
		],
	},
];

export default function Credits({ language }) {
	return (
		<div className="credits-page">
			<div className="credits-hero">
				<div>
					<p className="panel-kicker">README Studio</p>
					<h2>{t(language, "creditsTitle")}</h2>
					<p>{t(language, "creditsIntro")}</p>
				</div>
			</div>
			<div className="credits-grid">
				{credits.map((group) => (
					<section className="credits-card" key={group.title}>
						<h3>
							<PackageOpen size={15} /> {group.title}
						</h3>
						<ul>
							{group.items.map(([label, href]) => (
								<li key={href}>
									<a href={href} target="_blank" rel="noreferrer">
										{label}
										<ExternalLink size={12} />
									</a>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
			<p className="credits-license">
				<Heart size={14} /> {t(language, "creditsLicense")}
			</p>
		</div>
	);
}
