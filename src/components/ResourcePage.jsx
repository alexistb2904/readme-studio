import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { socialImageUrl } from "../lib/siteConfig.js";

const resourcePages = {
	"github-profile-readme": {
		eyebrow: "GitHub profile guide",
		title: "How to create a GitHub profile README.",
		lead: "A GitHub profile README introduces your work before someone opens a repository. Keep it useful: explain what you build, show the technologies you use and make it easy to find your best work.",
		sectionEyebrow: "The setup",
		sectionTitle: "Publish a profile README in three steps.",
		cards: [
			[
				"Create the matching repository",
				"On GitHub, create a public repository with exactly the same name as your GitHub username. Its README.md is displayed at the top of your profile.",
			],
			[
				"Write for a real visitor",
				"Start with a short introduction, then add your focus, selected projects, technology stack and practical links. Prefer clear information over a wall of badges.",
			],
			[
				"Preview and publish",
				"Check the rendered Markdown, copy the final README.md into the matching repository and commit it. Review it whenever your work changes.",
			],
		],
		calloutTitle: "A good profile README is selective",
		calloutText:
			"Use it to answer the questions a collaborator, recruiter or potential client has first: who you are, what you build and where they can see your work. README Studio keeps the resulting Markdown portable, so you are never locked into the editor.",
		faqTitle: "GitHub profile README FAQ",
		faqs: [
			[
				"What should I include in my GitHub profile README?",
				"Include a concise introduction, your focus or current work, selected projects, technologies you use and the best ways to reach you. Only add dynamic cards or badges that help a visitor understand your work.",
			],
			[
				"Do I need a generator to create a profile README?",
				"No. A generator is useful when you want to arrange common sections visually and preview the Markdown before publishing. You can always edit the exported README.md directly in GitHub.",
			],
		],
	},
	"github-readme-templates": {
		eyebrow: "Free developer templates",
		title: "GitHub profile README templates that stay editable.",
		lead: "The best template is a useful starting point, not a substitute for your work. Pick a structure that matches your profile, replace the placeholders with evidence and export regular Markdown you can maintain.",
		sectionEyebrow: "Choose a structure",
		sectionTitle: "Three useful profile README patterns.",
		cards: [
			[
				"Minimal developer profile",
				"Use a concise introduction, one sentence about your current focus, a short technology list and two or three selected project links. This is a strong choice when your repositories already tell the detailed story.",
			],
			[
				"Full-stack project portfolio",
				"Lead with your product or engineering focus, group your stack by purpose and give each selected project a result-oriented description with a repository or demo link.",
			],
			[
				"Open-source contributor",
				"Highlight the projects you maintain or contribute to, explain how people can collaborate and include practical links to issues, documentation and community channels.",
			],
		],
		calloutTitle: "Customize before you publish",
		calloutText:
			"Remove sections that do not describe you. A focused README with a few working links is more useful than a template filled with generic placeholders, decorative statistics or unused badges.",
		faqTitle: "Template checklist",
		faqs: [
			[
				"Which GitHub profile README template should I choose?",
				"Choose the template that reflects what a visitor should learn first about your work, not simply the one with the most effects.",
			],
			[
				"Can I edit a template after exporting it?",
				"Yes. README Studio exports regular Markdown and GitHub-supported HTML, so every section remains editable in GitHub or a code editor.",
			],
		],
	},
};

export default function ResourcePage({ resource }) {
	const page = resourcePages[resource];

	if (!page) return null;

	return (
		<main className="resource-app-page">
			<header className="resource-app-header">
				<Link className="resource-app-brand" to="/">
					README <em>Studio</em>
				</Link>
				<Link className="resource-app-button" to="/">
					Open the generator <ArrowRight size={16} aria-hidden="true" />
				</Link>
			</header>
			<article className="resource-app-content">
				<section className="resource-app-hero">
					<div>
						<p className="resource-app-eyebrow">{page.eyebrow}</p>
						<h1>{page.title}</h1>
						<p className="resource-app-lead">{page.lead}</p>
						<Link className="resource-app-button" to="/">
							Create a README for free{" "}
							<ArrowRight size={16} aria-hidden="true" />
						</Link>
					</div>
					<img
						src={socialImageUrl}
						alt="README Studio visual GitHub README generator"
						width="1200"
						height="630"
					/>
				</section>
				<section className="resource-app-section">
					<p className="resource-app-eyebrow">{page.sectionEyebrow}</p>
					<h2>{page.sectionTitle}</h2>
					<div className="resource-app-grid">
						{page.cards.map(([title, description], index) => (
							<article key={title}>
								<span>0{index + 1}</span>
								<h3>{title}</h3>
								<p>{description}</p>
							</article>
						))}
					</div>
					<aside className="resource-app-callout">
						<h3>{page.calloutTitle}</h3>
						<p>{page.calloutText}</p>
					</aside>
				</section>
				<section className="resource-app-section">
					<p className="resource-app-eyebrow">Common questions</p>
					<h2>{page.faqTitle}</h2>
					{page.faqs.map(([question, answer]) => (
						<details key={question}>
							<summary>{question}</summary>
							<p>{answer}</p>
						</details>
					))}
				</section>
			</article>
		</main>
	);
}
