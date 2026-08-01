const uid = () =>
	`${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const themes = [
	{
		id: "github-dark",
		name: "GitHub Dark",
		mode: "dark",
		accent: "58a6ff",
		accentAlt: "3fb950",
		background: "0d1117",
		surface: "161b22",
		text: "f0f6fc",
		muted: "8b949e",
		border: "30363d",
	},
	{
		id: "github-light",
		name: "GitHub Light",
		mode: "light",
		accent: "0969da",
		accentAlt: "1a7f37",
		background: "ffffff",
		surface: "f6f8fa",
		text: "1f2328",
		muted: "656d76",
		border: "d0d7de",
	},
	{
		id: "ruby",
		name: "Ruby",
		mode: "dark",
		accent: "ef4444",
		accentAlt: "facc15",
		background: "0d1117",
		surface: "18181b",
		text: "fafafa",
		muted: "a1a1aa",
		border: "3f3f46",
	},
	{
		id: "violet",
		name: "Violet",
		mode: "dark",
		accent: "a78bfa",
		accentAlt: "22d3ee",
		background: "0b0b14",
		surface: "151525",
		text: "f5f3ff",
		muted: "a1a1aa",
		border: "34344a",
	},
	{
		id: "forest",
		name: "Forest",
		mode: "dark",
		accent: "3fb950",
		accentAlt: "2f81f7",
		background: "0b1410",
		surface: "111d17",
		text: "f0fdf4",
		muted: "86a892",
		border: "24422f",
	},
	{
		id: "solar",
		name: "Solar",
		mode: "light",
		accent: "b45309",
		accentAlt: "0369a1",
		background: "fffdf5",
		surface: "fff7d6",
		text: "292524",
		muted: "78716c",
		border: "e7d9ac",
	},
];

export const customThemeFallback = {
	id: "custom",
	name: "Custom theme",
	mode: "dark",
	accent: "58a6ff",
	accentAlt: "3fb950",
	background: "0d1117",
	surface: "161b22",
	text: "f0f6fc",
	muted: "8b949e",
	border: "30363d",
};

export function resolveTheme(projectOrId) {
	if (typeof projectOrId === "object" && projectOrId?.themeId === "custom") {
		return {
			...customThemeFallback,
			...(projectOrId.customTheme || {}),
			id: "custom",
		};
	}
	const id =
		typeof projectOrId === "string" ? projectOrId : projectOrId?.themeId;
	return themes.find((theme) => theme.id === id) || themes[0];
}

export const defaultProfile = {
	interfaceLanguage: "en",
	outputLanguage: "en",
	basics: {
		name: "",
		username: "",
		headline: "",
		bio: "",
		location: "",
		email: "",
		avatarUrl: "",
	},
	work: {
		role: "",
		company: "",
		companyUrl: "",
		availability: "",
	},
	links: {
		website: "",
		portfolio: "",
		linkedin: "",
		x: "",
		youtube: "",
		devto: "",
		medium: "",
		discord: "",
		custom: [],
	},
	skills: [],
	projects: [],
	experiences: [],
	support: {
		coffeeUrl: "",
	},
};

export const componentDefinitions = {
	hero: {
		label: { en: "Hero", fr: "En-tête" },
		description: {
			en: "Name, headline, avatar and typing line.",
			fr: "Nom, titre, avatar et ligne animée.",
		},
		defaults: {
			align: "center",
			showAvatar: true,
			avatarSize: 120,
			showTyping: false,
			typingLines: ["Full-stack developer", "Open-source enthusiast"],
			greeting: "Hi, I’m",
			emoji: "👋",
		},
	},
	capsule: {
		label: {
			en: "Capsule banner",
			fr: "Bannière Capsule",
			es: "Banner Capsule",
		},
		description: {
			en: "A fully configurable Capsule Render header or footer.",
			fr: "Un en-tête ou pied de page Capsule Render entièrement configurable.",
			es: "Un encabezado o pie de página Capsule Render totalmente configurable.",
		},
		defaults: {
			section: "header",
			type: "waving",
			height: 220,
			colorStart: "0d1117",
			colorMiddle: "7f1d1d",
			colorEnd: "ef4444",
			middleStop: 45,
			showText: true,
			text: "",
			textSize: 42,
			textColor: "ffffff",
			textY: 35,
			description: "",
			descriptionSize: 18,
			descriptionY: 58,
			animation: "fadeIn",
			align: "center",
			alt: "Profile banner",
		},
	},
	typing: {
		label: {
			en: "Typing introduction",
			fr: "Introduction animée",
			es: "Introducción animada",
		},
		description: {
			en: "An independent, configurable readme-typing-svg card.",
			fr: "Une carte readme-typing-svg indépendante et configurable.",
			es: "Una tarjeta readme-typing-svg independiente y configurable.",
		},
		defaults: {
			lines: ["Full-stack developer", "Open-source enthusiast"],
			font: "JetBrains Mono",
			weight: 500,
			size: 21,
			pause: 1200,
			color: "ef4444",
			width: 850,
			centerText: true,
			verticalCenter: true,
			align: "center",
			alt: "Animated introduction",
			emptyText: "Add at least one typing line.",
		},
	},
	quickBadges: {
		label: { en: "Quick badges", fr: "Badges rapides" },
		description: {
			en: "Followers, profile views and public activity badges.",
			fr: "Abonnés, vues du profil et badges d’activité publics.",
		},
		defaults: {
			align: "center",
			followers: true,
			profileViews: true,
			stars: false,
			showCodeTime: true,
			showWakaTime: true,
			style: "for-the-badge",
			followersLabel: "Followers",
			viewsLabel: "Profile views",
			starsLabel: "Stars",
			codeTimeBadgeUrl: "",
			codeTimeLink: "https://codetime.dev/en/",
			codeTimeAlt: "CodeTime coding activity",
			wakatimeBadgeUrl: "",
			wakatimeLink: "https://wakatime.com/",
			wakatimeAlt: "WakaTime coding activity",
			customBadges: [],
		},
	},
	about: {
		label: { en: "About me", fr: "À propos" },
		description: {
			en: "Bio, role, company and current focus.",
			fr: "Présentation, poste, entreprise et objectif actuel.",
		},
		defaults: {
			title: "About me",
			layout: "bullets",
			showLocation: true,
			showWork: true,
			showAvailability: true,
			currentFocus: "",
			learning: "",
			askMeAbout: "",
			workLabel: "Working as",
			locationLabel: "Based in",
			focusLabel: "Current focus",
			learningLabel: "Learning",
			askLabel: "Ask me about",
			availabilityLabel: "Availability",
			customSections: [],
			emptyText: "Tell visitors a little about yourself.",
		},
	},
	techStack: {
		label: { en: "Tech stack", fr: "Stack technique" },
		description: {
			en: "Technology icons grouped by category.",
			fr: "Icônes technologiques regroupées par catégorie.",
		},
		defaults: {
			title: "Tech stack",
			display: "icons",
			iconSize: 42,
			grouped: true,
			showNames: false,
			maxPerRow: 12,
			emptyText: "No technologies selected yet.",
		},
	},
	projects: {
		label: { en: "Featured projects", fr: "Projets principaux" },
		description: {
			en: "Responsive project cards generated with GitHub-safe HTML.",
			fr: "Cartes de projets responsives en HTML compatible GitHub.",
		},
		defaults: {
			title: "Featured projects",
			columns: 2,
			showTechnologies: true,
			showRepository: true,
			showLiveUrl: true,
			showImage: true,
			showLogo: true,
			repositoryLabel: "Repository",
			liveLabel: "Live demo",
			emptyText: "No projects added yet.",
		},
	},
	work: {
		label: { en: "Experience", fr: "Expérience" },
		description: {
			en: "Current role and professional timeline.",
			fr: "Poste actuel et parcours professionnel.",
		},
		defaults: {
			title: "Experience",
			style: "list",
			showCurrent: true,
			emptyText: "No experience added yet.",
		},
	},
	githubStatsExtended: {
		label: {
			en: "GitHub Stats",
			fr: "GitHub Stats",
			es: "GitHub Stats",
		},
		description: {
			en: "Contribution statistics from GitHub Stats.",
			fr: "Statistiques de contributions avec GitHub Stats.",
			es: "Estadísticas de contribuciones de GitHub Stats.",
		},
		defaults: {
			title: "GitHub statistics",
			showIcons: true,
			includeAllCommits: true,
			privateCount: false,
			hideBorder: true,
			rankIcon: "github",
			baseUrl: "https://github-stats-extended.vercel.app/api",
			options: [],
			align: "center",
		},
	},
	topLanguagesExtended: {
		label: {
			en: "Top languages Extended",
			fr: "Langages principaux Extended",
			es: "Lenguajes principales Extended",
		},
		description: {
			en: "Repository language breakdown from GitHub Stats.",
			fr: "Répartition des langages par GitHub Stats.",
			es: "Distribución de lenguajes de GitHub Stats.",
		},
		defaults: {
			title: "Most used languages",
			layout: "compact",
			count: 10,
			hideBorder: true,
			excludeRepos: "",
			baseUrl: "https://github-stats-extended.vercel.app/api/top-langs",
			options: [],
			note: true,
			noteText:
				"This card reflects code found in public repositories and is not an absolute measure of proficiency.",
			align: "center",
		},
	},
	streak: {
		label: { en: "Contribution streak", fr: "Série de contributions" },
		description: {
			en: "Current and longest contribution streak.",
			fr: "Série actuelle et meilleure série de contributions.",
		},
		defaults: {
			title: "Contribution streak",
			hideBorder: true,
			theme: "github-dark-blue",
			locale: "en",
			mode: "daily",
			dateFormat: "Y",
			cardWidth: 0,
			borderRadius: 5,
			baseUrl: "https://streak-stats.demolab.com",
			options: [],
			hideTotal: false,
			excludeDaysLabels: false,
			align: "center",
		},
	},
	viewCounter: {
		label: {
			en: "Profile view counter",
			fr: "Compteur de vues",
			es: "Contador de visitas",
		},
		description: {
			en: "A configurable Komarev profile view badge.",
			fr: "Un badge de vues Komarev configurable.",
			es: "Un badge de visitas Komarev configurable.",
		},
		defaults: {
			title: "Profile views",
			showTitle: false,
			username: "alexistb2904",
			color: "red",
			baseUrl: "https://komarev.com/ghpvc/",
			counterUrl: "",
			alt: "Profile views",
			align: "center",
			emptyText: "Add a profile username or a custom counter URL.",
		},
	},
	statsExtendedWakatime: {
		label: {
			en: "WakaTime Extended",
			fr: "WakaTime Extended",
			es: "WakaTime Extended",
		},
		description: {
			en: "Development-time card from GitHub Stats.",
			fr: "Carte de temps de développement GitHub Stats.",
			es: "Tarjeta de tiempo de desarrollo GitHub Stats.",
		},
		defaults: {
			title: "WakaTime statistics",
			username: "",
			baseUrl: "https://github-stats-extended.vercel.app/api/wakatime",
			options: [],
			align: "center",
		},
	},
	statsExtendedRepo: {
		label: {
			en: "Repository card Extended",
			fr: "Carte dépôt Extended",
			es: "Tarjeta de repositorio Extended",
		},
		description: {
			en: "A pin card for any GitHub repository.",
			fr: "Une carte épingle pour tout dépôt GitHub.",
			es: "Una tarjeta fijada para cualquier repositorio de GitHub.",
		},
		defaults: {
			title: "Repository",
			repo: "",
			baseUrl: "https://github-stats-extended.vercel.app/api/pin",
			options: [],
			align: "center",
			emptyText: "Add an owner/repository slug.",
		},
	},
	statsExtendedGist: {
		label: {
			en: "Gist card Extended",
			fr: "Carte Gist Extended",
			es: "Tarjeta Gist Extended",
		},
		description: {
			en: "A GitHub Gist pin card.",
			fr: "Une carte épingle GitHub Gist.",
			es: "Una tarjeta fijada de GitHub Gist.",
		},
		defaults: {
			title: "Gist",
			gistId: "",
			gistUrl: "",
			baseUrl: "https://github-stats-extended.vercel.app/api/gist",
			options: [],
			align: "center",
			emptyText: "Add a GitHub Gist ID.",
		},
	},
	activityGraph: {
		label: { en: "Activity graph", fr: "Graphique d’activité" },
		description: {
			en: "Recent GitHub contribution activity.",
			fr: "Activité récente des contributions GitHub.",
		},
		defaults: {
			title: "Recent activity",
			area: true,
			hideBorder: true,
			hideTitle: false,
			theme: "",
			radius: 5,
			customTitle: "",
			align: "center",
		},
	},
	pinnedRepositories: {
		label: { en: "Repository cards", fr: "Cartes de dépôts" },
		description: {
			en: "Highlight selected GitHub repositories.",
			fr: "Mettre en avant des dépôts GitHub.",
		},
		defaults: {
			title: "Selected repositories",
			repositories: [],
			columns: 2,
			emptyText: "Add repository names from the inspector.",
			align: "center",
		},
	},
	metrics: {
		label: { en: "Metrics spotlight", fr: "Focus Metrics", es: "Foco Metrics" },
		description: {
			en: "A configurable Metrics infographic from lowlighter.",
			fr: "Une infographie Metrics configurable de lowlighter.",
			es: "Una infografía Metrics configurable de lowlighter.",
		},
		defaults: {
			title: "GitHub metrics",
			template: "classic",
			base: "header, activity, community, repositories, metadata",
			showCalendar: true,
			showLanguages: true,
			showAchievements: false,
			showHabits: false,
			options: [],
			align: "center",
		},
	},
	licenses: {
		label: {
			en: "License statistics",
			fr: "Statistiques de licences",
			es: "Estadísticas de licencias",
		},
		description: {
			en: "Most-used licenses across public repositories.",
			fr: "Licences les plus utilisées dans les dépôts publics.",
			es: "Licencias más usadas en los repositorios públicos.",
		},
		defaults: {
			title: "Open-source licenses",
			count: 6,
			theme: "dark",
			showLegend: true,
			align: "center",
		},
	},
	pullRequests: {
		label: {
			en: "Pull request statistics",
			fr: "Statistiques de pull requests",
			es: "Estadísticas de pull requests",
		},
		description: {
			en: "Repository or contribution pull-request cards.",
			fr: "Cartes de pull requests par dépôt ou contribution.",
			es: "Tarjetas de pull requests por repositorio o contribución.",
		},
		defaults: {
			title: "Pull request activity",
			mode: "user-aggregate",
			limit: 8,
			theme: "default",
			status: "all",
			minStars: 0,
			align: "center",
		},
	},
	contributionCalendar: {
		label: {
			en: "Contribution calendar",
			fr: "Calendrier de contributions",
			es: "Calendario de contribuciones",
		},
		description: {
			en: "A full-year public contribution heatmap.",
			fr: "Une carte de chaleur annuelle des contributions publiques.",
			es: "Un mapa de calor anual de contribuciones públicas.",
		},
		defaults: {
			title: "Contribution calendar",
			color: "58a6ff",
			alt: "GitHub contribution calendar",
			align: "center",
		},
	},
	wakatime: {
		label: { en: "WakaTime", fr: "WakaTime", es: "WakaTime" },
		description: {
			en: "Embed a public WakaTime shared chart or project badge.",
			fr: "Intégrez un graphique partagé ou badge de projet WakaTime public.",
			es: "Inserta un gráfico compartido o badge de proyecto público de WakaTime.",
		},
		defaults: {
			title: "Coding activity",
			showTitle: true,
			mode: "share",
			badgeUrl: "",
			userId: "",
			chartId: "",
			projectId: "",
			format: "svg",
			linkUrl: "",
			align: "center",
			alt: "WakaTime coding activity",
			emptyText: "Add your public WakaTime user and chart or project ID.",
		},
	},
	codetime: {
		label: { en: "CodeTime", fr: "CodeTime", es: "CodeTime" },
		description: {
			en: "Embed your public CodeTime badge URL without locking you to a stale endpoint.",
			fr: "Intégrez l’URL de votre badge CodeTime public sans dépendre d’un endpoint obsolète.",
			es: "Inserta la URL de tu badge público CodeTime sin depender de un endpoint obsoleto.",
		},
		defaults: {
			title: "CodeTime activity",
			showTitle: true,
			badgeUrl: "",
			linkUrl: "https://codetime.dev/en/",
			align: "center",
			alt: "CodeTime coding activity",
			emptyText: "Paste your public CodeTime badge URL.",
		},
	},
	ctaButtons: {
		label: {
			en: "Custom buttons",
			fr: "Boutons personnalisés",
			es: "Botones personalizados",
		},
		description: {
			en: "Create Shields.io call-to-action buttons and position them freely.",
			fr: "Créez des boutons d’action Shields.io et positionnez-les librement.",
			es: "Crea botones de acción de Shields.io y colócalos libremente.",
		},
		defaults: {
			title: "",
			showTitle: false,
			style: "for-the-badge",
			align: "center",
			buttons: [
				{
					label: "VIEW ALL MY PROJECTS",
					message: "",
					color: "ef4444",
					logo: "github",
					link: "https://github.com/your-username?tab=repositories",
					alt: "View all my projects",
				},
			],
			emptyText: "Add a custom button.",
		},
	},
	tableOfContents: {
		label: {
			en: "Table of contents",
			fr: "Sommaire",
			es: "Tabla de contenidos",
		},
		description: {
			en: "Editable anchor links for a long profile README.",
			fr: "Liens d’ancrage modifiables pour un long README de profil.",
			es: "Enlaces editables para un README de perfil extenso.",
		},
		defaults: {
			title: "Contents",
			items: [
				{ label: "About", anchor: "about" },
				{ label: "Tech stack", anchor: "tech-stack" },
				{ label: "Projects", anchor: "featured-projects" },
			],
		},
	},
	highlights: {
		label: { en: "Highlights", fr: "À la une", es: "Destacados" },
		description: {
			en: "Three editable highlights for achievements, values or interests.",
			fr: "Trois points forts modifiables pour vos réalisations, valeurs ou centres d’intérêt.",
			es: "Tres destacados editables para logros, valores o intereses.",
		},
		defaults: {
			title: "A few highlights",
			items: [
				{
					title: "Open source",
					text: "I enjoy making useful work easier to share.",
					icon: "✦",
				},
				{
					title: "Product minded",
					text: "I care about the details people actually use.",
					icon: "◎",
				},
				{
					title: "Always learning",
					text: "I keep a curiosity list close by.",
					icon: "↗",
				},
			],
		},
	},
	posts: {
		label: {
			en: "Selected links",
			fr: "Liens sélectionnés",
			es: "Enlaces seleccionados",
		},
		description: {
			en: "A hand-picked reading, writing or project list.",
			fr: "Une liste choisie d’articles, de contenus ou de projets.",
			es: "Una lista seleccionada de lecturas, escritos o proyectos.",
		},
		defaults: {
			title: "Selected links",
			emptyText: "Add a link you would like to put in the spotlight.",
			items: [],
		},
	},
	socials: {
		label: { en: "Contact & socials", fr: "Contact et réseaux" },
		description: {
			en: "Contact buttons and social links.",
			fr: "Boutons de contact et liens sociaux.",
		},
		defaults: {
			title: "Let’s connect",
			align: "center",
			style: "for-the-badge",
			showEmail: true,
			showWebsite: true,
			emailLabel: "Email",
			emailMessage: "Contact",
			websiteLabel: "Website",
			websiteMessage: "Visit",
			linkedinMessage: "Connect",
			xMessage: "Follow",
			youtubeMessage: "Subscribe",
			devtoMessage: "Read",
			mediumMessage: "Read",
		},
	},
	support: {
		label: { en: "Support links", fr: "Liens de soutien" },
		description: {
			en: "A visible Buy Me a Coffee support badge.",
			fr: "Un badge de soutien Buy Me a Coffee visible.",
		},
		defaults: {
			title: "Support the project",
			description: "Enjoy the project? You can support it here.",
			align: "center",
			coffeeLabel: "Support",
			coffeeMessage: "Buy me a coffee",
			emptyText: "Add a Buy Me a Coffee URL in Settings to display the badge.",
		},
	},
	quote: {
		label: { en: "Quote", fr: "Citation" },
		description: {
			en: "A highlighted quote or personal principle.",
			fr: "Une citation ou un principe personnel.",
		},
		defaults: {
			text: "Build things that make a difference.",
			author: "",
		},
	},
	customMarkdown: {
		label: { en: "Custom Markdown", fr: "Markdown personnalisé" },
		description: {
			en: "Write any GitHub-flavored Markdown.",
			fr: "Écrire librement en Markdown GitHub.",
		},
		defaults: {
			content: "## Custom section\n\nAdd any GitHub-flavored Markdown here.",
		},
	},
	divider: {
		label: { en: "Divider", fr: "Séparateur" },
		description: {
			en: "Separate sections with a horizontal rule.",
			fr: "Séparer les sections avec une ligne horizontale.",
		},
		defaults: {
			spacing: "normal",
		},
	},
	spacer: {
		label: { en: "Spacer", fr: "Espacement" },
		description: {
			en: "Add vertical breathing room.",
			fr: "Ajouter un espace vertical.",
		},
		defaults: {
			size: 2,
		},
	},
	footer: {
		label: { en: "Footer", fr: "Pied de page" },
		description: {
			en: "A compact closing message.",
			fr: "Un message de fin compact.",
		},
		defaults: {
			align: "center",
			text: "Thanks for visiting my profile.",
			showLastUpdated: false,
			updatedLabel: "Last updated",
		},
	},
};

// Every phrase emitted by a block lives in its props. These presets only give
// authors a useful starting point; they can be applied again from the inspector.
export const componentTextPresets = {
	hero: {
		en: {
			greeting: "Hi, I’m",
			emoji: "👋",
			typingLines: ["Full-stack developer", "Open-source enthusiast"],
		},
		fr: {
			greeting: "Bonjour, je suis",
			emoji: "👋",
			typingLines: ["Développeur full-stack", "Passionné d’open source"],
		},
		es: {
			greeting: "Hola, soy",
			emoji: "👋",
			typingLines: [
				"Desarrollador full-stack",
				"Entusiasta del código abierto",
			],
		},
	},
	capsule: {
		en: { text: "", description: "", alt: "Profile banner" },
		fr: { text: "", description: "", alt: "Bannière de profil" },
		es: { text: "", description: "", alt: "Banner de perfil" },
	},
	typing: {
		en: {
			lines: ["Full-stack developer", "Open-source enthusiast"],
			alt: "Animated introduction",
			emptyText: "Add at least one typing line.",
		},
		fr: {
			lines: ["Développeur full-stack", "Passionné d’open source"],
			alt: "Introduction animée",
			emptyText: "Ajoutez au moins une ligne animée.",
		},
		es: {
			lines: ["Desarrollador full-stack", "Entusiasta del código abierto"],
			alt: "Introducción animada",
			emptyText: "Añade al menos una línea animada.",
		},
	},
	quickBadges: {
		en: {
			followersLabel: "Followers",
			viewsLabel: "Profile views",
			starsLabel: "Stars",
		},
		fr: {
			followersLabel: "Abonnés",
			viewsLabel: "Vues du profil",
			starsLabel: "Étoiles",
		},
		es: {
			followersLabel: "Seguidores",
			viewsLabel: "Vistas del perfil",
			starsLabel: "Estrellas",
		},
	},
	about: {
		en: {
			title: "About me",
			workLabel: "Working as",
			locationLabel: "Based in",
			focusLabel: "Current focus",
			learningLabel: "Learning",
			askLabel: "Ask me about",
			availabilityLabel: "Availability",
			emptyText: "Tell visitors a little about yourself.",
		},
		fr: {
			title: "À propos de moi",
			workLabel: "Poste",
			locationLabel: "Basé à",
			focusLabel: "Focus actuel",
			learningLabel: "En apprentissage",
			askLabel: "Parlons de",
			availabilityLabel: "Disponibilité",
			emptyText: "Présentez-vous en quelques mots à vos visiteurs.",
		},
		es: {
			title: "Sobre mí",
			workLabel: "Trabajo como",
			locationLabel: "Ubicación",
			focusLabel: "En qué estoy trabajando",
			learningLabel: "Aprendiendo",
			askLabel: "Pregúntame sobre",
			availabilityLabel: "Disponibilidad",
			emptyText: "Cuéntales a tus visitantes un poco sobre ti.",
		},
	},
	techStack: {
		en: { title: "Tech stack", emptyText: "No technologies selected yet." },
		fr: {
			title: "Stack technique",
			emptyText: "Aucune technologie sélectionnée pour le moment.",
		},
		es: {
			title: "Stack tecnológico",
			emptyText: "Aún no se ha seleccionado ninguna tecnología.",
		},
	},
	projects: {
		en: {
			title: "Featured projects",
			repositoryLabel: "Repository",
			liveLabel: "Live demo",
			emptyText: "No projects added yet.",
		},
		fr: {
			title: "Projets à la une",
			repositoryLabel: "Dépôt",
			liveLabel: "Voir le projet",
			emptyText: "Aucun projet ajouté pour le moment.",
		},
		es: {
			title: "Proyectos destacados",
			repositoryLabel: "Repositorio",
			liveLabel: "Ver proyecto",
			emptyText: "Aún no se ha añadido ningún proyecto.",
		},
	},
	work: {
		en: { title: "Experience", emptyText: "No experience added yet." },
		fr: {
			title: "Expérience",
			emptyText: "Aucune expérience ajoutée pour le moment.",
		},
		es: {
			title: "Experiencia",
			emptyText: "Aún no se ha añadido experiencia.",
		},
	},
	githubStatsExtended: {
		en: { title: "GitHub statistics" },
		fr: { title: "Statistiques GitHub" },
		es: { title: "Estadísticas de GitHub" },
	},
	topLanguagesExtended: {
		en: {
			title: "Most used languages",
			noteText:
				"This card reflects code found in public repositories and is not an absolute measure of proficiency.",
		},
		fr: {
			title: "Langages les plus utilisés",
			noteText:
				"Cette carte reflète le code des dépôts publics et ne mesure pas de façon absolue les compétences.",
		},
		es: {
			title: "Lenguajes más usados",
			noteText:
				"Esta tarjeta refleja el código de repositorios públicos y no mide de forma absoluta las habilidades.",
		},
	},
	streak: {
		en: { title: "Contribution streak" },
		fr: { title: "Série de contributions" },
		es: { title: "Racha de contribuciones" },
	},
	activityGraph: {
		en: { title: "Recent activity" },
		fr: { title: "Activité récente" },
		es: { title: "Actividad reciente" },
	},
	pinnedRepositories: {
		en: {
			title: "Selected repositories",
			emptyText: "Add repository names from the inspector.",
		},
		fr: {
			title: "Dépôts sélectionnés",
			emptyText: "Ajoutez les noms des dépôts dans l’inspecteur.",
		},
		es: {
			title: "Repositorios seleccionados",
			emptyText: "Añade los nombres de repositorios desde el inspector.",
		},
	},
	statsExtendedWakatime: {
		en: { title: "WakaTime statistics" },
		fr: { title: "Statistiques WakaTime" },
		es: { title: "Estadísticas WakaTime" },
	},
	statsExtendedRepo: {
		en: { title: "Repository" },
		fr: { title: "Dépôt" },
		es: { title: "Repositorio" },
	},
	statsExtendedGist: {
		en: { title: "Gist" },
		fr: { title: "Gist" },
		es: { title: "Gist" },
	},
	metrics: {
		en: { title: "GitHub metrics" },
		fr: { title: "Métriques GitHub" },
		es: { title: "Métricas de GitHub" },
	},
	licenses: {
		en: { title: "Open-source licenses" },
		fr: { title: "Licences open source" },
		es: { title: "Licencias open source" },
	},
	pullRequests: {
		en: { title: "Pull request activity" },
		fr: { title: "Activité des pull requests" },
		es: { title: "Actividad de pull requests" },
	},
	contributionCalendar: {
		en: { title: "Contribution calendar", alt: "GitHub contribution calendar" },
		fr: {
			title: "Calendrier de contributions",
			alt: "Calendrier des contributions GitHub",
		},
		es: {
			title: "Calendario de contribuciones",
			alt: "Calendario de contribuciones de GitHub",
		},
	},
	wakatime: {
		en: {
			title: "Coding activity",
			alt: "WakaTime coding activity",
			emptyText: "Add your public WakaTime user and chart or project ID.",
		},
		fr: {
			title: "Activité de code",
			alt: "Activité de code WakaTime",
			emptyText:
				"Ajoutez votre identifiant public WakaTime et l’identifiant du graphique ou projet.",
		},
		es: {
			title: "Actividad de código",
			alt: "Actividad de código de WakaTime",
			emptyText:
				"Añade tu usuario público de WakaTime y el ID del gráfico o proyecto.",
		},
	},
	codetime: {
		en: {
			title: "CodeTime activity",
			alt: "CodeTime coding activity",
			emptyText: "Paste your public CodeTime badge URL.",
		},
		fr: {
			title: "Activité CodeTime",
			alt: "Activité de code CodeTime",
			emptyText: "Collez l’URL de votre badge CodeTime public.",
		},
		es: {
			title: "Actividad de CodeTime",
			alt: "Actividad de código de CodeTime",
			emptyText: "Pega la URL de tu badge público de CodeTime.",
		},
	},
	ctaButtons: {
		en: {
			title: "",
			emptyText: "Add a custom button.",
			buttons: [
				{
					label: "VIEW ALL MY PROJECTS",
					message: "",
					color: "ef4444",
					logo: "github",
					link: "https://github.com/your-username?tab=repositories",
					alt: "View all my projects",
				},
			],
		},
		fr: {
			title: "",
			emptyText: "Ajoutez un bouton personnalisé.",
			buttons: [
				{
					label: "VOIR TOUS MES PROJETS",
					message: "",
					color: "ef4444",
					logo: "github",
					link: "https://github.com/your-username?tab=repositories",
					alt: "Voir tous mes projets",
				},
			],
		},
		es: {
			title: "",
			emptyText: "Añade un botón personalizado.",
			buttons: [
				{
					label: "VER TODOS MIS PROYECTOS",
					message: "",
					color: "ef4444",
					logo: "github",
					link: "https://github.com/your-username?tab=repositories",
					alt: "Ver todos mis proyectos",
				},
			],
		},
	},
	tableOfContents: {
		en: {
			title: "Contents",
			items: [
				{ label: "About", anchor: "about" },
				{ label: "Tech stack", anchor: "tech-stack" },
				{ label: "Projects", anchor: "featured-projects" },
			],
		},
		fr: {
			title: "Sommaire",
			items: [
				{ label: "À propos", anchor: "à-propos-de-moi" },
				{ label: "Stack technique", anchor: "stack-technique" },
				{ label: "Projets", anchor: "projets-à-la-une" },
			],
		},
		es: {
			title: "Contenido",
			items: [
				{ label: "Sobre mí", anchor: "sobre-mí" },
				{ label: "Stack tecnológico", anchor: "stack-tecnológico" },
				{ label: "Proyectos", anchor: "proyectos-destacados" },
			],
		},
	},
	highlights: {
		en: {
			title: "A few highlights",
			items: [
				{
					title: "Open source",
					text: "I enjoy making useful work easier to share.",
					icon: "✦",
				},
				{
					title: "Product minded",
					text: "I care about the details people actually use.",
					icon: "◎",
				},
				{
					title: "Always learning",
					text: "I keep a curiosity list close by.",
					icon: "↗",
				},
			],
		},
		fr: {
			title: "Quelques repères",
			items: [
				{
					title: "Open source",
					text: "J’aime rendre les projets utiles plus faciles à partager.",
					icon: "✦",
				},
				{
					title: "Produit",
					text: "Je soigne les détails que les personnes utilisent vraiment.",
					icon: "◎",
				},
				{
					title: "Curiosité",
					text: "Je garde toujours une liste de choses à apprendre.",
					icon: "↗",
				},
			],
		},
		es: {
			title: "Algunos destacados",
			items: [
				{
					title: "Código abierto",
					text: "Me gusta hacer que el trabajo útil sea más fácil de compartir.",
					icon: "✦",
				},
				{
					title: "Mentalidad de producto",
					text: "Me importan los detalles que la gente utiliza de verdad.",
					icon: "◎",
				},
				{
					title: "Siempre aprendiendo",
					text: "Mantengo cerca una lista de curiosidades.",
					icon: "↗",
				},
			],
		},
	},
	posts: {
		en: {
			title: "Selected links",
			emptyText: "Add a link you would like to put in the spotlight.",
		},
		fr: {
			title: "Liens sélectionnés",
			emptyText: "Ajoutez un lien que vous souhaitez mettre en avant.",
		},
		es: {
			title: "Enlaces seleccionados",
			emptyText: "Añade un enlace que quieras destacar.",
		},
	},
	socials: {
		en: {
			title: "Let’s connect",
			emailLabel: "Email",
			emailMessage: "Contact",
			websiteLabel: "Website",
			websiteMessage: "Visit",
			linkedinMessage: "Connect",
			xMessage: "Follow",
			youtubeMessage: "Subscribe",
			devtoMessage: "Read",
			mediumMessage: "Read",
		},
		fr: {
			title: "Restons en contact",
			emailLabel: "E-mail",
			emailMessage: "Contacter",
			websiteLabel: "Site",
			websiteMessage: "Visiter",
			linkedinMessage: "Se connecter",
			xMessage: "Suivre",
			youtubeMessage: "S’abonner",
			devtoMessage: "Lire",
			mediumMessage: "Lire",
		},
		es: {
			title: "Conectemos",
			emailLabel: "Correo",
			emailMessage: "Contactar",
			websiteLabel: "Web",
			websiteMessage: "Visitar",
			linkedinMessage: "Conectar",
			xMessage: "Seguir",
			youtubeMessage: "Suscribirse",
			devtoMessage: "Leer",
			mediumMessage: "Leer",
		},
	},
	support: {
		en: {
			title: "Support the project",
			description: "Enjoy the project? Your support helps.",
			coffeeLabel: "Support",
			coffeeMessage: "Buy me a coffee",
			emptyText: "Add a Buy Me a Coffee URL in Settings to display the badge.",
		},
		fr: {
			title: "Soutenir le projet",
			description: "Le projet vous plaît ? Votre soutien aide beaucoup.",
			coffeeLabel: "Soutien",
			coffeeMessage: "Offrir un café",
			emptyText:
				"Ajoutez une URL Buy Me a Coffee dans les réglages pour afficher le badge.",
		},
		es: {
			title: "Apoya el proyecto",
			description: "¿Te gusta el proyecto? Tu apoyo ayuda mucho.",
			coffeeLabel: "Apoyar",
			coffeeMessage: "Invítame a un café",
			emptyText:
				"Añade una URL de Buy Me a Coffee en los ajustes para mostrar el badge.",
		},
	},
	quote: {
		en: { text: "Build things that make a difference.", author: "" },
		fr: { text: "Créer des choses qui comptent.", author: "" },
		es: { text: "Crea cosas que marquen la diferencia.", author: "" },
	},
	customMarkdown: {
		en: {
			content: "## Custom section\n\nAdd any GitHub-flavored Markdown here.",
		},
		fr: {
			content:
				"## Section personnalisée\n\nAjoutez ici votre Markdown compatible GitHub.",
		},
		es: {
			content:
				"## Sección personalizada\n\nAñade aquí cualquier Markdown compatible con GitHub.",
		},
	},
	footer: {
		en: {
			text: "Thanks for visiting my profile.",
			updatedLabel: "Last updated",
		},
		fr: {
			text: "Merci de votre visite sur mon profil.",
			updatedLabel: "Dernière mise à jour",
		},
		es: {
			text: "Gracias por visitar mi perfil.",
			updatedLabel: "Última actualización",
		},
	},
};

export function applyTextPreset(block, language) {
	const preset =
		componentTextPresets[block.type]?.[language] ||
		componentTextPresets[block.type]?.en;
	return preset
		? {
				...block,
				props: { ...block.props, ...JSON.parse(JSON.stringify(preset)) },
			}
		: block;
}

export function createBlock(type, overrides = {}, language = "en") {
	const definition = componentDefinitions[type];
	const preset =
		componentTextPresets[type]?.[language] ||
		componentTextPresets[type]?.en ||
		{};
	return {
		id: uid(),
		type,
		visible: true,
		props: {
			...JSON.parse(JSON.stringify(definition.defaults)),
			...JSON.parse(JSON.stringify(preset)),
			...overrides,
		},
	};
}

const templateLanguage = (language) =>
	["fr", "es"].includes(language) ? language : "en";

const studentCopy = {
	en: {
		typingLines: [
			"Software engineering student",
			"Turning ideas into useful projects",
		],
		learning:
			"Software engineering, product thinking and collaborative development",
		highlights: [
			{
				title: "Learning by building",
				text: "I turn coursework and curiosity into working software.",
				icon: "✦",
			},
			{
				title: "Team ready",
				text: "I document decisions and enjoy learning with others.",
				icon: "◎",
			},
			{
				title: "Open to opportunities",
				text: "Internships, apprenticeships and meaningful collaborations.",
				icon: "↗",
			},
		],
	},
	fr: {
		typingLines: [
			"Étudiant en ingénierie logicielle",
			"Des idées transformées en projets utiles",
		],
		learning:
			"Ingénierie logicielle, culture produit et développement collaboratif",
		highlights: [
			{
				title: "Apprendre en créant",
				text: "Je transforme les cours et la curiosité en logiciels concrets.",
				icon: "✦",
			},
			{
				title: "Esprit d’équipe",
				text: "Je documente mes choix et j’aime progresser avec les autres.",
				icon: "◎",
			},
			{
				title: "Ouvert aux opportunités",
				text: "Stages, alternances et collaborations qui ont du sens.",
				icon: "↗",
			},
		],
	},
	es: {
		typingLines: [
			"Estudiante de ingeniería de software",
			"Ideas convertidas en proyectos útiles",
		],
		learning:
			"Ingeniería de software, visión de producto y desarrollo colaborativo",
		highlights: [
			{
				title: "Aprender construyendo",
				text: "Convierto las clases y la curiosidad en software real.",
				icon: "✦",
			},
			{
				title: "Trabajo en equipo",
				text: "Documento decisiones y disfruto aprendiendo con otras personas.",
				icon: "◎",
			},
			{
				title: "Abierto a oportunidades",
				text: "Prácticas, formación y colaboraciones con propósito.",
				icon: "↗",
			},
		],
	},
};

function themedBlock(themeId, type, overrides = {}, language = "en") {
	const theme = resolveTheme(themeId);
	const baseOverrides = {
		capsule: {
			colorStart: theme.background,
			colorMiddle: theme.surface,
			colorEnd: theme.accent,
			textColor: theme.text,
		},
		typing: { color: theme.accent },
		contributionCalendar: { color: theme.accent },
		streak: { locale: templateLanguage(language) },
	};
	const block = createBlock(
		type,
		{ ...(baseOverrides[type] || {}), ...overrides },
		templateLanguage(language),
	);
	if (type === "ctaButtons" && !overrides.buttons) {
		block.props.buttons = block.props.buttons.map((button) => ({
			...button,
			color: theme.accent,
		}));
	}
	return block;
}

const templateBlueprints = [
	{
		id: "profile-showcase",
		name: "Profile Showcase",
		description:
			"A polished portfolio with a visual introduction, projects and a clear call to action.",
		themeId: "ruby",
		build(language) {
			const block = (type, overrides) =>
				themedBlock(this.themeId, type, overrides, language);
			return [
				block("capsule", {
					type: "waving",
					height: 108,
					showText: false,
					colorMiddle: "7f1d1d",
					alt: "Profile header",
				}),
				block("hero", {
					align: "center",
					showAvatar: true,
					avatarSize: 112,
					showTyping: false,
				}),
				block("typing", { width: 760, size: 20, pause: 1100 }),
				block("quickBadges", {
					align: "center",
					style: "flat",
					stars: false,
					showCodeTime: false,
					showWakaTime: false,
				}),
				block("about", {
					layout: "bullets",
					showLocation: true,
					showWork: true,
					showAvailability: true,
				}),
				block("highlights"),
				block("techStack", {
					display: "icons",
					iconSize: 38,
					grouped: true,
					showNames: false,
					maxPerRow: 10,
				}),
				block("projects", {
					columns: 2,
					showTechnologies: true,
					showRepository: true,
					showLiveUrl: true,
					showImage: true,
					showLogo: true,
				}),
				block("ctaButtons", { align: "center", style: "for-the-badge" }),
				block("socials", { align: "center", style: "for-the-badge" }),
				block("footer", { align: "center" }),
				block("capsule", {
					section: "footer",
					type: "waving",
					height: 86,
					showText: false,
					colorMiddle: "7f1d1d",
					alt: "Profile footer",
				}),
			];
		},
	},
	{
		id: "minimal-engineer",
		name: "Minimal Engineer",
		description:
			"A lightweight, practical profile that puts experience and selected work first.",
		themeId: "github-light",
		build(language) {
			const block = (type, overrides) =>
				themedBlock(this.themeId, type, overrides, language);
			return [
				block("hero", { align: "left", showAvatar: false, showTyping: false }),
				block("quickBadges", {
					align: "left",
					style: "flat-square",
					followers: true,
					profileViews: false,
					stars: true,
					showCodeTime: false,
					showWakaTime: false,
				}),
				block("divider"),
				block("about", {
					layout: "paragraph",
					showLocation: true,
					showWork: true,
					showAvailability: true,
				}),
				block("work", { style: "list", showCurrent: true }),
				block("techStack", {
					display: "badges",
					grouped: true,
					showNames: true,
					maxPerRow: 8,
				}),
				block("projects", {
					columns: 1,
					showTechnologies: true,
					showRepository: true,
					showLiveUrl: true,
					showImage: false,
					showLogo: false,
				}),
				block("githubStatsExtended", { align: "left", hideBorder: false }),
				block("socials", { align: "left", style: "flat-square" }),
				block("footer", { align: "left" }),
			];
		},
	},
	{
		id: "open-source-maintainer",
		name: "Open-source Maintainer",
		description:
			"Repositories, contribution data, licenses and community paths in one useful README.",
		themeId: "forest",
		build(language) {
			const block = (type, overrides) =>
				themedBlock(this.themeId, type, overrides, language);
			return [
				block("capsule", {
					type: "rounded",
					height: 118,
					showText: false,
					colorMiddle: "166534",
					alt: "Open-source profile header",
				}),
				block("hero", {
					align: "center",
					showAvatar: true,
					avatarSize: 104,
					showTyping: false,
				}),
				block("quickBadges", {
					align: "center",
					style: "flat",
					followers: true,
					profileViews: true,
					stars: true,
					showCodeTime: false,
					showWakaTime: false,
				}),
				block("tableOfContents"),
				block("about", {
					layout: "bullets",
					showLocation: true,
					showWork: true,
					showAvailability: true,
				}),
				block("techStack", {
					display: "icons",
					iconSize: 36,
					grouped: true,
					showNames: false,
					maxPerRow: 10,
				}),
				block("projects", {
					columns: 2,
					showTechnologies: true,
					showRepository: true,
					showLiveUrl: true,
					showImage: false,
					showLogo: true,
				}),
				block("activityGraph", { area: true, hideTitle: false, radius: 8 }),
				block("pullRequests", {
					mode: "user-aggregate",
					status: "merged",
					limit: 8,
				}),
				block("licenses", { theme: "dark", count: 6, showLegend: true }),
				block("ctaButtons", { align: "center", style: "for-the-badge" }),
				block("socials", { align: "center", style: "flat" }),
				block("footer", { align: "center" }),
				block("capsule", {
					section: "footer",
					type: "waving",
					height: 82,
					showText: false,
					colorMiddle: "166534",
					alt: "Open-source profile footer",
				}),
			];
		},
	},
	{
		id: "developer-analytics",
		name: "Developer Analytics",
		description:
			"A focused GitHub dashboard for languages, consistency and contribution activity.",
		themeId: "violet",
		build(language) {
			const block = (type, overrides) =>
				themedBlock(this.themeId, type, overrides, language);
			return [
				block("capsule", {
					type: "cylinder",
					height: 110,
					showText: false,
					colorMiddle: "6d28d9",
					colorEnd: "22d3ee",
					alt: "Developer analytics header",
				}),
				block("hero", {
					align: "center",
					showAvatar: true,
					avatarSize: 96,
					showTyping: false,
				}),
				block("quickBadges", {
					align: "center",
					style: "flat",
					followers: true,
					profileViews: true,
					stars: true,
					showCodeTime: false,
					showWakaTime: false,
				}),
				block("about", {
					layout: "paragraph",
					showLocation: false,
					showWork: true,
					showAvailability: false,
				}),
				block("techStack", {
					display: "badges",
					grouped: false,
					showNames: true,
					maxPerRow: 12,
				}),
				block("githubStatsExtended", {
					align: "center",
					hideBorder: true,
					rankIcon: "percentile",
				}),
				block("topLanguagesExtended", {
					align: "center",
					layout: "compact",
					count: 8,
					note: true,
				}),
				block("streak", {
					align: "center",
					borderRadius: 8,
					dateFormat: "j M[ Y]",
				}),
				block("activityGraph", {
					align: "center",
					area: true,
					hideTitle: true,
					radius: 8,
				}),
				block("metrics", {
					align: "center",
					showCalendar: false,
					showLanguages: false,
					showAchievements: true,
					showHabits: true,
					options: [{ key: "plugin_lines", value: "1" }],
				}),
				block("socials", { align: "center", style: "flat" }),
				block("footer", { align: "center" }),
			];
		},
	},
	{
		id: "student-builder",
		name: "Student Builder",
		description:
			"A grounded starting point for studies, experience, side projects and a growing stack.",
		themeId: "solar",
		build(language) {
			const lang = templateLanguage(language);
			const copy = studentCopy[lang];
			const block = (type, overrides) =>
				themedBlock(this.themeId, type, overrides, lang);
			return [
				block("capsule", {
					type: "soft",
					height: 112,
					showText: false,
					colorMiddle: "fbbf24",
					alt: "Student profile header",
				}),
				block("hero", {
					align: "center",
					showAvatar: true,
					avatarSize: 108,
					showTyping: false,
				}),
				block("typing", {
					lines: copy.typingLines,
					width: 760,
					size: 20,
					pause: 1200,
				}),
				block("about", {
					layout: "bullets",
					learning: copy.learning,
					showLocation: true,
					showWork: true,
					showAvailability: true,
				}),
				block("highlights", { items: copy.highlights }),
				block("work", { style: "timeline", showCurrent: true }),
				block("techStack", {
					display: "icons",
					iconSize: 38,
					grouped: true,
					showNames: true,
					maxPerRow: 7,
				}),
				block("projects", {
					columns: 1,
					showTechnologies: true,
					showRepository: true,
					showLiveUrl: true,
					showImage: true,
					showLogo: true,
				}),
				block("githubStatsExtended", { align: "center", hideBorder: false }),
				block("ctaButtons", { align: "center", style: "for-the-badge" }),
				block("socials", { align: "center", style: "flat" }),
				block("footer", { align: "center" }),
			];
		},
	},
];

export const builtInTemplates = templateBlueprints.map(
	({ build, ...template }) => ({
		...template,
		blocks: build.call(template, "en"),
	}),
);

export function createBuiltInTemplateProject(
	project,
	templateOrId,
	language = "en",
) {
	const id = typeof templateOrId === "string" ? templateOrId : templateOrId?.id;
	const blueprint = templateBlueprints.find((template) => template.id === id);
	if (!blueprint) return cloneProject(project);
	return {
		...cloneProject(project),
		themeId: blueprint.themeId,
		blocks: blueprint.build(templateLanguage(language)),
	};
}

const starterBlocks = [
	themedBlock("github-dark", "capsule", {
		type: "waving",
		height: 104,
		showText: false,
		colorMiddle: "1f6feb",
		alt: "Profile header",
	}),
	themedBlock("github-dark", "hero", {
		showTyping: false,
		showAvatar: true,
		avatarSize: 108,
	}),
	themedBlock("github-dark", "quickBadges", {
		style: "flat",
		showCodeTime: false,
		showWakaTime: false,
	}),
	themedBlock("github-dark", "about"),
	themedBlock("github-dark", "techStack", { iconSize: 38, maxPerRow: 10 }),
	themedBlock("github-dark", "projects", {
		columns: 1,
		showImage: true,
		showLogo: true,
	}),
	themedBlock("github-dark", "socials", { style: "flat" }),
	themedBlock("github-dark", "footer"),
	themedBlock("github-dark", "capsule", {
		section: "footer",
		type: "waving",
		height: 80,
		showText: false,
		colorMiddle: "1f6feb",
		alt: "Profile footer",
	}),
];

export const initialProject = {
	version: 1,
	profile: defaultProfile,
	themeId: "github-dark",
	blocks: starterBlocks,
};

export function cloneProject(project) {
	return JSON.parse(JSON.stringify(project));
}
