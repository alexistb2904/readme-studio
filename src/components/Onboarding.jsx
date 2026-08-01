import React from "react";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	Coffee,
	LockKeyhole,
} from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import { t } from "../i18n.js";
import { buyMeACoffeeUrl } from "../lib/siteConfig.js";
import TechPicker from "./TechPicker.jsx";
import ProjectEditor from "./ProjectEditor.jsx";
import ThemePicker from "./ThemePicker.jsx";
import { ExperienceEditor } from "./Inspector.jsx";
import { TemplateGallery } from "./TemplateManager.jsx";

const steps = [
	"basicInfo",
	"workLinks",
	"technologies",
	"projects",
	"appearance",
];

export default function Onboarding({
	project,
	setProject,
	onComplete,
	onSkip,
	onCancel,
	onGithubUsernameBlur,
}) {
	const language = project.profile.interfaceLanguage || "en";
	const [step, setStep] = React.useState(0);
	const profile = project.profile;
	const labels = {
		projectName: t(language, "projectName"),
		repository: t(language, "repository"),
		description: t(language, "description"),
		liveUrl: t(language, "liveUrl"),
		removeProject: t(language, "removeProject"),
		addProject: t(language, "addProject"),
		searchTech: t(language, "searchTech"),
		selected: t(language, "selected"),
		language,
		projectPlaceholder: t(language, "onboarding.placeholders.project"),
		repositoryPlaceholder: "https://github.com/…",
		descriptionPlaceholder: t(
			language,
			"onboarding.placeholders.projectDescription",
		),
		urlPlaceholder: "https://…",
		imagePlaceholder: "https://…/preview.png",
		logoPlaceholder: "https://…/logo.svg",
		imageAltPlaceholder: t(language, "onboarding.placeholders.projectImageAlt"),
		projectImage: t(language, "onboarding.projectImage"),
		projectLogo: t(language, "onboarding.projectLogo"),
		projectImageAlt: t(language, "onboarding.projectImageAlt"),
	};

	const updateProfile = (section, patch) => {
		setProject((current) => ({
			...current,
			profile: {
				...current.profile,
				[section]: { ...current.profile[section], ...patch },
			},
		}));
	};

	const updateRootProfile = (patch) => {
		setProject((current) => ({
			...current,
			profile: { ...current.profile, ...patch },
		}));
	};

	const next = () => {
		if (step < steps.length - 1) setStep(step + 1);
		else onComplete();
	};

	const importGithubOnBlur = (event) => {
		const username = event.target.value.replace(/^@/, "").trim();
		if (username) void onGithubUsernameBlur?.(username);
	};

	return (
		<main className="onboarding-shell">
			<div className="onboarding-glow" />
			<header className="onboarding-topbar container-width">
				<button
					className="onboarding-brand"
					type="button"
					onClick={onCancel}
					aria-label={t(language, "backToProjects")}
				>
					<span className="onboarding-brand-mark">
						<Github size={21} />
					</span>
					<span>
						README <em>Studio</em>
					</span>
				</button>
				<div className="onboarding-topbar-actions">
					<button
						type="button"
						className="onboarding-back-action"
						onClick={onCancel}
					>
						<ArrowLeft size={15} /> {t(language, "backToProjects")}
					</button>
					<div
						className="language-switcher compact-switcher"
						aria-label={t(language, "interfaceLanguage")}
					>
						<button
							type="button"
							className={language === "en" ? "active" : ""}
							onClick={() =>
								updateRootProfile({
									interfaceLanguage: "en",
									outputLanguage: "en",
								})
							}
						>
							EN
						</button>
						<button
							type="button"
							className={language === "fr" ? "active" : ""}
							onClick={() =>
								updateRootProfile({
									interfaceLanguage: "fr",
									outputLanguage: "fr",
								})
							}
						>
							FR
						</button>
						<button
							type="button"
							className={language === "es" ? "active" : ""}
							onClick={() =>
								updateRootProfile({
									interfaceLanguage: "es",
									outputLanguage: "es",
								})
							}
						>
							ES
						</button>
					</div>
				</div>
			</header>

			<section className="onboarding-card">
				<div className="onboarding-intro">
					<span className="eyebrow">
						<LockKeyhole size={14} /> {t(language, "localOnly")}
					</span>
					<h1>{t(language, "onboardingTitle")}</h1>
					<p>{t(language, "onboardingSubtitle")}</p>
				</div>

				<nav className="stepper" aria-label={t(language, "aria.setupProgress")}>
					{steps.map((key, index) => (
						<button
							type="button"
							key={key}
							className={`${index === step ? "active" : ""} ${index < step ? "completed" : ""}`}
							onClick={() => index <= step && setStep(index)}
						>
							<span>{index < step ? <Check size={14} /> : index + 1}</span>
							<small>{t(language, key)}</small>
						</button>
					))}
				</nav>

				<div className="onboarding-content">
					{step === 0 && (
						<div className="step-panel">
							<div className="section-heading">
								<h2>{t(language, "basicInfo")}</h2>
								<p>{t(language, "onboarding.basicInfoDescription")}</p>
							</div>
							<div className="form-grid two-columns">
								<label>
									<span>{t(language, "name")}</span>
									<input
										autoFocus
										value={profile.basics.name}
										onChange={(event) =>
											updateProfile("basics", { name: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.name")}
									/>
								</label>
								<label>
									<span>{t(language, "username")}</span>
									<div className="input-prefix">
										<span>@</span>
										<input
											value={profile.basics.username}
											onChange={(event) =>
												updateProfile("basics", {
													username: event.target.value.replace(/^@/, ""),
												})
											}
											onBlur={importGithubOnBlur}
											placeholder={t(
												language,
												"onboarding.placeholders.username",
											)}
										/>
									</div>
								</label>
								<label className="full-width">
									<span>{t(language, "headline")}</span>
									<input
										value={profile.basics.headline}
										onChange={(event) =>
											updateProfile("basics", { headline: event.target.value })
										}
										placeholder={t(
											language,
											"onboarding.placeholders.headline",
										)}
									/>
								</label>
								<label className="full-width">
									<span>{t(language, "bio")}</span>
									<textarea
										rows={4}
										value={profile.basics.bio}
										onChange={(event) =>
											updateProfile("basics", { bio: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.bio")}
									/>
								</label>
								<label>
									<span>{t(language, "location")}</span>
									<input
										value={profile.basics.location}
										onChange={(event) =>
											updateProfile("basics", { location: event.target.value })
										}
										placeholder={t(
											language,
											"onboarding.placeholders.location",
										)}
									/>
								</label>
								<label>
									<span>{t(language, "email")}</span>
									<input
										type="email"
										value={profile.basics.email}
										onChange={(event) =>
											updateProfile("basics", { email: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.email")}
									/>
								</label>
								<label className="full-width">
									<span>{t(language, "onboarding.avatarUrl")}</span>
									<input
										value={profile.basics.avatarUrl}
										onChange={(event) =>
											updateProfile("basics", { avatarUrl: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.avatar")}
									/>
								</label>
							</div>
						</div>
					)}

					{step === 1 && (
						<div className="step-panel">
							<div className="section-heading">
								<h2>{t(language, "workLinks")}</h2>
								<p>{t(language, "onboarding.workLinksDescription")}</p>
							</div>
							<div className="form-grid two-columns">
								<label>
									<span>{t(language, "role")}</span>
									<input
										autoFocus
										value={profile.work.role}
										onChange={(event) =>
											updateProfile("work", { role: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.role")}
									/>
								</label>
								<label>
									<span>{t(language, "company")}</span>
									<input
										value={profile.work.company}
										onChange={(event) =>
											updateProfile("work", { company: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.company")}
									/>
								</label>
								<label>
									<span>{t(language, "website")}</span>
									<input
										value={profile.links.website}
										onChange={(event) =>
											updateProfile("links", { website: event.target.value })
										}
										placeholder="https://…"
									/>
								</label>
								<label>
									<span>{t(language, "onboarding.portfolio")}</span>
									<input
										value={profile.links.portfolio}
										onChange={(event) =>
											updateProfile("links", { portfolio: event.target.value })
										}
										placeholder="https://…"
									/>
								</label>
								<label>
									<span>{t(language, "linkedin")}</span>
									<input
										value={profile.links.linkedin}
										onChange={(event) =>
											updateProfile("links", { linkedin: event.target.value })
										}
										placeholder={t(
											language,
											"onboarding.placeholders.linkedin",
										)}
									/>
								</label>
								<label>
									<span>{t(language, "onboarding.xTwitter")}</span>
									<input
										value={profile.links.x}
										onChange={(event) =>
											updateProfile("links", { x: event.target.value })
										}
										placeholder={t(language, "onboarding.placeholders.x")}
									/>
								</label>
								<label>
									<span>{t(language, "buyCoffee")}</span>
									<input
										value={profile.support.coffeeUrl}
										onChange={(event) =>
											updateProfile("support", {
												coffeeUrl: event.target.value,
											})
										}
										placeholder={t(language, "onboarding.placeholders.coffee")}
									/>
								</label>
							</div>
							<div className="onboarding-subsection">
								<div className="section-heading compact-heading">
									<h3>{t(language, "onboarding.experienceHistory")}</h3>
									<p>{t(language, "onboarding.experienceDescription")}</p>
								</div>
								<ExperienceEditor
									experiences={profile.experiences || []}
									onChange={(experiences) => updateRootProfile({ experiences })}
									language={language}
								/>
							</div>
						</div>
					)}

					{step === 2 && (
						<div className="step-panel wide-panel">
							<div className="section-heading">
								<h2>{t(language, "technologies")}</h2>
								<p>{t(language, "onboarding.technologiesDescription")}</p>
							</div>
							<TechPicker
								selected={profile.skills}
								onChange={(skills) => updateRootProfile({ skills })}
								searchPlaceholder={t(language, "searchTech")}
								selectedLabel={t(language, "selected")}
								language={language}
							/>
						</div>
					)}

					{step === 3 && (
						<div className="step-panel wide-panel">
							<div className="section-heading">
								<h2>{t(language, "projects")}</h2>
								<p>{t(language, "onboarding.projectsDescription")}</p>
							</div>
							<ProjectEditor
								projects={profile.projects}
								onChange={(projects) => updateRootProfile({ projects })}
								labels={labels}
							/>
						</div>
					)}

					{step === 4 && (
						<div className="step-panel">
							<div className="section-heading">
								<h2>{t(language, "appearance")}</h2>
								<p>{t(language, "onboarding.appearanceDescription")}</p>
							</div>
							<ThemePicker
								value={project.themeId}
								language={language}
								onChange={(themeId) =>
									setProject((current) => ({ ...current, themeId }))
								}
								customTheme={project.customTheme}
								onCustomThemeChange={(customTheme) =>
									setProject((current) => ({
										...current,
										themeId: "custom",
										customTheme,
									}))
								}
							/>
							<div className="onboarding-subsection template-onboarding-section">
								<div className="section-heading compact-heading">
									<h3>{t(language, "onboarding.chooseStartingPoint")}</h3>
									<p>
										{t(language, "onboarding.chooseStartingPointDescription")}
									</p>
								</div>
								<TemplateGallery
									project={project}
									onApply={setProject}
									language={language}
									compact
								/>
							</div>
							<div className="privacy-callout">
								<LockKeyhole size={19} />
								<div>
									<strong>{t(language, "localOnly")}</strong>
									<p>{t(language, "localOnlyDescription")}</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<footer className="onboarding-actions">
					<div className="onboarding-secondary-actions">
						<button type="button" className="text-button" onClick={onCancel}>
							{t(language, "backToProjects")}
						</button>
						<button type="button" className="text-button" onClick={onSkip}>
							{t(language, "skip")}
						</button>
						<a
							className="text-button onboarding-coffee-link"
							href={buyMeACoffeeUrl}
							target="_blank"
							rel="noreferrer"
						>
							<Coffee size={14} /> {t(language, "buyCoffee")}
						</a>
					</div>
					<div>
						{step > 0 && (
							<button
								type="button"
								className="secondary-button"
								onClick={() => setStep(step - 1)}
							>
								<ArrowLeft size={16} /> {t(language, "back")}
							</button>
						)}
						<button type="button" className="primary-button" onClick={next}>
							{step === steps.length - 1
								? t(language, "finish")
								: t(language, "next")}
							{step < steps.length - 1 && <ArrowRight size={16} />}
						</button>
					</div>
				</footer>
			</section>
		</main>
	);
}
