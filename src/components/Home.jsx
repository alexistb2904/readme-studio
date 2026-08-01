import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
	ArrowRight,
	Check,
	CheckCircle2,
	ChevronRight,
	Coffee,
	Code2,
	ExternalLink,
	Eye,
	FileDown,
	Github,
	Heart,
	Languages,
	Layers3,
	LockKeyhole,
	MonitorSmartphone,
	MousePointer2,
	Plus,
	Sparkles,
	Terminal,
	WandSparkles,
} from "lucide-react";
import { t } from "../i18n.js";
import { buyMeACoffeeUrl } from "../lib/siteConfig.js";

const githubProfile = {
	avatar: "https://avatars.githubusercontent.com/u/59259007?v=4",
	profileUrl: "https://github.com/alexistb2904",
	epiTimeUrl: "https://github.com/alexistb2904/EpiTime",
};

function ReadmePreview({ text }) {
	return (
		<div className="landing-preview-wrap" aria-label={text.previewLabel}>
			<div className="landing-preview-glow" aria-hidden="true" />
			<div className="landing-preview-card">
				<div className="landing-preview-toolbar">
					<span className="preview-traffic">
						<i />
						<i />
						<i />
					</span>
				</div>
				<div className="landing-readme">
					<div className="landing-readme-profile">
						<img
							className="landing-readme-avatar"
							src={githubProfile.avatar}
							alt={text.avatarAlt}
						/>
						<div>
							<a
								className="landing-readme-handle"
								href={githubProfile.profileUrl}
								target="_blank"
								rel="noreferrer"
							>
								alexistb2904 / README.md
							</a>
							<h3>{text.previewTitle}</h3>
							<p>{text.previewText}</p>
						</div>
					</div>
					<div className="landing-readme-rule" />
					<div className="landing-readme-skills">
						<span>{text.previewStack}</span>
						<div>
							{text.previewTags.map((tag) => (
								<b key={tag}>{tag}</b>
							))}
						</div>
					</div>
					<a
						className="landing-readme-project"
						href={githubProfile.epiTimeUrl}
						target="_blank"
						rel="noreferrer"
					>
						<span>01 / {text.featuredLabel}</span>
						<strong>
							{text.featuredTitle} <ArrowRight size={14} />
						</strong>
						<p>{text.featuredText}</p>
					</a>
				</div>
				<div className="landing-preview-dock">
					<span>
						<Code2 size={14} /> {text.markdown}
					</span>
					<span className="active">
						<Eye size={14} /> {text.preview}
					</span>
					<span>
						<FileDown size={14} /> {text.export}
					</span>
				</div>
			</div>
			<div className="landing-floating-note landing-note-one">
				<MousePointer2 size={14} />
				<span>{text.floatingNoteOne}</span>
			</div>
			<div className="landing-floating-note landing-note-two">
				<WandSparkles size={14} />
				<span>{text.githubFit}</span>
			</div>
		</div>
	);
}

export default function Home({
	language,
	projects,
	onCreate,
	onProjects,
	onLanguageChange,
	onCredits,
}) {
	const pageRef = useRef(null);
	const text = t(language, "home");

	useEffect(() => {
		const root = pageRef.current;
		if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
			return undefined;

		let observer;
		const context = gsap.context(() => {
			gsap
				.timeline({ defaults: { ease: "power3.out" } })
				.from(".landing-nav", { y: -16, autoAlpha: 0, duration: 0.45 })
				.from(
					".landing-hero-copy > *",
					{ y: 24, autoAlpha: 0, duration: 0.62, stagger: 0.08 },
					"<0.15",
				)
				.from(
					".landing-preview-card",
					{ x: 34, y: 18, rotation: 4.5, autoAlpha: 0, duration: 0.78 },
					"<0.08",
				)
				.from(
					".landing-floating-note",
					{ y: 10, autoAlpha: 0, duration: 0.4, stagger: 0.12 },
					"<-0.25",
				);

			observer = new IntersectionObserver(
				(entries) => {
					entries
						.filter((entry) => entry.isIntersecting)
						.forEach((entry) => {
							const animationRoot = entry.target;
							gsap.from(
								animationRoot.querySelectorAll(
									".landing-feature-card, .landing-demo-copy > *, .readme-demo-shell, .landing-final > *, .landing-footer > *",
								),
								{
									y: 26,
									autoAlpha: 0,
									duration: 0.62,
									stagger: 0.09,
									ease: "power3.out",
								},
							);
							observer.unobserve(animationRoot);
						});
				},
				{ threshold: 0.18 },
			);
			root
				.querySelectorAll(
					".landing-feature-grid, .landing-demo, .landing-final, .landing-footer",
				)
				.forEach((section) => observer.observe(section));
		}, root);

		return () => {
			observer?.disconnect();
			context.revert();
		};
	}, []);

	return (
		<main className="landing-page" ref={pageRef}>
			<div className="landing-grain" aria-hidden="true" />
			<div className="landing-halo landing-halo-top" aria-hidden="true" />
			<header className="landing-nav container-width">
				<button
					className="landing-brand"
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					aria-label={t(language, "aria.readmeStudio")}
				>
					<span className="landing-brand-mark">
						<Github size={20} />
					</span>
					<span>
						README <em>Studio</em>
					</span>
				</button>
				<nav aria-label={t(language, "aria.primaryNavigation")}>
					<button
						className="landing-nav-link"
						type="button"
						onClick={onProjects}
					>
						{text.projects}
						{projects.length ? <small>{projects.length}</small> : null}
					</button>
					<button
						className="landing-primary-action landing-nav-cta"
						type="button"
						onClick={onCreate}
					>
						{text.launch} <ArrowRight size={16} />
					</button>
				</nav>
			</header>

			<section className="landing-hero container-width">
				<div className="landing-hero-copy">
					<p className="landing-overline">
						<span /> {text.heroTag}
					</p>
					<h1>
						{text.heroTitleStart} <strong>{text.heroTitleAccent}</strong>
					</h1>
					<p className="landing-hero-text">{text.heroText}</p>
					<div className="landing-hero-actions">
						<button
							className="landing-primary-action landing-big-action"
							type="button"
							onClick={onCreate}
						>
							{text.primary} <ArrowRight size={18} />
						</button>
						<button
							className="landing-secondary-action"
							type="button"
							onClick={onProjects}
						>
							{text.secondary} <ChevronRight size={17} />
						</button>
					</div>
					<p className="landing-proof">
						<LockKeyhole size={14} /> {text.proof}
					</p>
				</div>
				<ReadmePreview text={text} />
			</section>

			<section className="landing-features container-width">
				<div className="landing-section-heading">
					<p className="landing-overline">
						<span /> {text.featureTag}
					</p>
					<h2>{text.featureTitle}</h2>
				</div>
				<div className="landing-feature-grid">
					{text.features.map(([title, description], index) => {
						const Icon = [Layers3, Eye, LockKeyhole][index];
						return (
							<article className="landing-feature-card" key={title}>
								<div className={`landing-feature-icon icon-${index + 1}`}>
									<Icon size={20} />
								</div>
								<span>0{index + 1}</span>
								<h3>{title}</h3>
								<p>{description}</p>
								<div className="landing-feature-line" />
							</article>
						);
					})}
				</div>
			</section>

			<section className="landing-final container-width">
				<div>
					<p className="landing-overline">
						<span /> {text.endTag}
					</p>
					<h2>{text.endTitle}</h2>
					<p>{text.endText}</p>
				</div>
				<button
					className="landing-primary-action landing-final-action"
					type="button"
					onClick={onCreate}
				>
					{text.endAction}
				</button>
			</section>
			<footer className="landing-footer container-width">
				<span className="landing-brand footer-brand">
					<span className="landing-brand-mark">
						<Github size={16} />
					</span>
					README <em>Studio</em>
				</span>
				<p>{text.footer}</p>
				<div className="landing-footer-actions">
					<button type="button" onClick={onProjects}>
						{text.projects} <ArrowRight size={14} />
					</button>
					<a
						className="landing-footer-link"
						href={buyMeACoffeeUrl}
						target="_blank"
						rel="noreferrer"
					>
						<Coffee size={13} /> {t(language, "buyCoffee")}
					</a>
					<button type="button" onClick={onCredits}>
						<Heart size={13} /> {text.credits}
					</button>
					<label>
						<Languages size={13} />
						<span className="sr-only">{t(language, "interfaceLanguage")}</span>
						<select
							value={language}
							onChange={(event) => onLanguageChange(event.target.value)}
							aria-label={t(language, "aria.interfaceLanguage")}
						>
							<option value="fr">{t(language, "languageNames.fr")}</option>
							<option value="en">{t(language, "languageNames.en")}</option>
							<option value="es">{t(language, "languageNames.es")}</option>
						</select>
					</label>
				</div>
			</footer>
		</main>
	);
}
