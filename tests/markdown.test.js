import assert from "node:assert/strict";
import test from "node:test";
import {
	builtInTemplates,
	cloneProject,
	componentDefinitions,
	createBuiltInTemplateProject,
	createBlock,
	initialProject,
	resolveTheme,
} from "../src/data/templates.js";
import { renderMarkdown } from "../src/lib/markdown.js";

test("the default project produces GitHub-ready Markdown", () => {
	const markdown = renderMarkdown(initialProject);

	assert.match(markdown, /<h1>/);
	assert.match(markdown, /## About me/);
	assert.match(markdown, /capsule-render\.vercel\.app/);
	assert.ok(markdown.endsWith("\n"));
});

test("every component definition can be created and rendered", () => {
	for (const type of Object.keys(componentDefinitions)) {
		const project = cloneProject(initialProject);
		project.blocks = [createBlock(type)];

		assert.doesNotThrow(
			() => renderMarkdown(project),
			`Unable to render component: ${type}`,
		);
	}
});

test("all built-in templates contain supported components", () => {
	const supportedTypes = new Set(Object.keys(componentDefinitions));

	for (const template of builtInTemplates) {
		for (const block of template.blocks) {
			assert.ok(
				supportedTypes.has(block.type),
				`${template.name} uses unsupported component: ${block.type}`,
			);
		}
	}
});

test("built-in templates follow a complete, useful section hierarchy", () => {
	const configurationOnly = new Set([
		"codetime",
		"posts",
		"support",
		"wakatime",
	]);

	for (const template of builtInTemplates) {
		const types = template.blocks.map((block) => block.type);
		assert.ok(
			["capsule", "hero"].includes(types[0]),
			`${template.name} should open with an identity section`,
		);
		assert.ok(types.includes("hero"), `${template.name} is missing a hero`);
		assert.ok(
			types.includes("about"),
			`${template.name} is missing an about section`,
		);
		assert.ok(
			types.includes("techStack"),
			`${template.name} is missing a tech stack`,
		);
		assert.ok(
			types.includes("socials"),
			`${template.name} is missing contact links`,
		);
		assert.ok(
			types.includes("footer"),
			`${template.name} is missing a closing section`,
		);
		assert.ok(
			types.indexOf("hero") < types.indexOf("about"),
			`${template.name} should introduce the profile before details`,
		);
		assert.ok(
			types.indexOf("about") < types.indexOf("socials"),
			`${template.name} should keep contact links near the end`,
		);
		assert.equal(
			types.some((type) => configurationOnly.has(type)),
			false,
			`${template.name} contains an empty integration by default`,
		);
	}
});

test("template component colors stay aligned with their selected theme", () => {
	for (const template of builtInTemplates) {
		const theme = resolveTheme(template.themeId);
		for (const block of template.blocks) {
			if (block.type === "capsule") {
				assert.equal(block.props.colorStart, theme.background);
				assert.equal(block.props.textColor, theme.text);
				assert.ok(
					[theme.accent, theme.accentAlt].includes(block.props.colorEnd),
				);
			}
			if (block.type === "typing")
				assert.equal(block.props.color, theme.accent);
			if (block.type === "ctaButtons") {
				for (const button of block.props.buttons)
					assert.equal(button.color, theme.accent);
			}
		}
	}
});

test("applying a built-in template creates fresh, localized blocks", () => {
	const project = cloneProject(initialProject);
	project.profile.outputLanguage = "fr";
	const localized = createBuiltInTemplateProject(
		project,
		"student-builder",
		"fr",
	);
	const typing = localized.blocks.find((block) => block.type === "typing");
	const about = localized.blocks.find((block) => block.type === "about");
	const cta = localized.blocks.find((block) => block.type === "ctaButtons");

	assert.equal(localized.themeId, "solar");
	assert.match(typing.props.lines[0], /Étudiant/);
	assert.equal(about.props.title, "À propos de moi");
	assert.match(cta.props.buttons[0].label, /VOIR TOUS MES PROJETS/);
	assert.notEqual(
		localized.blocks[0].id,
		builtInTemplates.find((template) => template.id === "student-builder")
			.blocks[0].id,
	);
});

test("hidden components are omitted from the export", () => {
	const project = cloneProject(initialProject);
	project.blocks = [createBlock("quote", { text: "Visible marker" })];
	project.blocks[0].visible = false;

	assert.equal(renderMarkdown(project), "\n");
});

test("quick badges use the configured CodeTime and WakaTime image URLs", () => {
	const project = cloneProject(initialProject);
	project.blocks = [
		createBlock("quickBadges", {
			followers: false,
			profileViews: false,
			stars: false,
			codeTimeBadgeUrl: "https://codetime.dev/public/demo-badge.svg",
			wakatimeBadgeUrl:
				"https://wakatime.com/badge/user/demo/project/readme.svg",
		}),
	];

	const markdown = renderMarkdown(project);

	assert.match(markdown, /https:\/\/codetime\.dev\/public\/demo-badge\.svg/);
	assert.doesNotMatch(markdown, /href="https:\/\/codetime\.dev\/en\/"/);
	assert.match(
		markdown,
		/https:\/\/wakatime\.com\/badge\/user\/demo\/project\/readme\.svg/,
	);
	assert.doesNotMatch(markdown, /href="https:\/\/wakatime\.com\/"/);
	assert.doesNotMatch(markdown, /CodeDev/);
});

test("quick badges omit analytics badges until an image URL is configured", () => {
	const project = cloneProject(initialProject);
	project.blocks = [createBlock("quickBadges")];

	const markdown = renderMarkdown(project);

	assert.doesNotMatch(markdown, /CodeTime-Coding%20activity/);
	assert.doesNotMatch(markdown, /WakaTime-Coding%20activity/);
	assert.doesNotMatch(markdown, /CodeDev/);
});

test("WakaTime accepts a copied official badge URL", () => {
	const project = cloneProject(initialProject);
	project.blocks = [
		createBlock("wakatime", {
			badgeUrl: "https://wakatime.com/share/@demo/chart.svg",
		}),
	];

	const markdown = renderMarkdown(project);

	assert.match(markdown, /https:\/\/wakatime\.com\/share\/@demo\/chart\.svg/);
	assert.match(markdown, /href="https:\/\/wakatime\.com\/"/);
});

test("template calls to action use the current GitHub username", () => {
	const project = cloneProject(initialProject);
	project.profile.basics.username = "octocat";
	project.blocks = [createBlock("ctaButtons")];

	const markdown = renderMarkdown(project);

	assert.match(markdown, /github\.com\/octocat\?tab=repositories/);
	assert.doesNotMatch(markdown, /your-username/);
});

test("GitHub Stats Extended cards preserve advanced provider parameters", () => {
	const project = cloneProject(initialProject);
	project.profile.basics.username = "octocat";
	project.blocks = [
		createBlock("githubStatsExtended", {
			options: [
				{ key: "cache_seconds", value: "86400" },
				{ key: "hide", value: "issues,prs" },
			],
		}),
		createBlock("topLanguagesExtended", {
			options: [{ key: "hide_progress", value: "true" }],
		}),
		createBlock("streak", {
			options: [
				{ key: "hide_current_streak", value: "true" },
				{ key: "starting_year", value: "2017" },
			],
		}),
	];

	const markdown = renderMarkdown(project);

	assert.match(markdown, /github-stats-extended\.vercel\.app/);
	assert.match(markdown, /cache_seconds=86400/);
	assert.match(markdown, /hide=issues%2Cprs/);
	assert.match(markdown, /hide_progress=true/);
	assert.match(markdown, /hide_current_streak=true/);
	assert.match(markdown, /starting_year=2017/);
});

test("Komarev view counter uses the configured username and color", () => {
	const project = cloneProject(initialProject);
	project.blocks = [
		createBlock("viewCounter", {
			username: "octocat",
			color: "blue",
			alt: "Profile visits",
		}),
	];

	const markdown = renderMarkdown(project);

	assert.match(markdown, /https:\/\/komarev\.com\/ghpvc\/\?username=octocat&color=blue/);
	assert.match(markdown, /alt="Profile visits"/);
});
