import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
	Code2,
	Copy,
	Download,
	Monitor,
	Moon,
	Smartphone,
	Sun,
} from "lucide-react";
import { renderMarkdown } from "../lib/markdown.js";
import { t } from "../i18n.js";

export default function PreviewPane({
	project,
	language,
	onCopy,
	onDownload,
	copied,
}) {
	const [mode, setMode] = useState("preview");
	const [viewport, setViewport] = useState("desktop");
	const [colorMode, setColorMode] = useState("dark");
	const [previewNonce, setPreviewNonce] = useState(() => Date.now());
	const fingerprint = useMemo(() => JSON.stringify(project), [project]);
	const exportMarkdown = useMemo(() => renderMarkdown(project), [project]);
	useEffect(() => {
		setPreviewNonce(Date.now());
	}, [fingerprint]);
	const previewMarkdown = useMemo(
		() => renderMarkdown(project, { cacheBust: previewNonce }),
		[project, previewNonce],
	);

	return (
		<section className="preview-panel app-panel">
			<div className="preview-toolbar">
				<div className="segmented-control">
					<button
						className={mode === "preview" ? "active" : ""}
						onClick={() => setMode("preview")}
					>
						Preview
					</button>
					<button
						className={mode === "markdown" ? "active" : ""}
						onClick={() => setMode("markdown")}
					>
						<Code2 size={14} /> {t(language, "markdown")}
					</button>
				</div>
				<div className="preview-toolbar-right">
					{mode === "preview" && (
						<>
							<div className="icon-segmented">
								<button
									className={viewport === "desktop" ? "active" : ""}
									onClick={() => setViewport("desktop")}
									title={t(language, "desktop")}
								>
									<Monitor size={15} />
								</button>
								<button
									className={viewport === "mobile" ? "active" : ""}
									onClick={() => setViewport("mobile")}
									title={t(language, "mobile")}
								>
									<Smartphone size={15} />
								</button>
							</div>
							<div className="icon-segmented">
								<button
									className={colorMode === "light" ? "active" : ""}
									onClick={() => setColorMode("light")}
									title={t(language, "light")}
								>
									<Sun size={15} />
								</button>
								<button
									className={colorMode === "dark" ? "active" : ""}
									onClick={() => setColorMode("dark")}
									title={t(language, "dark")}
								>
									<Moon size={15} />
								</button>
							</div>
						</>
					)}
					<button
						className="secondary-button compact-button"
						onClick={() => onCopy(exportMarkdown)}
					>
						<Copy size={15} />{" "}
						{copied ? t(language, "copied") : t(language, "copyMarkdown")}
					</button>
					<button
						className="primary-button compact-button"
						onClick={() => onDownload(exportMarkdown)}
					>
						<Download size={15} /> {t(language, "previewPane.export")}
					</button>
				</div>
			</div>
			<div className={`preview-workspace ${colorMode}`}>
				{mode === "preview" ? (
					<div
						className={`github-frame ${viewport}`}
						data-color-mode={colorMode}
						data-light-theme="light"
						data-dark-theme="dark"
					>
						<div className="github-file-header">
							<div className="github-file-meta">
								<strong>{t(language, "previewPane.readme")}</strong>
								<span>{t(language, "previewPane.preview")}</span>
							</div>
						</div>
						<article className="markdown-body">
							<ReactMarkdown
								remarkPlugins={[remarkGfm]}
								rehypePlugins={[rehypeRaw]}
							>
								{previewMarkdown}
							</ReactMarkdown>
						</article>
					</div>
				) : (
					<div className="markdown-source-wrap">
						<div className="code-gutter">
							{exportMarkdown.split("\n").map((_, index) => (
								<span key={index}>{index + 1}</span>
							))}
						</div>
						<pre className="markdown-source">
							<code>{exportMarkdown}</code>
						</pre>
					</div>
				)}
			</div>
			<footer className="preview-note">
				{t(language, "githubRenderingNote")}
			</footer>
		</section>
	);
}
