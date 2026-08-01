import { technologyById } from "../data/technologies.js";
import { resolveTheme } from "../data/templates.js";

const labels = {
	en: {
		about: "About me",
		tech: "Tech stack",
		projects: "Featured projects",
		experience: "Experience",
		stats: "GitHub statistics",
		languages: "Most used languages",
		streak: "Contribution streak",
		activity: "Recent activity",
		repositories: "Selected repositories",
		socials: "Let’s connect",
		support: "Support the project",
		repo: "Repository",
		live: "Live demo",
		current: "Currently",
		based: "Based in",
		working: "Working as",
		focus: "Current focus",
		learning: "Learning",
		ask: "Ask me about",
		availability: "Availability",
		languageNote:
			"The language card reflects code found in public repositories and is not an absolute measure of proficiency.",
	},
	fr: {
		about: "À propos",
		tech: "Stack technique",
		projects: "Projets principaux",
		experience: "Expérience",
		stats: "Statistiques GitHub",
		languages: "Langages les plus utilisés",
		streak: "Série de contributions",
		activity: "Activité récente",
		repositories: "Dépôts sélectionnés",
		socials: "Me contacter",
		support: "Soutenir le projet",
		repo: "Dépôt",
		live: "Voir le projet",
		current: "Actuellement",
		based: "Basé à",
		working: "Poste",
		focus: "Objectif actuel",
		learning: "En apprentissage",
		ask: "Sujets favoris",
		availability: "Disponibilité",
		languageNote:
			"La carte des langages représente le code présent dans les dépôts publics et non une mesure absolue des compétences.",
	},
	es: {
		about: "Sobre mí",
		tech: "Stack tecnológico",
		projects: "Proyectos destacados",
		experience: "Experiencia",
		stats: "Estadísticas de GitHub",
		languages: "Lenguajes más usados",
		streak: "Racha de contribuciones",
		activity: "Actividad reciente",
		repositories: "Repositorios seleccionados",
		socials: "Conectemos",
		support: "Apoya el proyecto",
		repo: "Repositorio",
		live: "Ver proyecto",
		current: "Actualmente",
		based: "Ubicación",
		working: "Trabajo como",
		focus: "En qué estoy trabajando",
		learning: "Aprendiendo",
		ask: "Pregúntame sobre",
		availability: "Disponibilidad",
		languageNote:
			"Esta tarjeta refleja el código de repositorios públicos y no mide de forma absoluta las habilidades.",
	},
};

const clean = (value = "") => String(value).trim();
const encode = (value = "") => encodeURIComponent(clean(value));
const safeAlt = (value = "") => clean(value).replace(/[<>]/g, "");
const safeText = (value = "") => clean(value).replace(/\|/g, "\\|");
const themeOf = (project) => resolveTheme(project);
const langOf = (project) =>
	["fr", "es"].includes(project.profile.outputLanguage)
		? project.profile.outputLanguage
		: "en";
const L = (project, key) => labels[langOf(project)][key];

function sectionTitle(project, custom, fallback) {
	return `## ${clean(custom) || L(project, fallback)}`;
}

function alignWrap(content, align = "center") {
	if (align === "left") return content;
	return `<div align="${align}">\n\n${content}\n\n</div>`;
}

function image(url, alt, width) {
	const widthAttribute = width
		? ` width="${String(width).replace(/\"/g, "")}"`
		: "";
	return `<img src="${url}" alt="${safeAlt(alt)}"${widthAttribute} />`;
}

function linkedImage(url, alt, link = "") {
	const content = image(url, alt);
	return clean(link) ? `<a href="${clean(link)}">${content}</a>` : content;
}

function shieldsBadge(
	label,
	message,
	color,
	logo = "",
	style = "for-the-badge",
	link = "",
) {
	const logoPart = logo ? `&logo=${encode(logo)}&logoColor=white` : "";
	const src = `https://img.shields.io/badge/${encode(label)}-${encode(message)}-${color}?style=${style}${logoPart}`;
	const img = `<img src="${src}" alt="${safeAlt(`${label} ${message}`)}" />`;
	return link ? `<a href="${link}">${img}</a>` : img;
}

function shieldsButton(
	label,
	message,
	color,
	logo = "",
	style = "for-the-badge",
	link = "",
	alt = "",
) {
	const logoPart = logo ? `&logo=${encode(logo)}&logoColor=white` : "";
	const caption = clean(message)
		? `${encode(label)}-${encode(message)}-${clean(color).replace("#", "")}`
		: `${encode(label)}-${clean(color).replace("#", "")}`;
	const src = `https://img.shields.io/badge/${caption}?style=${encode(style)}${logoPart}`;
	const img = `<img src="${src}" alt="${safeAlt(alt || [label, message].filter(clean).join(" "))}" />`;
	return clean(link) ? `<a href="${clean(link)}">${img}</a>` : img;
}

function renderHero(block, project) {
	const { basics } = project.profile;
	const props = block.props;
	const name = clean(basics.name) || clean(basics.username) || "Your Name";
	const greeting =
		clean(props.greeting) ||
		(langOf(project) === "fr" ? "Bonjour, je suis" : "Hi, I’m");
	const parts = [];

	if (props.showAvatar && clean(basics.avatarUrl)) {
		parts.push(image(clean(basics.avatarUrl), name, props.avatarSize || 120));
	}

	parts.push(`<h1>${greeting} ${safeText(name)} ${clean(props.emoji)}</h1>`);
	if (clean(basics.headline))
		parts.push(`<p><strong>${safeText(basics.headline)}</strong></p>`);

	if (
		props.showTyping &&
		Array.isArray(props.typingLines) &&
		props.typingLines.filter(clean).length
	) {
		const lines = props.typingLines.filter(clean).map(encode).join(";");
		const theme = themeOf(project);
		const src = `https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=500&size=20&pause=1200&color=${theme.accent.toUpperCase()}&center=${props.align !== "left"}&vCenter=true&width=760&lines=${lines}`;
		parts.push(image(src, "Typing introduction"));
	}

	if (clean(basics.bio)) parts.push(`<p>${safeText(basics.bio)}</p>`);
	return alignWrap(parts.join("\n\n"), props.align);
}

function renderQuickBadges(block, project) {
	const { basics } = project.profile;
	const username = clean(basics.username) || "your-username";
	const theme = themeOf(project);
	const props = block.props;
	const badges = [];

	if (props.followers) {
		badges.push(
			`<a href="https://github.com/${username}?tab=followers"><img src="https://img.shields.io/github/followers/${username}?style=${props.style}&logo=github&label=${encode(props.followersLabel || "Followers")}&color=${theme.accent}" alt="GitHub followers" /></a>`,
		);
	}
	if (props.profileViews) {
		badges.push(
			`<img src="https://komarev.com/ghpvc/?username=${username}&style=${props.style}&label=${encode(props.viewsLabel || "Profile views")}&color=${theme.accent}" alt="Profile views" />`,
		);
	}
	if (props.stars) {
		badges.push(
			`<img src="https://img.shields.io/github/stars/${username}?affiliations=OWNER&style=${props.style}&logo=github&label=${encode(props.starsLabel || "Stars")}&color=${theme.accentAlt}" alt="GitHub stars" />`,
		);
	}
	if (props.showCodeTime) {
		if (clean(props.codeTimeBadgeUrl)) {
			badges.push(
				image(
					clean(props.codeTimeBadgeUrl),
					props.codeTimeAlt || "CodeTime coding activity",
				),
			);
		}
	}
	if (props.showWakaTime) {
		if (clean(props.wakatimeBadgeUrl)) {
			badges.push(
				image(
					clean(props.wakatimeBadgeUrl),
					props.wakatimeAlt || "WakaTime coding activity",
				),
			);
		}
	}
	for (const badge of props.customBadges || []) {
		if (!clean(badge.label)) continue;
		badges.push(
			shieldsBadge(
				badge.label,
				badge.message || "",
				badge.color || theme.accent,
				badge.logo || "",
				props.style,
				badge.link || "",
			),
		);
	}
	return alignWrap(badges.join("\n"), props.align);
}

function renderCapsule(block, project) {
	const p = block.props;
	const theme = themeOf(project);
	const basics = project.profile.basics;
	const defaultName =
		clean(basics.name) || clean(basics.username) || "Your name";
	const defaultDescription = clean(basics.headline);
	const color = [
		`0:${clean(p.colorStart).replace("#", "") || theme.background}`,
		`${Math.max(1, Math.min(99, Number(p.middleStop) || 45))}:${clean(p.colorMiddle).replace("#", "") || theme.accent}`,
		`100:${clean(p.colorEnd).replace("#", "") || theme.accentAlt}`,
	].join(",");
	const params = new URLSearchParams({
		type: p.type || "waving",
		color,
		height: String(Math.max(40, Number(p.height) || 220)),
		section: p.section || "header",
		animation: p.animation || "fadeIn",
	});
	if (p.showText) {
		params.set("text", clean(p.text) || defaultName);
		params.set("fontSize", String(Math.max(1, Number(p.textSize) || 42)));
		params.set("fontColor", clean(p.textColor).replace("#", "") || theme.text);
		params.set(
			"fontAlignY",
			String(Math.max(1, Math.min(99, Number(p.textY) || 35))),
		);
		if (clean(p.description) || defaultDescription) {
			params.set("desc", clean(p.description) || defaultDescription);
			params.set(
				"descSize",
				String(Math.max(1, Number(p.descriptionSize) || 18)),
			);
			params.set(
				"descAlignY",
				String(Math.max(1, Math.min(99, Number(p.descriptionY) || 58))),
			);
		}
	}
	return alignWrap(
		image(
			`https://capsule-render.vercel.app/api?${params.toString()}`,
			p.alt || "Profile banner",
			"100%",
		),
		p.align,
	);
}

function renderTyping(block) {
	const p = block.props;
	const lines = (p.lines || []).map(clean).filter(Boolean);
	if (!lines.length)
		return `_${safeText(p.emptyText || "Add at least one typing line.")}_`;
	const params = new URLSearchParams({
		font: p.font || "JetBrains Mono",
		weight: String(Math.max(100, Number(p.weight) || 500)),
		size: String(Math.max(1, Number(p.size) || 21)),
		pause: String(Math.max(0, Number(p.pause) || 1200)),
		color: clean(p.color).replace("#", "") || "ef4444",
		width: String(Math.max(100, Number(p.width) || 850)),
		lines: lines.join(";"),
	});
	if (p.centerText) params.set("center", "true");
	if (p.verticalCenter) params.set("vCenter", "true");
	return alignWrap(
		image(
			`https://readme-typing-svg.demolab.com?${params.toString()}`,
			p.alt || "Animated introduction",
		),
		p.align,
	);
}

function renderAbout(block, project) {
	const { basics, work } = project.profile;
	const p = block.props;
	const rows = [];
	if (p.showWork && (clean(work.role) || clean(work.company))) {
		const value = [
			clean(work.role),
			clean(work.company) ? `@ ${clean(work.company)}` : "",
		]
			.filter(Boolean)
			.join(" ");
		rows.push(
			`- 💼 **${safeText(p.workLabel || L(project, "working"))}:** ${safeText(value)}`,
		);
	}
	if (p.showLocation && clean(basics.location))
		rows.push(
			`- 📍 **${safeText(p.locationLabel || L(project, "based"))}:** ${safeText(basics.location)}`,
		);
	if (clean(p.currentFocus))
		rows.push(
			`- 🔭 **${safeText(p.focusLabel || L(project, "focus"))}:** ${safeText(p.currentFocus)}`,
		);
	if (clean(p.learning))
		rows.push(
			`- 🌱 **${safeText(p.learningLabel || L(project, "learning"))}:** ${safeText(p.learning)}`,
		);
	if (clean(p.askMeAbout))
		rows.push(
			`- 💬 **${safeText(p.askLabel || L(project, "ask"))}:** ${safeText(p.askMeAbout)}`,
		);
	if (p.showAvailability && clean(work.availability))
		rows.push(
			`- 🤝 **${safeText(p.availabilityLabel || L(project, "availability"))}:** ${safeText(work.availability)}`,
		);
	for (const section of p.customSections || []) {
		if (!clean(section.label) || !clean(section.value)) continue;
		rows.push(
			`- ${safeText(section.emoji || "✦")} **${safeText(section.label)}:** ${safeText(section.value)}`,
		);
	}

	const title = sectionTitle(project, p.title, "about");
	if (p.layout === "paragraph") {
		const paragraphs = [
			clean(basics.bio),
			rows.map((row) => row.replace(/^- /, "")).join(" · "),
		].filter(Boolean);
		return `${title}\n\n${paragraphs.join("\n\n")}`;
	}
	return `${title}\n\n${rows.join("\n") || safeText(basics.bio) || safeText(p.emptyText)}`;
}

function iconUrl(slug, color = "") {
	return `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`;
}

function skillIcon(item, size) {
	const img = `<img src="${iconUrl(item.slug)}" alt="${safeAlt(item.name)}" width="${size}" height="${size}" />`;
	return img;
}

function skillBadge(item, theme) {
	return shieldsBadge(item.name, "", theme.surface, item.slug, "flat-square");
}

function renderTechStack(block, project) {
	const selected = (project.profile.skills || [])
		.map((id) => technologyById[id])
		.filter(Boolean);
	const p = block.props;
	const theme = themeOf(project);
	const title = sectionTitle(project, p.title, "tech");
	if (!selected.length)
		return `${title}\n\n_${safeText(p.emptyText || "No technologies selected.")}_`;

	const renderItems = (items) => {
		if (p.display === "badges")
			return items.map((item) => skillBadge(item, theme)).join(" ");
		if (p.showNames) {
			const perRow = Math.max(2, Math.min(12, Number(p.maxPerRow) || 8));
			const rows = [];
			for (let index = 0; index < items.length; index += perRow) {
				const cells = items
					.slice(index, index + perRow)
					.map(
						(item) =>
							`<td align="center">${skillIcon(item, p.iconSize || 42)}<br/><sub>${safeText(item.name)}</sub></td>`,
					);
				rows.push(`<tr>${cells.join("")}</tr>`);
			}
			return `<table>${rows.join("")}</table>`;
		}
		return `<p>${items.map((item) => skillIcon(item, p.iconSize || 42)).join("\n")}</p>`;
	};

	if (!p.grouped) return `${title}\n\n${renderItems(selected)}`;
	const groups = new Map();
	for (const item of selected) {
		if (!groups.has(item.category)) groups.set(item.category, []);
		groups.get(item.category).push(item);
	}
	const body = [...groups.entries()]
		.map(([category, items]) => `### ${category}\n\n${renderItems(items)}`)
		.join("\n\n");
	return `${title}\n\n${body}`;
}

function techBadges(ids, theme) {
	return (ids || [])
		.map((id) => technologyById[id])
		.filter(Boolean)
		.map((item) => skillBadge(item, theme))
		.join(" ");
}

function projectCard(projectItem, project, block) {
	const theme = themeOf(project);
	const p = block.props;
	const links = [];
	if (p.showRepository && clean(projectItem.repository))
		links.push(
			`<a href="${clean(projectItem.repository)}"><strong>${safeText(p.repositoryLabel || L(project, "repo"))}</strong></a>`,
		);
	if (p.showLiveUrl && clean(projectItem.liveUrl))
		links.push(
			`<a href="${clean(projectItem.liveUrl)}"><strong>${safeText(p.liveLabel || L(project, "live"))}</strong></a>`,
		);
	const tech = p.showTechnologies ? techBadges(projectItem.techIds, theme) : "";
	const logo =
		p.showLogo && clean(projectItem.logoUrl)
			? `<img src="${clean(projectItem.logoUrl)}" alt="${safeAlt(projectItem.name || "Project")} logo" width="44" height="44" />\n`
			: "";
	const imagePreview =
		p.showImage && clean(projectItem.imageUrl)
			? `<img src="${clean(projectItem.imageUrl)}" alt="${safeAlt(projectItem.imageAlt || projectItem.name || "Project preview")}" />\n`
			: "";
	return `${imagePreview}${logo}<h3 align="center">${safeText(projectItem.name || "Project")}</h3>\n<p>${safeText(projectItem.description)}</p>\n${tech ? `<p align="center">${tech}</p>` : ""}\n${links.length ? `<p align="center">${links.join(" · ")}</p>` : ""}`;
}

function renderProjects(block, project) {
	const items = project.profile.projects || [];
	const title = sectionTitle(project, block.props.title, "projects");
	if (!items.length)
		return `${title}\n\n_${safeText(block.props.emptyText || "No projects added.")}_`;
	if (Number(block.props.columns) === 1) {
		return `${title}\n\n${items.map((item) => `${block.props.showImage && clean(item.imageUrl) ? `${image(clean(item.imageUrl), item.imageAlt || item.name)}\n\n` : ""}${block.props.showLogo && clean(item.logoUrl) ? `${image(clean(item.logoUrl), `${item.name} logo`, 44)}\n\n` : ""}### ${safeText(item.name)}\n\n${safeText(item.description)}\n\n${techBadges(item.techIds, themeOf(project))}\n\n${[clean(item.repository) && `[${safeText(block.props.repositoryLabel || L(project, "repo"))}](${clean(item.repository)})`, clean(item.liveUrl) && `[${safeText(block.props.liveLabel || L(project, "live"))}](${clean(item.liveUrl)})`].filter(Boolean).join(" · ")}`).join("\n\n---\n\n")}`;
	}
	const rows = [];
	for (let index = 0; index < items.length; index += 2) {
		const cells = items
			.slice(index, index + 2)
			.map(
				(item) =>
					`<td width="50%">\n${projectCard(item, project, block)}\n</td>`,
			);
		if (cells.length === 1) cells.push('<td width="50%"></td>');
		rows.push(`<tr>\n${cells.join("\n")}\n</tr>`);
	}
	return `${title}\n\n<table>\n${rows.join("\n")}\n</table>`;
}

function renderWork(block, project) {
	const items = project.profile.experiences || [];
	const current = project.profile.work;
	const title = sectionTitle(project, block.props.title, "experience");
	const rows = [];
	if (
		block.props.showCurrent &&
		(clean(current.role) || clean(current.company))
	) {
		rows.push(
			`- **${safeText(current.role || "Current role")}**${clean(current.company) ? ` - ${safeText(current.company)}` : ""}${clean(current.availability) ? ` · ${safeText(current.availability)}` : ""}`,
		);
	}
	for (const item of items) {
		const company =
			clean(item.companyUrl) && clean(item.company)
				? `[${safeText(item.company)}](${clean(item.companyUrl)})`
				: safeText(item.company);
		const summary = `- **${safeText(item.role)}**${clean(item.company) ? ` - ${company}` : ""}${clean(item.period) ? ` · ${safeText(item.period)}` : ""}${clean(item.location) ? ` · ${safeText(item.location)}` : ""}`;
		rows.push(
			`${summary}${clean(item.description) ? `\n  - ${safeText(item.description)}` : ""}`,
		);
	}
	return `${title}\n\n${rows.join("\n") || `_${safeText(block.props.emptyText || "No experience added.")}_`}`;
}

function statsParams(project) {
	const theme = themeOf(project);
	return `bg_color=${theme.background}&title_color=${theme.accent}&text_color=${theme.text}&icon_color=${theme.accentAlt}&border_color=${theme.border}`;
}

function appendOptions(params, options = []) {
	for (const option of options) {
		if (clean(option?.key) && clean(option?.value)) {
			params.set(clean(option.key), clean(option.value));
		}
	}
	return params;
}

function renderGithubStatsExtended(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const params = appendOptions(
		new URLSearchParams({
			username,
			show_icons: String(Boolean(p.showIcons)),
			include_all_commits: String(Boolean(p.includeAllCommits)),
			count_private: String(Boolean(p.privateCount)),
			hide_border: String(Boolean(p.hideBorder)),
			rank_icon: p.rankIcon || "github",
			...Object.fromEntries(new URLSearchParams(statsParams(project))),
		}),
		p.options,
	);
	const url = `${clean(p.baseUrl) || "https://github-stats-extended.vercel.app/api"}?${params.toString()}`;
	return `${sectionTitle(project, p.title, "stats")}\n\n${alignWrap(image(url, `${username} GitHub statistics`), p.align)}`;
}

function renderTopLanguagesExtended(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const params = appendOptions(
		new URLSearchParams({
			username,
			layout: p.layout || "compact",
			langs_count: String(Number(p.count) || 10),
			hide_border: String(Boolean(p.hideBorder)),
			...Object.fromEntries(new URLSearchParams(statsParams(project))),
		}),
		p.options,
	);
	if (clean(p.excludeRepos)) params.set("exclude_repo", clean(p.excludeRepos));
	const url = `${clean(p.baseUrl) || "https://github-stats-extended.vercel.app/api/top-langs"}?${params.toString()}`;
	const note = p.note
		? `\n\n> ${safeText(p.noteText || L(project, "languageNote"))}`
		: "";
	return `${sectionTitle(project, p.title, "languages")}\n\n${alignWrap(image(url, `${username} top languages`), p.align)}${note}`;
}

function renderStreak(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const theme = themeOf(project);
	const p = block.props;
	const options = appendOptions(
		new URLSearchParams({
			user: username,
			hide_border: String(p.hideBorder),
			theme: p.theme || "github-dark-blue",
			locale: p.locale || langOf(project),
			mode: p.mode || "daily",
			date_format: p.dateFormat || "Y",
			border_radius: String(Number(p.borderRadius) || 5),
			hide_total_contributions: String(Boolean(p.hideTotal)),
			exclude_days_labels: String(Boolean(p.excludeDaysLabels)),
			background: theme.background,
			ring: theme.accent,
			fire: theme.accentAlt,
			currStreakLabel: theme.accent,
			sideLabels: theme.text,
			currStreakNum: theme.text,
			sideNums: theme.text,
			dates: theme.muted,
		}),
		p.options,
	);
	if (Number(p.cardWidth) > 0)
		options.set("card_width", String(Number(p.cardWidth)));
	const url = `${clean(p.baseUrl) || "https://streak-stats.demolab.com"}?${options.toString()}`;
	return `${sectionTitle(project, p.title, "streak")}\n\n${alignWrap(image(url, `${username} contribution streak`), p.align)}`;
}

function renderViewCounter(block, project) {
	const p = block.props;
	const title = p.showTitle
		? `${sectionTitle(project, p.title, "activity")}\n\n`
		: "";
	const username =
		clean(p.username) ||
		clean(project.profile.basics.username) ||
		"alexistb2904";
	const color = clean(p.color) || "red";
	const url =
		clean(p.counterUrl) ||
		`${clean(p.baseUrl) || "https://komarev.com/ghpvc/"}?${new URLSearchParams({ username, color }).toString()}`;
	return `${title}${alignWrap(image(url, p.alt || "Profile views"), p.align)}`;
}

function renderStatsExtendedWakatime(block, project) {
	const p = block.props;
	const username = clean(p.username);
	const title = sectionTitle(project, p.title, "stats");
	if (!username)
		return `${title}\n\n_${safeText(p.emptyText || "Add your public WakaTime username.")}_`;
	const params = appendOptions(
		new URLSearchParams({
			username,
			...Object.fromEntries(new URLSearchParams(statsParams(project))),
		}),
		p.options,
	);
	const url = `${clean(p.baseUrl) || "https://github-stats-extended.vercel.app/api/wakatime"}?${params.toString()}`;
	return `${title}\n\n${alignWrap(linkedImage(url, `${username} WakaTime statistics`, `https://wakatime.com/@${encode(username)}`), p.align)}`;
}

function renderStatsExtendedRepo(block, project) {
	const p = block.props;
	const username = clean(project.profile.basics.username) || "your-username";
	const repo = clean(p.repo);
	const title = sectionTitle(project, p.title, "repo");
	if (!repo)
		return `${title}\n\n_${safeText(p.emptyText || "Add an owner/repository slug.")}_`;
	const params = appendOptions(
		new URLSearchParams({
			username,
			repo,
			...Object.fromEntries(new URLSearchParams(statsParams(project))),
		}),
		p.options,
	);
	const url = `${clean(p.baseUrl) || "https://github-stats-extended.vercel.app/api/pin"}?${params.toString()}`;
	const destination = repo.includes("/")
		? `https://github.com/${repo}`
		: `https://github.com/${username}/${repo}`;
	return `${title}\n\n${alignWrap(linkedImage(url, repo, destination), p.align)}`;
}

function renderStatsExtendedGist(block, project) {
	const p = block.props;
	const gistId = clean(p.gistId);
	const title = sectionTitle(project, p.title, "repo");
	if (!gistId)
		return `${title}\n\n_${safeText(p.emptyText || "Add a GitHub Gist ID.")}_`;
	const params = appendOptions(
		new URLSearchParams({
			id: gistId,
			...Object.fromEntries(new URLSearchParams(statsParams(project))),
		}),
		p.options,
	);
	const url = `${clean(p.baseUrl) || "https://github-stats-extended.vercel.app/api/gist"}?${params.toString()}`;
	return `${title}\n\n${alignWrap(linkedImage(url, "GitHub Gist", clean(p.gistUrl) || `https://gist.github.com/${gistId}`), p.align)}`;
}

function renderActivityGraph(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const theme = themeOf(project);
	const p = block.props;
	const options = new URLSearchParams({
		username,
		bg_color: theme.background,
		color: theme.text,
		line: theme.accent,
		point: theme.accentAlt,
		area: String(Boolean(p.area)),
		area_color: theme.accent,
		hide_border: String(Boolean(p.hideBorder)),
		hide_title: String(Boolean(p.hideTitle)),
		radius: String(Number(p.radius) || 5),
		custom_title: p.customTitle || p.title || L(project, "activity"),
	});
	if (clean(p.theme)) options.set("theme", p.theme);
	const url = `https://github-readme-activity-graph.vercel.app/graph?${options.toString()}`;
	return `${sectionTitle(project, p.title, "activity")}\n\n${alignWrap(image(url, `${username} activity graph`, "100%"), p.align)}`;
}

function renderPinnedRepositories(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const repos = (block.props.repositories || []).map(clean).filter(Boolean);
	const title = sectionTitle(project, block.props.title, "repositories");
	if (!repos.length)
		return `${title}\n\n_${safeText(block.props.emptyText || "Add repository names from the inspector.")}_`;
	const cards = repos.map(
		(repo) =>
			`<a href="https://github.com/${username}/${repo}">${image(`https://github-stats-extended.vercel.app/api/pin?username=${username}&repo=${encode(repo)}&hide_border=true&${statsParams(project)}`, repo)}</a>`,
	);
	return `${title}\n\n${alignWrap(cards.join("\n"), block.props.align)}`;
}

function renderMetrics(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const params = new URLSearchParams({
		template: p.template || "classic",
		base: p.base || "header, activity, community, repositories, metadata",
	});
	if (p.showCalendar) params.set("plugin_isocalendar", "1");
	if (p.showLanguages) params.set("plugin_languages", "1");
	if (p.showAchievements) params.set("plugin_achievements", "1");
	if (p.showHabits) params.set("plugin_habits", "1");
	for (const option of p.options || []) {
		if (clean(option.key) && clean(option.value))
			params.set(clean(option.key), clean(option.value));
	}
	return `${sectionTitle(project, p.title, "stats")}\n\n${alignWrap(image(`https://metrics.lecoq.io/${encode(username)}?${params.toString()}`, `${username} metrics`), p.align)}`;
}

function renderLicenses(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const url = `https://github-licenses-stats.vercel.app/api/top-licenses?username=${encode(username)}&count=${Math.max(1, Math.min(10, Number(p.count) || 6))}&theme=${encode(p.theme || "dark")}&legend=${p.showLegend !== false}`;
	return `${sectionTitle(project, p.title, "stats")}\n\n${alignWrap(image(url, `${username} license statistics`), p.align)}`;
}

function renderPullRequests(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const options = new URLSearchParams({
		username,
		mode: p.mode || "user-aggregate",
		limit: String(Math.max(1, Math.min(100, Number(p.limit) || 8))),
		theme: p.theme || "default",
	});
	if (p.status && p.status !== "all") options.set("status", p.status);
	if (Number(p.minStars) > 0)
		options.set("min_stars", String(Number(p.minStars)));
	return `${sectionTitle(project, p.title, "stats")}\n\n${alignWrap(image(`https://github-pr-stats-five.vercel.app/api/github-pr-stats?${options.toString()}`, `${username} pull request statistics`), p.align)}`;
}

function renderContributionCalendar(block, project) {
	const username = clean(project.profile.basics.username) || "your-username";
	const p = block.props;
	const color = clean(p.color).replace("#", "") || themeOf(project).accent;
	const url = `https://ghchart.rshah.org/${color}/${encode(username)}`;
	return `${sectionTitle(project, p.title, "activity")}\n\n${alignWrap(image(url, p.alt || `${username} contribution calendar`), p.align)}`;
}

function renderWakaTime(block, project) {
	const p = block.props;
	const title = p.showTitle
		? `${sectionTitle(project, p.title, "activity")}\n\n`
		: "";
	const directBadgeUrl = clean(p.badgeUrl);
	const format = p.format === "png" ? "png" : "svg";
	const userId = clean(p.userId).replace(/^@/, "");
	const id = clean(p.mode === "projectBadge" ? p.projectId : p.chartId);
	if (!directBadgeUrl && (!userId || !id))
		return `${title}_${safeText(p.emptyText || "Add your public WakaTime configuration.")}_`;
	const url =
		directBadgeUrl ||
		(p.mode === "projectBadge"
			? `https://wakatime.com/badge/user/${encode(userId)}/project/${encode(id)}.${format}`
			: `https://wakatime.com/share/@${encode(userId)}/${encode(id)}.${format}`);
	const linked = linkedImage(
		url,
		p.alt || "WakaTime coding activity",
		p.linkUrl || "https://wakatime.com/",
	);
	return `${title}${alignWrap(linked, p.align)}`;
}

function renderCodeTime(block, project) {
	const p = block.props;
	const title = p.showTitle
		? `${sectionTitle(project, p.title, "activity")}\n\n`
		: "";
	if (!clean(p.badgeUrl))
		return `${title}_${safeText(p.emptyText || "Paste your public CodeTime badge URL.")}_`;
	const linked = linkedImage(
		clean(p.badgeUrl),
		p.alt || "CodeTime coding activity",
		p.linkUrl || "https://codetime.dev/en/",
	);
	return `${title}${alignWrap(linked, p.align)}`;
}

function renderCtaButtons(block, project) {
	const p = block.props;
	const username = clean(project.profile.basics.username) || "your-username";
	const buttons = (p.buttons || [])
		.filter((button) => clean(button.label))
		.map((button) =>
			shieldsButton(
				button.label,
				button.message,
				button.color || themeOf(project).accent,
				button.logo,
				p.style,
				clean(button.link)
					.replaceAll("your-username", username)
					.replaceAll("{username}", username),
				button.alt,
			),
		);
	const title = p.showTitle
		? `${sectionTitle(project, p.title, "projects")}\n\n`
		: "";
	if (!buttons.length)
		return `${title}_${safeText(p.emptyText || "Add a custom button.")}_`;
	return `${title}${alignWrap(buttons.join("\n"), p.align)}`;
}

function renderTableOfContents(block, project) {
	const p = block.props;
	const items = (p.items || []).filter(
		(item) => clean(item.label) && clean(item.anchor),
	);
	const title = sectionTitle(project, p.title, "about");
	const anchor = (value) =>
		clean(value)
			.replace(/^#/, "")
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase()
			.replace(/[^a-z0-9 _-]/g, "")
			.trim()
			.replace(/[ _]+/g, "-");
	return `${title}\n\n${items.map((item) => `- [${safeText(item.label)}](#${anchor(item.anchor)})`).join("\n")}`;
}

function renderHighlights(block, project) {
	const p = block.props;
	const title = sectionTitle(project, p.title, "about");
	const items = (p.items || []).filter(
		(item) => clean(item.title) || clean(item.text),
	);
	if (!items.length) return title;
	const cells = items.map(
		(item) =>
			`<td width="${Math.floor(100 / items.length)}%">\n<strong>${safeText(item.icon)} ${safeText(item.title)}</strong><br/>\n${safeText(item.text)}\n</td>`,
	);
	return `${title}\n\n<table><tr>\n${cells.join("\n")}\n</tr></table>`;
}

function renderPosts(block, project) {
	const p = block.props;
	const title = sectionTitle(project, p.title, "projects");
	const items = (p.items || []).filter((item) => clean(item.title));
	if (!items.length)
		return `${title}\n\n_${safeText(p.emptyText || "Add a link you would like to put in the spotlight.")}_`;
	const cards = items.map((item) => {
		const headline = clean(item.url)
			? `[${safeText(item.title)}](${clean(item.url)})`
			: `**${safeText(item.title)}**`;
		const meta = clean(item.date) ? `<sub>${safeText(item.date)}</sub>` : "";
		return `<tr><td><strong>${headline}</strong>${meta ? `<br/>${meta}` : ""}${clean(item.description) ? `<br/>${safeText(item.description)}` : ""}</td></tr>`;
	});
	return `${title}\n\n<table>\n${cards.join("\n")}\n</table>`;
}

function socialBadge(label, value, logo, theme, style, link) {
	if (!clean(value) || !clean(link)) return "";
	return shieldsBadge(label, value, theme.accent, logo, style, link);
}

function renderSocials(block, project) {
	const { basics, links } = project.profile;
	const p = block.props;
	const theme = themeOf(project);
	const items = [];
	if (p.showEmail && clean(basics.email))
		items.push(
			shieldsBadge(
				p.emailLabel || "Email",
				p.emailMessage || "Contact",
				theme.accent,
				"gmail",
				p.style,
				`mailto:${clean(basics.email)}`,
			),
		);
	if (p.showWebsite && clean(links.website || links.portfolio))
		items.push(
			shieldsBadge(
				p.websiteLabel || "Website",
				p.websiteMessage || "Visit",
				theme.accent,
				"firefoxbrowser",
				p.style,
				clean(links.website || links.portfolio),
			),
		);
	if (clean(links.linkedin))
		items.push(
			shieldsBadge(
				"LinkedIn",
				p.linkedinMessage || "Connect",
				"0A66C2",
				"linkedin",
				p.style,
				clean(links.linkedin),
			),
		);
	if (clean(links.x))
		items.push(
			shieldsBadge(
				"X",
				p.xMessage || "Follow",
				"000000",
				"x",
				p.style,
				clean(links.x),
			),
		);
	if (clean(links.youtube))
		items.push(
			shieldsBadge(
				"YouTube",
				p.youtubeMessage || "Subscribe",
				"FF0000",
				"youtube",
				p.style,
				clean(links.youtube),
			),
		);
	if (clean(links.devto))
		items.push(
			shieldsBadge(
				"DEV.to",
				p.devtoMessage || "Read",
				"0A0A0A",
				"devdotto",
				p.style,
				clean(links.devto),
			),
		);
	if (clean(links.medium))
		items.push(
			shieldsBadge(
				"Medium",
				p.mediumMessage || "Read",
				"000000",
				"medium",
				p.style,
				clean(links.medium),
			),
		);
	for (const link of links.custom || []) {
		if (!clean(link.label) || !clean(link.url)) continue;
		items.push(
			shieldsBadge(
				link.label,
				link.message || p.customMessage || "Visit",
				link.color || theme.accent,
				link.logo || "",
				p.style,
				clean(link.url),
			),
		);
	}
	return `${sectionTitle(project, p.title, "socials")}\n\n${alignWrap(items.join("\n"), p.align)}`;
}

function renderSupport(block, project) {
	const p = block.props;
	const support = project.profile.support;
	const buttons = [];
	if (clean(support.coffeeUrl))
		buttons.push(
			shieldsBadge(
				p.coffeeLabel || "Support",
				p.coffeeMessage || "Buy me a coffee",
				"FFDD00",
				"buymeacoffee",
				"for-the-badge",
				clean(support.coffeeUrl),
			),
		);
	const empty = buttons.length
		? ""
		: `\n\n_${safeText(p.emptyText || "Add a support URL to display the badge.")}_`;
	return `${sectionTitle(project, p.title, "support")}\n\n${clean(p.description)}\n\n${alignWrap(buttons.join("\n"), p.align)}${empty}`;
}

function renderQuote(block) {
	const author = clean(block.props.author)
		? `\n> - ${safeText(block.props.author)}`
		: "";
	return `> ${safeText(block.props.text)}${author}`;
}

function renderDivider() {
	return "---";
}

function renderSpacer(block) {
	return Array.from(
		{ length: Math.max(1, Number(block.props.size) || 1) },
		() => "<br />",
	).join("\n");
}

function renderFooter(block) {
	const date = block.props.showLastUpdated
		? ` · ${safeText(block.props.updatedLabel || "Last updated")} ${new Date().toISOString().slice(0, 10)}`
		: "";
	return alignWrap(
		`<sub>${safeText(block.props.text)}${date}</sub>`,
		block.props.align,
	);
}

const renderers = {
	hero: renderHero,
	capsule: renderCapsule,
	typing: renderTyping,
	quickBadges: renderQuickBadges,
	about: renderAbout,
	techStack: renderTechStack,
	projects: renderProjects,
	work: renderWork,
	githubStatsExtended: renderGithubStatsExtended,
	topLanguagesExtended: renderTopLanguagesExtended,
	streak: renderStreak,
	viewCounter: renderViewCounter,
	statsExtendedWakatime: renderStatsExtendedWakatime,
	statsExtendedRepo: renderStatsExtendedRepo,
	statsExtendedGist: renderStatsExtendedGist,
	activityGraph: renderActivityGraph,
	pinnedRepositories: renderPinnedRepositories,
	metrics: renderMetrics,
	licenses: renderLicenses,
	pullRequests: renderPullRequests,
	contributionCalendar: renderContributionCalendar,
	wakatime: renderWakaTime,
	codetime: renderCodeTime,
	ctaButtons: renderCtaButtons,
	tableOfContents: renderTableOfContents,
	highlights: renderHighlights,
	posts: renderPosts,
	socials: renderSocials,
	support: renderSupport,
	quote: renderQuote,
	customMarkdown: (block) => block.props.content || "",
	divider: renderDivider,
	spacer: renderSpacer,
	footer: renderFooter,
};

function cacheBusted(markdown, cacheBust) {
	if (!cacheBust) return markdown;
	return markdown.replace(
		/(<img\s+src=")(https?:\/\/[^"\s]+)(")/g,
		(_, prefix, url, suffix) =>
			`${prefix}${url}${url.includes("?") ? "&" : "?"}_readme_studio=${encode(cacheBust)}${suffix}`,
	);
}

export function renderMarkdown(project, { cacheBust } = {}) {
	const sections = (project.blocks || [])
		.filter((block) => block.visible !== false && renderers[block.type])
		.map((block) => renderers[block.type](block, project))
		.map(clean)
		.filter(Boolean);
	return cacheBusted(`${sections.join("\n\n")}\n`, cacheBust);
}
