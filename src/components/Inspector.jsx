import { useState } from "react";
import { Plus, Settings2, Trash2, UserRound } from "lucide-react";
import {
	componentDefinitions,
	componentTextPresets,
} from "../data/templates.js";
import { t } from "../i18n.js";
import Modal from "./Modal.jsx";
import ProjectEditor from "./ProjectEditor.jsx";
import TechPicker from "./TechPicker.jsx";

function Field({ label, hint, children, className = "" }) {
	return (
		<label className={`inspector-field ${className}`}>
			<span className="field-label">{label}</span>
			{children}
			{hint && <small>{hint}</small>}
		</label>
	);
}

function ColorField({ label, value = "", onChange, hint, language = "en" }) {
	const normalized = String(value || "")
		.replace("#", "")
		.slice(0, 6);
	const pickerValue = /^[0-9a-f]{6}$/i.test(normalized)
		? `#${normalized}`
		: "#58a6ff";
	return (
		<Field label={label} hint={hint}>
			<div className="hex-color-field">
				<input
					type="color"
					value={pickerValue}
					onChange={(event) => onChange(event.target.value.replace("#", ""))}
					aria-label={t(language, "inspectorUi.colorPicker", { label })}
				/>
				<input
					value={normalized}
					onChange={(event) =>
						onChange(event.target.value.replace(/[^0-9a-f]/gi, "").slice(0, 6))
					}
					placeholder={t(language, "labels.colorPlaceholder")}
				/>
			</div>
		</Field>
	);
}

function AlignmentField({ value = "center", onChange, language = "en" }) {
	return (
		<Field label={t(language, "labels.alignment")}>
			<select value={value} onChange={onChange}>
				<option value="left">{t(language, "labels.left")}</option>
				<option value="center">{t(language, "labels.center")}</option>
				<option value="right">{t(language, "labels.right")}</option>
			</select>
		</Field>
	);
}

function Toggle({ label, checked, onChange, hint }) {
	return (
		<label className="toggle-row">
			<span>
				<strong>{label}</strong>
				{hint && <small>{hint}</small>}
			</span>
			<input
				type="checkbox"
				checked={Boolean(checked)}
				onChange={(event) => onChange(event.target.checked)}
			/>
			<i aria-hidden="true" />
		</label>
	);
}

function ListEditor({
	values = [],
	onChange,
	placeholder = "",
	language = "en",
}) {
	const update = (index, value) =>
		onChange(
			values.map((item, itemIndex) => (itemIndex === index ? value : item)),
		);
	const remove = (index) =>
		onChange(values.filter((_, itemIndex) => itemIndex !== index));
	return (
		<div className="list-editor">
			{values.map((value, index) => (
				<div className="list-editor-row" key={index}>
					<input
						value={value}
						onChange={(event) => update(index, event.target.value)}
						placeholder={placeholder}
					/>
					<button
						type="button"
						className="plain-icon danger"
						onClick={() => remove(index)}
					>
						<Trash2 size={15} />
					</button>
				</div>
			))}
			<button
				type="button"
				className="inline-add"
				onClick={() => onChange([...values, ""])}
			>
				<Plus size={14} /> {t(language, "inspectorUi.addItem")}
			</button>
		</div>
	);
}

function CustomBadgeEditor({ values = [], onChange, language = "en" }) {
	const update = (index, patch) =>
		onChange(
			values.map((item, itemIndex) =>
				itemIndex === index ? { ...item, ...patch } : item,
			),
		);
	return (
		<div className="stack-list">
			{values.map((badge, index) => (
				<div className="sub-card" key={index}>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.label")}>
							<input
								value={badge.label || ""}
								onChange={(e) => update(index, { label: e.target.value })}
							/>
						</Field>
						<Field label={t(language, "labels.message")}>
							<input
								value={badge.message || ""}
								onChange={(e) => update(index, { message: e.target.value })}
							/>
						</Field>
						<ColorField
							label={t(language, "labels.color")}
							value={badge.color || ""}
							onChange={(color) => update(index, { color })}
							language={language}
						/>
						<Field label={t(language, "labels.simpleIconsSlug")}>
							<input
								value={badge.logo || ""}
								onChange={(e) => update(index, { logo: e.target.value })}
								placeholder={t(language, "labels.reactPlaceholder")}
							/>
						</Field>
						<Field label={t(language, "labels.link")} className="full-width">
							<input
								value={badge.link || ""}
								onChange={(e) => update(index, { link: e.target.value })}
								placeholder={t(language, "labels.urlPlaceholder")}
							/>
						</Field>
					</div>
					<button
						type="button"
						className="danger-link"
						onClick={() =>
							onChange(values.filter((_, itemIndex) => itemIndex !== index))
						}
					>
						{t(language, "inspectorUi.removeBadge")}
					</button>
				</div>
			))}
			<button
				type="button"
				className="inline-add"
				onClick={() =>
					onChange([
						...values,
						{ label: "", message: "", color: "58a6ff", logo: "", link: "" },
					])
				}
			>
				<Plus size={14} /> {t(language, "inspectorUi.addBadge")}
			</button>
		</div>
	);
}

function CustomButtonEditor({ values = [], onChange, language = "en" }) {
	const update = (index, patch) =>
		onChange(
			values.map((item, itemIndex) =>
				itemIndex === index ? { ...item, ...patch } : item,
			),
		);
	return (
		<div className="stack-list">
			{values.map((button, index) => (
				<div className="sub-card" key={index}>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.buttonLabel")}>
							<input
								value={button.label || ""}
								onChange={(event) =>
									update(index, { label: event.target.value })
								}
							/>
						</Field>
						<Field label={t(language, "labels.optionalMessage")}>
							<input
								value={button.message || ""}
								onChange={(event) =>
									update(index, { message: event.target.value })
								}
							/>
						</Field>
						<ColorField
							label={t(language, "labels.buttonColor")}
							value={button.color || ""}
							onChange={(color) => update(index, { color })}
							language={language}
						/>
						<Field label={t(language, "labels.simpleIconsSlug")}>
							<input
								value={button.logo || ""}
								onChange={(event) =>
									update(index, { logo: event.target.value })
								}
								placeholder={t(language, "labels.githubPlaceholder")}
							/>
						</Field>
						<Field label={t(language, "labels.link")} className="full-width">
							<input
								value={button.link || ""}
								onChange={(event) =>
									update(index, { link: event.target.value })
								}
								placeholder={t(language, "labels.urlPlaceholder")}
							/>
						</Field>
						<Field
							label={t(language, "labels.imageDescription")}
							className="full-width"
						>
							<input
								value={button.alt || ""}
								onChange={(event) => update(index, { alt: event.target.value })}
							/>
						</Field>
					</div>
					<button
						type="button"
						className="danger-link"
						onClick={() =>
							onChange(values.filter((_, itemIndex) => itemIndex !== index))
						}
					>
						{t(language, "inspectorUi.removeButton")}
					</button>
				</div>
			))}
			<button
				type="button"
				className="inline-add"
				onClick={() =>
					onChange([
						...values,
						{
							label: "",
							message: "",
							color: "58a6ff",
							logo: "",
							link: "",
							alt: "",
						},
					])
				}
			>
				<Plus size={14} /> {t(language, "inspectorUi.addButton")}
			</button>
		</div>
	);
}

function ObjectListEditor({
	values = [],
	onChange,
	kind,
	language = "en",
	optionLabel,
	optionPlaceholder,
}) {
	const add = () => {
		const defaults = {
			toc: { label: "", anchor: "" },
			highlight: { title: "", text: "", icon: "✦" },
			post: { title: "", description: "", url: "", date: "" },
			customSection: { emoji: "✦", label: "", value: "" },
			social: {
				label: "",
				message: t(language, "labels.visit"),
				url: "",
				logo: "",
				color: "",
			},
			option: { key: "", value: "" },
		};
		onChange([...values, defaults[kind]]);
	};
	const update = (index, patch) =>
		onChange(
			values.map((item, itemIndex) =>
				itemIndex === index ? { ...item, ...patch } : item,
			),
		);
	const label =
		kind === "toc" || kind === "post"
			? t(language, "inspectorUi.addLink")
			: kind === "highlight"
				? t(language, "inspectorUi.addHighlight")
				: kind === "customSection"
					? t(language, "inspectorUi.addSection")
					: kind === "social"
						? t(language, "inspectorUi.addSocialLink")
						: t(language, "inspectorUi.addOption");
	return (
		<div className="stack-list">
			{values.map((item, index) => (
				<div className="sub-card" key={index}>
					{kind === "toc" && (
						<div className="form-grid two-columns compact-grid">
							<Field label={t(language, "labels.label")}>
								<input
									value={item.label || ""}
									onChange={(event) =>
										update(index, { label: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.anchor")}>
								<input
									value={item.anchor || ""}
									onChange={(event) =>
										update(index, {
											anchor: event.target.value.replace(/^#/, ""),
										})
									}
									placeholder={t(language, "labels.anchorPlaceholder")}
								/>
							</Field>
						</div>
					)}
					{kind === "highlight" && (
						<div className="form-grid two-columns compact-grid">
							<Field label={t(language, "labels.title")}>
								<input
									value={item.title || ""}
									onChange={(event) =>
										update(index, { title: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.icon")}>
								<input
									value={item.icon || ""}
									onChange={(event) =>
										update(index, { icon: event.target.value })
									}
								/>
							</Field>
							<Field
								label={t(language, "labels.description")}
								className="full-width"
							>
								<textarea
									rows={3}
									value={item.text || ""}
									onChange={(event) =>
										update(index, { text: event.target.value })
									}
								/>
							</Field>
						</div>
					)}
					{kind === "post" && (
						<div className="form-grid two-columns compact-grid">
							<Field label={t(language, "labels.title")}>
								<input
									value={item.title || ""}
									onChange={(event) =>
										update(index, { title: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.date")}>
								<input
									value={item.date || ""}
									onChange={(event) =>
										update(index, { date: event.target.value })
									}
									placeholder={t(language, "labels.yearPlaceholder")}
								/>
							</Field>
							<Field label={t(language, "labels.url")} className="full-width">
								<input
									value={item.url || ""}
									onChange={(event) =>
										update(index, { url: event.target.value })
									}
									placeholder="https://…"
								/>
							</Field>
							<Field
								label={t(language, "labels.description")}
								className="full-width"
							>
								<textarea
									rows={3}
									value={item.description || ""}
									onChange={(event) =>
										update(index, { description: event.target.value })
									}
								/>
							</Field>
						</div>
					)}
					{kind === "customSection" && (
						<div className="form-grid two-columns compact-grid">
							<Field label={t(language, "labels.icon")}>
								<input
									value={item.emoji || ""}
									onChange={(event) =>
										update(index, { emoji: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.label")}>
								<input
									value={item.label || ""}
									onChange={(event) =>
										update(index, { label: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.value")} className="full-width">
								<input
									value={item.value || ""}
									onChange={(event) =>
										update(index, { value: event.target.value })
									}
								/>
							</Field>
						</div>
					)}
					{kind === "social" && (
						<div className="form-grid two-columns compact-grid">
							<Field label={t(language, "labels.label")}>
								<input
									value={item.label || ""}
									onChange={(event) =>
										update(index, { label: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.buttonText")}>
								<input
									value={item.message || ""}
									onChange={(event) =>
										update(index, { message: event.target.value })
									}
								/>
							</Field>
							<Field label={t(language, "labels.url")} className="full-width">
								<input
									value={item.url || ""}
									onChange={(event) =>
										update(index, { url: event.target.value })
									}
									placeholder="https://…"
								/>
							</Field>
							<Field label={t(language, "labels.simpleIconsSlug")}>
								<input
									value={item.logo || ""}
									onChange={(event) =>
										update(index, { logo: event.target.value })
									}
									placeholder={t(language, "labels.discordPlaceholder")}
								/>
							</Field>
							<ColorField
								label={t(language, "labels.badgeColor")}
								value={item.color || ""}
								onChange={(color) => update(index, { color })}
								language={language}
							/>
						</div>
					)}
					{kind === "option" && (
						<div className="form-grid two-columns compact-grid">
							<Field
								label={optionLabel || t(language, "labels.metricsParameter")}
							>
								<input
									value={item.key || ""}
									onChange={(event) =>
										update(index, { key: event.target.value })
									}
									placeholder={
										optionPlaceholder ||
										t(language, "labels.metricsParameterPlaceholder")
									}
								/>
							</Field>
							<Field label={t(language, "labels.value")}>
								<input
									value={item.value || ""}
									onChange={(event) =>
										update(index, { value: event.target.value })
									}
									placeholder={t(language, "labels.onePlaceholder")}
								/>
							</Field>
						</div>
					)}
					<button
						type="button"
						className="danger-link"
						onClick={() =>
							onChange(values.filter((_, itemIndex) => itemIndex !== index))
						}
					>
						{t(language, "inspectorUi.remove")}
					</button>
				</div>
			))}
			<button type="button" className="inline-add" onClick={add}>
				<Plus size={14} /> {label}
			</button>
		</div>
	);
}

function ProviderOptions({ value, onChange, language, service }) {
	return (
		<Field
			label={t(language, "labels.providerOptions")}
			hint={t(language, "labels.providerOptionsHint", { service })}
		>
			<ObjectListEditor
				values={value || []}
				onChange={onChange}
				kind="option"
				language={language}
				optionLabel={t(language, "labels.providerParameter")}
				optionPlaceholder={t(language, "labels.providerParameterPlaceholder")}
			/>
		</Field>
	);
}

export function ExperienceEditor({
	experiences = [],
	onChange,
	language = "en",
}) {
	const update = (index, patch) =>
		onChange(
			experiences.map((item, itemIndex) =>
				itemIndex === index ? { ...item, ...patch } : item,
			),
		);
	return (
		<div className="stack-list">
			{experiences.map((item, index) => (
				<div className="sub-card" key={item.id || index}>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.role")}>
							<input
								value={item.role || ""}
								onChange={(event) =>
									update(index, { role: event.target.value })
								}
							/>
						</Field>
						<Field label={t(language, "labels.company")}>
							<input
								value={item.company || ""}
								onChange={(event) =>
									update(index, { company: event.target.value })
								}
							/>
						</Field>
						<Field label={t(language, "labels.period")}>
							<input
								value={item.period || ""}
								onChange={(event) =>
									update(index, { period: event.target.value })
								}
								placeholder={t(language, "labels.periodPlaceholder")}
							/>
						</Field>
						<Field label={t(language, "labels.location")}>
							<input
								value={item.location || ""}
								onChange={(event) =>
									update(index, { location: event.target.value })
								}
							/>
						</Field>
						<Field
							label={t(language, "labels.companyUrl")}
							className="full-width"
						>
							<input
								value={item.companyUrl || ""}
								onChange={(event) =>
									update(index, { companyUrl: event.target.value })
								}
								placeholder="https://…"
							/>
						</Field>
						<Field
							label={t(language, "labels.description")}
							className="full-width"
						>
							<textarea
								rows={3}
								value={item.description || ""}
								onChange={(event) =>
									update(index, { description: event.target.value })
								}
							/>
						</Field>
					</div>
					<button
						type="button"
						className="danger-link"
						onClick={() =>
							onChange(
								experiences.filter((_, itemIndex) => itemIndex !== index),
							)
						}
					>
						{t(language, "inspectorUi.removeExperience")}
					</button>
				</div>
			))}
			<button
				type="button"
				className="inline-add"
				onClick={() =>
					onChange([
						...experiences,
						{
							id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
							role: "",
							company: "",
							period: "",
							location: "",
							companyUrl: "",
							description: "",
						},
					])
				}
			>
				<Plus size={14} /> {t(language, "inspectorUi.addExperience")}
			</button>
		</div>
	);
}

function BlockFields({ block, updateProps, project, setProject, language }) {
	const p = block.props;
	const set = (key) => (value) => updateProps({ [key]: value });
	const input = (key) => (event) => updateProps({ [key]: event.target.value });
	const number = (key) => (event) =>
		updateProps({ [key]: Number(event.target.value) });

	switch (block.type) {
		case "hero":
			return (
				<>
					<Field label={t(language, "labels.alignment")}>
						<select value={p.align} onChange={input("align")}>
							<option value="left">{t(language, "labels.left")}</option>
							<option value="center">{t(language, "labels.center")}</option>
							<option value="right">{t(language, "labels.right")}</option>
						</select>
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.greeting")}>
							<input value={p.greeting} onChange={input("greeting")} />
						</Field>
						<Field label={t(language, "labels.emoji")}>
							<input value={p.emoji} onChange={input("emoji")} />
						</Field>
					</div>
					<Toggle
						label={t(language, "labels.showAvatar")}
						checked={p.showAvatar}
						onChange={set("showAvatar")}
					/>
					{p.showAvatar && (
						<Field label={t(language, "labels.avatarSize")}>
							<input
								type="range"
								min="64"
								max="220"
								value={p.avatarSize}
								onChange={number("avatarSize")}
							/>
							<output>{p.avatarSize}px</output>
						</Field>
					)}
					<Toggle
						label={t(language, "labels.animatedTypingLine")}
						checked={p.showTyping}
						onChange={set("showTyping")}
						hint={t(language, "labels.animatedTypingHint")}
					/>
					{p.showTyping && (
						<Field label={t(language, "labels.typingLines")}>
							<ListEditor
								values={p.typingLines}
								onChange={set("typingLines")}
								placeholder={t(language, "labels.typingPlaceholder")}
								language={language}
							/>
						</Field>
					)}
				</>
			);

		case "capsule":
			return (
				<>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.placement")}>
							<select value={p.section || "header"} onChange={input("section")}>
								<option value="header">{t(language, "labels.header")}</option>
								<option value="footer">{t(language, "labels.footer")}</option>
							</select>
						</Field>
						<Field label={t(language, "labels.waveShape")}>
							<select value={p.type || "waving"} onChange={input("type")}>
								<option value="waving">{t(language, "labels.waving")}</option>
								<option value="rect">{t(language, "labels.rectangle")}</option>
								<option value="rounded">{t(language, "labels.rounded")}</option>
								<option value="cylinder">
									{t(language, "labels.cylinder")}
								</option>
								<option value="soft">{t(language, "labels.soft")}</option>
								<option value="venom">{t(language, "labels.venom")}</option>
								<option value="transparent">
									{t(language, "labels.transparent")}
								</option>
							</select>
						</Field>
						<Field label={t(language, "labels.height")}>
							<input
								type="number"
								min="40"
								max="600"
								value={p.height || 220}
								onChange={number("height")}
							/>
						</Field>
						<Field label={t(language, "labels.middleColorStop")}>
							<input
								type="number"
								min="1"
								max="99"
								value={p.middleStop || 45}
								onChange={number("middleStop")}
							/>
						</Field>
					</div>
					<div className="form-grid two-columns compact-grid">
						<ColorField
							label={t(language, "labels.startColor")}
							value={p.colorStart}
							onChange={(color) => updateProps({ colorStart: color })}
							language={language}
						/>
						<ColorField
							label={t(language, "labels.middleColor")}
							value={p.colorMiddle}
							onChange={(color) => updateProps({ colorMiddle: color })}
							language={language}
						/>
						<ColorField
							label={t(language, "labels.endColor")}
							value={p.colorEnd}
							onChange={(color) => updateProps({ colorEnd: color })}
							language={language}
						/>
						<ColorField
							label={t(language, "labels.textColor")}
							value={p.textColor}
							onChange={(color) => updateProps({ textColor: color })}
							language={language}
						/>
					</div>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Toggle
						label={t(language, "labels.showTextAndDescription")}
						checked={p.showText}
						onChange={set("showText")}
					/>
					{p.showText && (
						<>
							<Field
								label={t(language, "labels.mainText")}
								hint="Leave empty to use the profile name."
							>
								<input
									value={p.text || ""}
									onChange={input("text")}
									placeholder={
										project.profile.basics.name ||
										project.profile.basics.username ||
										"Your name"
									}
								/>
							</Field>
							<Field
								label={t(language, "labels.description")}
								hint={t(language, "labels.descriptionHint")}
							>
								<input
									value={p.description || ""}
									onChange={input("description")}
									placeholder={
										project.profile.basics.headline ||
										"Your professional headline"
									}
								/>
							</Field>
							<div className="form-grid two-columns compact-grid">
								<Field label={t(language, "labels.textSize")}>
									<input
										type="number"
										min="1"
										max="100"
										value={p.textSize || 42}
										onChange={number("textSize")}
									/>
								</Field>
								<Field label={t(language, "labels.textVerticalPosition")}>
									<input
										type="number"
										min="1"
										max="99"
										value={p.textY || 35}
										onChange={number("textY")}
									/>
								</Field>
								<Field label={t(language, "labels.descriptionSize")}>
									<input
										type="number"
										min="1"
										max="60"
										value={p.descriptionSize || 18}
										onChange={number("descriptionSize")}
									/>
								</Field>
								<Field
									label={t(language, "labels.descriptionVerticalPosition")}
								>
									<input
										type="number"
										min="1"
										max="99"
										value={p.descriptionY || 58}
										onChange={number("descriptionY")}
									/>
								</Field>
							</div>
						</>
					)}
					<Field label={t(language, "labels.animation")}>
						<select
							value={p.animation || "fadeIn"}
							onChange={input("animation")}
						>
							<option value="fadeIn">{t(language, "labels.fadeIn")}</option>
							<option value="scaleIn">{t(language, "labels.scaleIn")}</option>
							<option value="blink">{t(language, "labels.blink")}</option>
							<option value="twinkling">
								{t(language, "labels.twinkling")}
							</option>
						</select>
					</Field>
					<Field label={t(language, "labels.imageDescription")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
				</>
			);

		case "typing":
			return (
				<>
					<Field label={t(language, "labels.typingLines")}>
						<ListEditor
							values={p.lines || []}
							onChange={set("lines")}
							placeholder={t(language, "labels.typingPlaceholder")}
							language={language}
						/>
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.font")}>
							<input value={p.font || ""} onChange={input("font")} />
						</Field>
						<Field label={t(language, "labels.weight")}>
							<input
								type="number"
								min="100"
								max="1000"
								value={p.weight || 500}
								onChange={number("weight")}
							/>
						</Field>
						<Field label={t(language, "labels.fontSize")}>
							<input
								type="number"
								min="1"
								max="80"
								value={p.size || 21}
								onChange={number("size")}
							/>
						</Field>
						<Field label={t(language, "labels.pause")}>
							<input
								type="number"
								min="0"
								value={p.pause || 1200}
								onChange={number("pause")}
							/>
						</Field>
						<Field label={t(language, "labels.svgWidth")}>
							<input
								type="number"
								min="100"
								max="2000"
								value={p.width || 850}
								onChange={number("width")}
							/>
						</Field>
						<ColorField
							label={t(language, "labels.textColor")}
							value={p.color || ""}
							onChange={(color) => updateProps({ color })}
							language={language}
						/>
					</div>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Toggle
						label={t(language, "labels.centerTextInsideSvg")}
						checked={p.centerText}
						onChange={set("centerText")}
					/>
					<Toggle
						label={t(language, "labels.verticallyCenterText")}
						checked={p.verticalCenter}
						onChange={set("verticalCenter")}
					/>
					<Field label={t(language, "labels.imageDescription")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
				</>
			);

		case "quickBadges":
			return (
				<>
					<AlignmentField
						value={p.align}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.badgeStyle")}>
						<select value={p.style} onChange={input("style")}>
							<option value="for-the-badge">
								{t(language, "labels.forTheBadge")}
							</option>
							<option value="flat">{t(language, "labels.flat")}</option>
							<option value="flat-square">
								{t(language, "labels.flatSquare")}
							</option>
							<option value="plastic">{t(language, "labels.plastic")}</option>
							<option value="social">{t(language, "labels.social")}</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.githubFollowers")}
						checked={p.followers}
						onChange={set("followers")}
					/>
					<Toggle
						label={t(language, "labels.profileViews")}
						checked={p.profileViews}
						onChange={set("profileViews")}
					/>
					<Toggle
						label={t(language, "labels.ownedRepositoryStars")}
						checked={p.stars}
						onChange={set("stars")}
					/>
					<Toggle
						label={t(language, "labels.codeDevBadge")}
						checked={p.showCodeTime}
						onChange={set("showCodeTime")}
					/>
					<Toggle
						label={t(language, "labels.wakaTimeBadge")}
						checked={p.showWakaTime}
						onChange={set("showWakaTime")}
					/>
					<Field label={t(language, "labels.codeTimeBadgeUrl")}>
						<input
							value={p.codeTimeBadgeUrl || ""}
							onChange={input("codeTimeBadgeUrl")}
							placeholder={t(language, "labels.codeTimeBadgeUrlPlaceholder")}
							inputMode="url"
							type="url"
						/>
					</Field>
					<Field label={t(language, "labels.wakaTimeBadgeUrl")}>
						<input
							value={p.wakatimeBadgeUrl || ""}
							onChange={input("wakatimeBadgeUrl")}
							placeholder={t(language, "labels.wakaTimeBadgeUrlPlaceholder")}
							inputMode="url"
							type="url"
						/>
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.followersLabel")}>
							<input
								value={p.followersLabel || ""}
								onChange={input("followersLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.profileViewsLabel")}>
							<input
								value={p.viewsLabel || ""}
								onChange={input("viewsLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.starsLabel")}>
							<input
								value={p.starsLabel || ""}
								onChange={input("starsLabel")}
							/>
						</Field>
					</div>
					<Field label={t(language, "labels.customBadges")}>
						<CustomBadgeEditor
							values={p.customBadges}
							onChange={set("customBadges")}
							language={language}
						/>
					</Field>
				</>
			);

		case "about":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.layout")}>
						<select value={p.layout} onChange={input("layout")}>
							<option value="bullets">
								{t(language, "labels.bulletList")}
							</option>
							<option value="paragraph">
								{t(language, "labels.paragraph")}
							</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.showLocation")}
						checked={p.showLocation}
						onChange={set("showLocation")}
					/>
					<Toggle
						label={t(language, "labels.showWork")}
						checked={p.showWork}
						onChange={set("showWork")}
					/>
					<Toggle
						label={t(language, "labels.showAvailability")}
						checked={p.showAvailability}
						onChange={set("showAvailability")}
					/>
					<Field label={t(language, "labels.currentFocus")}>
						<input value={p.currentFocus} onChange={input("currentFocus")} />
					</Field>
					<Field label={t(language, "labels.learning")}>
						<input value={p.learning} onChange={input("learning")} />
					</Field>
					<Field label={t(language, "labels.askMeAbout")}>
						<input value={p.askMeAbout} onChange={input("askMeAbout")} />
					</Field>
					<Field label={t(language, "labels.customSections")}>
						<ObjectListEditor
							values={p.customSections || []}
							onChange={set("customSections")}
							kind="customSection"
							language={language}
						/>
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.workLabel")}>
							<input value={p.workLabel || ""} onChange={input("workLabel")} />
						</Field>
						<Field label={t(language, "labels.locationLabel")}>
							<input
								value={p.locationLabel || ""}
								onChange={input("locationLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.focusLabel")}>
							<input
								value={p.focusLabel || ""}
								onChange={input("focusLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.learningLabel")}>
							<input
								value={p.learningLabel || ""}
								onChange={input("learningLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.askLabel")}>
							<input value={p.askLabel || ""} onChange={input("askLabel")} />
						</Field>
						<Field label={t(language, "labels.availabilityLabel")}>
							<input
								value={p.availabilityLabel || ""}
								onChange={input("availabilityLabel")}
							/>
						</Field>
					</div>
				</>
			);

		case "techStack":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.display")}>
						<select value={p.display} onChange={input("display")}>
							<option value="icons">{t(language, "labels.brandIcons")}</option>
							<option value="badges">
								{t(language, "labels.shieldsBadges")}
							</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.groupByCategory")}
						checked={p.grouped}
						onChange={set("grouped")}
					/>
					{p.display === "icons" && (
						<>
							<Toggle
								label={t(language, "labels.showTechnologyNames")}
								checked={p.showNames}
								onChange={set("showNames")}
							/>
							<Field label={t(language, "labels.iconSize")}>
								<input
									type="range"
									min="24"
									max="72"
									value={p.iconSize}
									onChange={number("iconSize")}
								/>
								<output>{p.iconSize}px</output>
							</Field>
							{p.showNames && (
								<Field label={t(language, "labels.technologiesPerRow")}>
									<input
										type="range"
										min="2"
										max="12"
										value={p.maxPerRow || 8}
										onChange={number("maxPerRow")}
									/>
									<output>{p.maxPerRow || 8}</output>
								</Field>
							)}
						</>
					)}
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "projects":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.columns")}>
						<select value={p.columns} onChange={number("columns")}>
							<option value="1">{t(language, "labels.one")}</option>
							<option value="2">{t(language, "labels.two")}</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.showTechnologies")}
						checked={p.showTechnologies}
						onChange={set("showTechnologies")}
					/>
					<Toggle
						label={t(language, "labels.showRepositoryLinks")}
						checked={p.showRepository}
						onChange={set("showRepository")}
					/>
					<Toggle
						label={t(language, "labels.showLiveLinks")}
						checked={p.showLiveUrl}
						onChange={set("showLiveUrl")}
					/>
					<Toggle
						label={t(language, "labels.showProjectImages")}
						checked={p.showImage}
						onChange={set("showImage")}
					/>
					<Toggle
						label={t(language, "labels.showProjectLogos")}
						checked={p.showLogo}
						onChange={set("showLogo")}
					/>
					<Field label={t(language, "labels.repositoryLinkLabel")}>
						<input
							value={p.repositoryLabel || ""}
							onChange={input("repositoryLabel")}
						/>
					</Field>
					<Field label={t(language, "labels.liveLinkLabel")}>
						<input value={p.liveLabel || ""} onChange={input("liveLabel")} />
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
					<ProjectEditor
						projects={project.profile.projects}
						onChange={(projects) =>
							setProject((current) => ({
								...current,
								profile: { ...current.profile, projects },
							}))
						}
						compact
						labels={{
							projectName: t(language, "projectName"),
							repository: t(language, "repository"),
							description: t(language, "description"),
							liveUrl: t(language, "liveUrl"),
							removeProject: t(language, "removeProject"),
							addProject: t(language, "addProject"),
							searchTech: t(language, "searchTech"),
							selected: t(language, "selected"),
							language,
							projectImage: t(language, "labels.projectImage"),
							projectLogo: t(language, "labels.projectLogo"),
							projectImageAlt: t(language, "labels.projectImageAlt"),
							projectPlaceholder: t(language, "labels.projectPlaceholder"),
							repositoryPlaceholder: t(language, "labels.urlPlaceholder"),
							descriptionPlaceholder: t(
								language,
								"labels.projectDescriptionPlaceholder",
							),
							urlPlaceholder: t(language, "labels.urlPlaceholder"),
							imagePlaceholder: t(language, "labels.urlPlaceholder"),
							logoPlaceholder: t(language, "labels.urlPlaceholder"),
							imageAltPlaceholder: t(
								language,
								"labels.projectImageAltPlaceholder",
							),
						}}
					/>
				</>
			);

		case "work":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.style")}>
						<select value={p.style} onChange={input("style")}>
							<option value="list">{t(language, "labels.list")}</option>
							<option value="timeline">{t(language, "labels.timeline")}</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.showCurrentRole")}
						checked={p.showCurrent}
						onChange={set("showCurrent")}
					/>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
					<Field label={t(language, "labels.experiences")}>
						<ExperienceEditor
							experiences={project.profile.experiences || []}
							onChange={(experiences) =>
								setProject((current) => ({
									...current,
									profile: { ...current.profile, experiences },
								}))
							}
							language={language}
						/>
					</Field>
				</>
			);

		case "githubStatsExtended":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Toggle
						label={t(language, "labels.showIcons")}
						checked={p.showIcons}
						onChange={set("showIcons")}
					/>
					<Toggle
						label={t(language, "labels.includeAllCommits")}
						checked={p.includeAllCommits}
						onChange={set("includeAllCommits")}
					/>
					<Toggle
						label={t(language, "labels.countPrivateContributions")}
						checked={p.privateCount}
						onChange={set("privateCount")}
					/>
					<Toggle
						label={t(language, "labels.hideCardBorder")}
						checked={p.hideBorder}
						onChange={set("hideBorder")}
					/>
					<Field label={t(language, "labels.rankIcon")}>
						<select value={p.rankIcon} onChange={input("rankIcon")}>
							<option value="github">{t(language, "labels.github")}</option>
							<option value="percentile">
								{t(language, "labels.percentile")}
							</option>
							<option value="default">{t(language, "labels.default")}</option>
						</select>
					</Field>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://github-stats-extended.vercel.app/api"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-stats-extended"
					/>
				</>
			);

		case "topLanguagesExtended":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.layout")}>
						<select value={p.layout} onChange={input("layout")}>
							<option value="compact">{t(language, "labels.compact")}</option>
							<option value="normal">{t(language, "labels.normal")}</option>
							<option value="donut">{t(language, "labels.donut")}</option>
							<option value="donut-vertical">
								{t(language, "labels.verticalDonut")}
							</option>
							<option value="pie">{t(language, "labels.pie")}</option>
						</select>
					</Field>
					<Field label={t(language, "labels.languageCount")}>
						<input
							type="number"
							min="1"
							max="20"
							value={p.count}
							onChange={number("count")}
						/>
					</Field>
					<Field
						label={t(language, "labels.excludedRepositories")}
						hint={t(language, "labels.excludedRepositoriesHint")}
					>
						<input value={p.excludeRepos} onChange={input("excludeRepos")} />
					</Field>
					<Toggle
						label={t(language, "labels.hideCardBorder")}
						checked={p.hideBorder}
						onChange={set("hideBorder")}
					/>
					<Toggle
						label={t(language, "labels.showExplanatoryNote")}
						checked={p.note}
						onChange={set("note")}
					/>
					<Field label={t(language, "labels.explanatoryNote")}>
						<textarea
							rows={3}
							value={p.noteText || ""}
							onChange={input("noteText")}
						/>
					</Field>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://github-stats-extended.vercel.app/api/top-langs"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-stats-extended"
					/>
				</>
			);

		case "statsExtendedWakatime":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title || ""} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.wakatimeUsername")}>
						<input
							value={p.username || ""}
							onChange={input("username")}
							placeholder="your-wakatime-username"
						/>
					</Field>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://github-stats-extended.vercel.app/api/wakatime"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-stats-extended"
					/>
				</>
			);

		case "statsExtendedRepo":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title || ""} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field
						label={t(language, "labels.repositorySlug")}
						hint={t(language, "labels.repositorySlugHint")}
					>
						<input
							value={p.repo || ""}
							onChange={input("repo")}
							placeholder="owner/repository"
						/>
					</Field>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://github-stats-extended.vercel.app/api/pin"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-stats-extended"
					/>
				</>
			);

		case "statsExtendedGist":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title || ""} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.gistId")}>
						<input value={p.gistId || ""} onChange={input("gistId")} />
					</Field>
					<Field label={t(language, "labels.optionalClickThroughUrl")}>
						<input value={p.gistUrl || ""} onChange={input("gistUrl")} />
					</Field>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://github-stats-extended.vercel.app/api/gist"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-stats-extended"
					/>
				</>
			);

		case "streak":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.theme")}>
							<input
								value={p.theme || ""}
								onChange={input("theme")}
								placeholder={t(language, "labels.mainThemePlaceholder")}
							/>
						</Field>
						<Field label={t(language, "labels.locale")}>
							<select value={p.locale || "en"} onChange={input("locale")}>
								<option value="en">{t(language, "languageNames.en")}</option>
								<option value="fr">{t(language, "languageNames.fr")}</option>
								<option value="es">{t(language, "languageNames.es")}</option>
							</select>
						</Field>
						<Field label={t(language, "labels.mode")}>
							<select value={p.mode || "daily"} onChange={input("mode")}>
								<option value="daily">{t(language, "labels.daily")}</option>
								<option value="weekly">{t(language, "labels.weekly")}</option>
							</select>
						</Field>
						<Field label={t(language, "labels.dateFormat")}>
							<input
								value={p.dateFormat || "Y"}
								onChange={input("dateFormat")}
							/>
						</Field>
						<Field label={t(language, "labels.cardWidth")}>
							<input
								type="number"
								min="0"
								value={p.cardWidth || 0}
								onChange={number("cardWidth")}
							/>
						</Field>
						<Field label={t(language, "labels.borderRadius")}>
							<input
								type="number"
								min="0"
								max="30"
								value={p.borderRadius || 5}
								onChange={number("borderRadius")}
							/>
						</Field>
					</div>
					<Toggle
						label={t(language, "labels.hideCardBorder")}
						checked={p.hideBorder}
						onChange={set("hideBorder")}
					/>
					<Toggle
						label={t(language, "labels.hideTotalContributions")}
						checked={p.hideTotal}
						onChange={set("hideTotal")}
					/>
					<Toggle
						label={t(language, "labels.hideWeekdayLabels")}
						checked={p.excludeDaysLabels}
						onChange={set("excludeDaysLabels")}
					/>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.baseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://streak-stats.demolab.com"
						/>
					</Field>
					<ProviderOptions
						value={p.options}
						onChange={set("options")}
						language={language}
						service="github-readme-streak-stats"
					/>
				</>
			);

		case "viewCounter":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title || ""} onChange={input("title")} />
					</Field>
					<Toggle
						label={t(language, "labels.showSectionTitle")}
						checked={p.showTitle}
						onChange={set("showTitle")}
					/>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "username")}>
							<input value={p.username || ""} onChange={input("username")} />
						</Field>
						<Field label={t(language, "labels.badgeColor")}>
							<input
								value={p.color || "red"}
								onChange={input("color")}
								placeholder="red"
							/>
						</Field>
					</div>
					<Field
						label={t(language, "labels.baseUrl")}
						hint={t(language, "labels.komarevBaseUrlHint")}
					>
						<input
							value={p.baseUrl || ""}
							onChange={input("baseUrl")}
							placeholder="https://komarev.com/ghpvc/"
						/>
					</Field>
					<Field
						label={t(language, "labels.counterUrl")}
						hint={t(language, "labels.counterUrlHint")}
					>
						<input
							value={p.counterUrl || ""}
							onChange={input("counterUrl")}
							placeholder="https://example.com/custom-counter"
						/>
					</Field>
					<Field label={t(language, "labels.imageAlt")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "activityGraph":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.graphProviderTitle")}>
						<input
							value={p.customTitle || ""}
							onChange={input("customTitle")}
							placeholder={t(language, "labels.sectionTitlePlaceholder")}
						/>
					</Field>
					<Field label={t(language, "labels.providerTheme")}>
						<input
							value={p.theme || ""}
							onChange={input("theme")}
							placeholder={t(language, "labels.providerThemePlaceholder")}
						/>
					</Field>
					<Field label={t(language, "labels.cornerRadius")}>
						<input
							type="number"
							min="0"
							max="30"
							value={p.radius || 5}
							onChange={number("radius")}
						/>
					</Field>
					<Toggle
						label={t(language, "labels.fillGraphArea")}
						checked={p.area}
						onChange={set("area")}
					/>
					<Toggle
						label={t(language, "labels.hideGraphBorder")}
						checked={p.hideBorder}
						onChange={set("hideBorder")}
					/>
					<Toggle
						label={t(language, "labels.hideProviderTitle")}
						checked={p.hideTitle}
						onChange={set("hideTitle")}
					/>
				</>
			);

		case "pinnedRepositories":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field
						label={t(language, "labels.repositoryNames")}
						hint={t(language, "labels.repositoryNamesHint")}
					>
						<ListEditor
							values={p.repositories}
							onChange={set("repositories")}
							placeholder={t(language, "labels.repositoryPlaceholder")}
							language={language}
						/>
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "metrics":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.metricsTemplate")}>
						<select value={p.template} onChange={input("template")}>
							<option value="classic">{t(language, "labels.classic")}</option>
							<option value="terminal">{t(language, "labels.terminal")}</option>
							<option value="repository">
								{t(language, "labels.repository")}
							</option>
							<option value="markdown">{t(language, "markdown")}</option>
						</select>
					</Field>
					<Field
						label={t(language, "labels.baseSections")}
						hint={t(language, "labels.baseSectionsHint")}
					>
						<input value={p.base} onChange={input("base")} />
					</Field>
					<Toggle
						label={t(language, "labels.showContributionCalendar")}
						checked={p.showCalendar}
						onChange={set("showCalendar")}
					/>
					<Toggle
						label={t(language, "labels.showLanguageAnalysis")}
						checked={p.showLanguages}
						onChange={set("showLanguages")}
					/>
					<Toggle
						label={t(language, "labels.showAchievements")}
						checked={p.showAchievements}
						onChange={set("showAchievements")}
					/>
					<Toggle
						label={t(language, "labels.showCodingHabits")}
						checked={p.showHabits}
						onChange={set("showHabits")}
					/>
					<Field
						label={t(language, "labels.anyMetricsOption")}
						hint={t(language, "labels.anyMetricsOptionHint")}
					>
						<ObjectListEditor
							values={p.options || []}
							onChange={set("options")}
							kind="option"
							language={language}
						/>
					</Field>
				</>
			);

		case "licenses":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.cardTheme")}>
						<input
							value={p.theme || ""}
							onChange={input("theme")}
							placeholder={t(language, "labels.darkPlaceholder")}
						/>
					</Field>
					<Field label={t(language, "labels.licenseCount")}>
						<input
							type="number"
							min="1"
							max="10"
							value={p.count || 6}
							onChange={number("count")}
						/>
					</Field>
					<Toggle
						label={t(language, "labels.showLegend")}
						checked={p.showLegend !== false}
						onChange={set("showLegend")}
					/>
				</>
			);

		case "pullRequests":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.mode")}>
						<select value={p.mode || "user-aggregate"} onChange={input("mode")}>
							<option value="user-aggregate">
								{t(language, "labels.yourContributions")}
							</option>
							<option value="repo-aggregate">
								{t(language, "labels.yourRepositories")}
							</option>
						</select>
					</Field>
					<Field label={t(language, "labels.theme")}>
						<input value={p.theme || "default"} onChange={input("theme")} />
					</Field>
					<Field label={t(language, "labels.limit")}>
						<input
							type="number"
							min="1"
							max="100"
							value={p.limit || 8}
							onChange={number("limit")}
						/>
					</Field>
					<Field label={t(language, "labels.status")}>
						<select value={p.status || "all"} onChange={input("status")}>
							<option value="all">{t(language, "labels.all")}</option>
							<option value="open">{t(language, "labels.open")}</option>
							<option value="closed">{t(language, "labels.closed")}</option>
							<option value="merged">{t(language, "labels.merged")}</option>
						</select>
					</Field>
					<Field label={t(language, "labels.minimumRepositoryStars")}>
						<input
							type="number"
							min="0"
							value={p.minStars || 0}
							onChange={number("minStars")}
						/>
					</Field>
				</>
			);

		case "contributionCalendar":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<ColorField
						label={t(language, "labels.calendarColor")}
						value={p.color}
						onChange={(color) => updateProps({ color })}
						language={language}
					/>
					<Field label={t(language, "labels.imageDescription")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
				</>
			);

		case "wakatime":
			return (
				<>
					<Toggle
						label={t(language, "labels.showSectionTitle")}
						checked={p.showTitle}
						onChange={set("showTitle")}
					/>
					{p.showTitle && (
						<Field label={t(language, "labels.sectionTitle")}>
							<input value={p.title || ""} onChange={input("title")} />
						</Field>
					)}
					<Field label={t(language, "labels.embedType")}>
						<select value={p.mode || "share"} onChange={input("mode")}>
							<option value="share">{t(language, "labels.sharedChart")}</option>
							<option value="projectBadge">
								{t(language, "labels.projectBadge")}
							</option>
						</select>
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field
							label={t(language, "labels.publicUserId")}
							hint="Use the ID from your public WakaTime embed URL."
						>
							<input
								value={p.userId || ""}
								onChange={input("userId")}
								placeholder={t(language, "labels.yourUserIdPlaceholder")}
							/>
						</Field>
						<Field
							label={
								p.mode === "projectBadge"
									? t(language, "labels.projectId")
									: t(language, "labels.sharedChartId")
							}
						>
							<input
								value={
									p.mode === "projectBadge"
										? p.projectId || ""
										: p.chartId || ""
								}
								onChange={input(
									p.mode === "projectBadge" ? "projectId" : "chartId",
								)}
								placeholder={t(language, "labels.publicIdPlaceholder")}
							/>
						</Field>
						<Field label={t(language, "labels.format")}>
							<select value={p.format || "svg"} onChange={input("format")}>
								<option value="svg">SVG</option>
								<option value="png">PNG</option>
							</select>
						</Field>
						<AlignmentField
							value={p.align || "center"}
							onChange={input("align")}
							language={language}
						/>
					</div>
					<Field label={t(language, "labels.optionalClickThroughUrl")}>
						<input
							value={p.linkUrl || ""}
							onChange={input("linkUrl")}
							placeholder={t(language, "labels.wakatimeUrlPlaceholder")}
						/>
					</Field>
					<Field label={t(language, "labels.imageDescription")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "codetime":
			return (
				<>
					<Toggle
						label={t(language, "labels.showSectionTitle")}
						checked={p.showTitle}
						onChange={set("showTitle")}
					/>
					{p.showTitle && (
						<Field label={t(language, "labels.sectionTitle")}>
							<input value={p.title || ""} onChange={input("title")} />
						</Field>
					)}
					<Field
						label={t(language, "labels.publicBadgeUrl")}
						hint={t(language, "labels.publicBadgeUrlHint")}
					>
						<input
							value={p.badgeUrl || ""}
							onChange={input("badgeUrl")}
							placeholder="https://…"
						/>
					</Field>
					<Field label={t(language, "labels.optionalClickThroughUrl")}>
						<input
							value={p.linkUrl || ""}
							onChange={input("linkUrl")}
							placeholder={t(language, "labels.codetimeUrlPlaceholder")}
						/>
					</Field>
					<AlignmentField
						value={p.align || "center"}
						onChange={input("align")}
						language={language}
					/>
					<Field label={t(language, "labels.imageDescription")}>
						<input value={p.alt || ""} onChange={input("alt")} />
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "ctaButtons":
			return (
				<>
					<Toggle
						label={t(language, "labels.showSectionTitle")}
						checked={p.showTitle}
						onChange={set("showTitle")}
					/>
					{p.showTitle && (
						<Field label={t(language, "labels.sectionTitle")}>
							<input value={p.title || ""} onChange={input("title")} />
						</Field>
					)}
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.badgeStyle")}>
							<select
								value={p.style || "for-the-badge"}
								onChange={input("style")}
							>
								<option value="for-the-badge">
									{t(language, "labels.forTheBadge")}
								</option>
								<option value="flat">{t(language, "labels.flat")}</option>
								<option value="flat-square">
									{t(language, "labels.flatSquare")}
								</option>
								<option value="plastic">{t(language, "labels.plastic")}</option>
							</select>
						</Field>
						<AlignmentField
							value={p.align || "center"}
							onChange={input("align")}
							language={language}
						/>
					</div>
					<Field label={t(language, "labels.buttons")}>
						<CustomButtonEditor
							values={p.buttons || []}
							onChange={set("buttons")}
							language={language}
						/>
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
				</>
			);

		case "tableOfContents":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.anchorLinks")}>
						<ObjectListEditor
							values={p.items}
							onChange={set("items")}
							kind="toc"
							language={language}
						/>
					</Field>
				</>
			);

		case "highlights":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.highlights")}>
						<ObjectListEditor
							values={p.items}
							onChange={set("items")}
							kind="highlight"
							language={language}
						/>
					</Field>
				</>
			);

		case "posts":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
					<Field label={t(language, "labels.links")}>
						<ObjectListEditor
							values={p.items}
							onChange={set("items")}
							kind="post"
							language={language}
						/>
					</Field>
				</>
			);

		case "socials":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.alignment")}>
						<select value={p.align} onChange={input("align")}>
							<option value="left">{t(language, "labels.left")}</option>
							<option value="center">{t(language, "labels.center")}</option>
							<option value="right">{t(language, "labels.right")}</option>
						</select>
					</Field>
					<Field label={t(language, "labels.badgeStyle")}>
						<select value={p.style} onChange={input("style")}>
							<option value="for-the-badge">
								{t(language, "labels.forTheBadge")}
							</option>
							<option value="flat">{t(language, "labels.flat")}</option>
							<option value="flat-square">
								{t(language, "labels.flatSquare")}
							</option>
							<option value="social">{t(language, "labels.social")}</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.showEmail")}
						checked={p.showEmail}
						onChange={set("showEmail")}
					/>
					<Toggle
						label={t(language, "labels.showWebsite")}
						checked={p.showWebsite}
						onChange={set("showWebsite")}
					/>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.emailLabel")}>
							<input
								value={p.emailLabel || ""}
								onChange={input("emailLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.emailAction")}>
							<input
								value={p.emailMessage || ""}
								onChange={input("emailMessage")}
							/>
						</Field>
						<Field label={t(language, "labels.websiteLabel")}>
							<input
								value={p.websiteLabel || ""}
								onChange={input("websiteLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.websiteAction")}>
							<input
								value={p.websiteMessage || ""}
								onChange={input("websiteMessage")}
							/>
						</Field>
						<Field label={t(language, "labels.linkedinAction")}>
							<input
								value={p.linkedinMessage || ""}
								onChange={input("linkedinMessage")}
							/>
						</Field>
						<Field label={t(language, "labels.xAction")}>
							<input value={p.xMessage || ""} onChange={input("xMessage")} />
						</Field>
						<Field label={t(language, "labels.youtubeAction")}>
							<input
								value={p.youtubeMessage || ""}
								onChange={input("youtubeMessage")}
							/>
						</Field>
						<Field label={t(language, "labels.devtoAction")}>
							<input
								value={p.devtoMessage || ""}
								onChange={input("devtoMessage")}
							/>
						</Field>
						<Field label={t(language, "labels.mediumAction")}>
							<input
								value={p.mediumMessage || ""}
								onChange={input("mediumMessage")}
							/>
						</Field>
					</div>
					<Field label={t(language, "labels.links")}>
						<ObjectListEditor
							values={project.profile.links.custom || []}
							onChange={(custom) =>
								setProject((current) => ({
									...current,
									profile: {
										...current.profile,
										links: { ...current.profile.links, custom },
									},
								}))
							}
							kind="social"
							language={language}
						/>
					</Field>
				</>
			);

		case "support":
			return (
				<>
					<Field label={t(language, "labels.sectionTitle")}>
						<input value={p.title} onChange={input("title")} />
					</Field>
					<Field label={t(language, "labels.description")}>
						<textarea
							rows={3}
							value={p.description}
							onChange={input("description")}
						/>
					</Field>
					<Field label={t(language, "labels.emptyStateText")}>
						<input value={p.emptyText || ""} onChange={input("emptyText")} />
					</Field>
					<Field label={t(language, "labels.alignment")}>
						<select value={p.align} onChange={input("align")}>
							<option value="left">{t(language, "labels.left")}</option>
							<option value="center">{t(language, "labels.center")}</option>
							<option value="right">{t(language, "labels.right")}</option>
						</select>
					</Field>
					<div className="form-grid two-columns compact-grid">
						<Field label={t(language, "labels.label")}>
							<input
								value={p.coffeeLabel || ""}
								onChange={input("coffeeLabel")}
							/>
						</Field>
						<Field label={t(language, "labels.message")}>
							<input
								value={p.coffeeMessage || ""}
								onChange={input("coffeeMessage")}
							/>
						</Field>
					</div>
				</>
			);

		case "quote":
			return (
				<>
					<Field label={t(language, "labels.quote")}>
						<textarea rows={4} value={p.text} onChange={input("text")} />
					</Field>
					<Field label={t(language, "labels.author")}>
						<input value={p.author} onChange={input("author")} />
					</Field>
				</>
			);

		case "customMarkdown":
			return (
				<Field label={t(language, "labels.githubMarkdown")}>
					<textarea
						className="code-textarea"
						rows={18}
						value={p.content}
						onChange={input("content")}
						spellCheck="false"
					/>
				</Field>
			);

		case "divider":
			return (
				<Field label={t(language, "labels.spacing")}>
					<select value={p.spacing} onChange={input("spacing")}>
						<option value="compact">{t(language, "labels.compact")}</option>
						<option value="normal">{t(language, "labels.normal")}</option>
						<option value="large">{t(language, "labels.large")}</option>
					</select>
				</Field>
			);

		case "spacer":
			return (
				<Field label={t(language, "labels.height")}>
					<input
						type="range"
						min="1"
						max="8"
						value={p.size}
						onChange={number("size")}
					/>
					<output>
						{t(language, "inspectorUi.spacerLines", { count: p.size })}
					</output>
				</Field>
			);

		case "footer":
			return (
				<>
					<Field label={t(language, "labels.text")}>
						<input value={p.text} onChange={input("text")} />
					</Field>
					<Field label={t(language, "labels.alignment")}>
						<select value={p.align} onChange={input("align")}>
							<option value="left">{t(language, "labels.left")}</option>
							<option value="center">{t(language, "labels.center")}</option>
							<option value="right">{t(language, "labels.right")}</option>
						</select>
					</Field>
					<Toggle
						label={t(language, "labels.showLastUpdatedDate")}
						checked={p.showLastUpdated}
						onChange={set("showLastUpdated")}
					/>
					<Field label={t(language, "labels.lastUpdatedLabel")}>
						<input
							value={p.updatedLabel || ""}
							onChange={input("updatedLabel")}
						/>
					</Field>
				</>
			);

		default:
			return (
				<div className="empty-state compact">
					{t(language, "inspectorUi.noSettings")}
				</div>
			);
	}
}

function ProfileFields({
	project,
	setProject,
	language,
	openTech,
	onImportGithubProfile,
}) {
	const profile = project.profile;
	const [githubImportState, setGithubImportState] = useState("idle");
	const update = (section, patch) =>
		setProject((current) => ({
			...current,
			profile: {
				...current.profile,
				[section]: { ...current.profile[section], ...patch },
			},
		}));
	const root = (patch) =>
		setProject((current) => ({
			...current,
			profile: { ...current.profile, ...patch },
		}));
	const importGithub = async () => {
		setGithubImportState("loading");
		const result = await onImportGithubProfile?.({ onlyMissing: false });
		setGithubImportState(
			result?.ok ? "success" : result?.reason || "requestFailed",
		);
	};

	return (
		<div className="inspector-form">
			<div className="inspector-section-label">
				{t(language, "inspectorUi.identity")}
			</div>
			<Field label={t(language, "name")}>
				<input
					value={profile.basics.name}
					onChange={(e) => update("basics", { name: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "username")}>
				<input
					value={profile.basics.username}
					onChange={(e) =>
						update("basics", { username: e.target.value.replace(/^@/, "") })
					}
				/>
			</Field>
			<Field label={t(language, "headline")}>
				<input
					value={profile.basics.headline}
					onChange={(e) => update("basics", { headline: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "bio")}>
				<textarea
					rows={4}
					value={profile.basics.bio}
					onChange={(e) => update("basics", { bio: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "location")}>
				<input
					value={profile.basics.location}
					onChange={(e) => update("basics", { location: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.avatarUrl")}>
				<input
					value={profile.basics.avatarUrl}
					onChange={(e) => update("basics", { avatarUrl: e.target.value })}
				/>
			</Field>
			<div className="github-import-card">
				<div>
					<strong>{t(language, "githubImportTitle")}</strong>
					<small>{t(language, "githubImportDescription")}</small>
				</div>
				<button
					type="button"
					className="secondary-button compact-button"
					onClick={importGithub}
					disabled={!profile.basics.username || githubImportState === "loading"}
				>
					{githubImportState === "loading"
						? t(language, "githubImportLoading")
						: t(language, "githubImportAction")}
				</button>
				{githubImportState !== "idle" && githubImportState !== "loading" && (
					<small
						className={
							githubImportState === "success"
								? "github-import-success"
								: "github-import-error"
						}
					>
						{t(
							language,
							`githubImport${githubImportState[0].toUpperCase()}${githubImportState.slice(1)}`,
						)}
					</small>
				)}
			</div>

			<div className="inspector-section-label">
				{t(language, "inspectorUi.work")}
			</div>
			<Field label={t(language, "role")}>
				<input
					value={profile.work.role}
					onChange={(e) => update("work", { role: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "company")}>
				<input
					value={profile.work.company}
					onChange={(e) => update("work", { company: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.availability")}>
				<input
					value={profile.work.availability}
					onChange={(e) => update("work", { availability: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.experienceHistory")}>
				<ExperienceEditor
					experiences={profile.experiences || []}
					onChange={(experiences) => root({ experiences })}
					language={language}
				/>
			</Field>

			<div className="inspector-section-label">
				{t(language, "inspectorUi.links")}
			</div>
			<Field label={t(language, "email")}>
				<input
					value={profile.basics.email}
					onChange={(e) => update("basics", { email: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.website")}>
				<input
					value={profile.links.website}
					onChange={(e) => update("links", { website: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.portfolio")}>
				<input
					value={profile.links.portfolio}
					onChange={(e) => update("links", { portfolio: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.linkedin")}>
				<input
					value={profile.links.linkedin}
					onChange={(e) => update("links", { linkedin: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.xTwitter")}>
				<input
					value={profile.links.x}
					onChange={(e) => update("links", { x: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.youtube")}>
				<input
					value={profile.links.youtube}
					onChange={(e) => update("links", { youtube: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.devto")}>
				<input
					value={profile.links.devto}
					onChange={(e) => update("links", { devto: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.medium")}>
				<input
					value={profile.links.medium}
					onChange={(e) => update("links", { medium: e.target.value })}
				/>
			</Field>
			<Field label={t(language, "labels.links")}>
				<ObjectListEditor
					values={profile.links.custom || []}
					onChange={(custom) => update("links", { custom })}
					kind="social"
					language={language}
				/>
			</Field>

			<div className="inspector-section-label">
				{t(language, "technologies")}
			</div>
			<button
				type="button"
				className="secondary-button full-button"
				onClick={openTech}
			>
				{t(language, "inspectorUi.editTechnologies", {
					count: profile.skills.length,
				})}
			</button>

			<div className="inspector-section-label">
				{t(language, "inspectorUi.support")}
			</div>
			<Field label={t(language, "buyCoffee")}>
				<input
					value={profile.support.coffeeUrl}
					onChange={(e) => update("support", { coffeeUrl: e.target.value })}
				/>
			</Field>

			<div className="inspector-section-label">
				{t(language, "inspectorUi.language")}
			</div>
			<Field label={t(language, "outputLanguage")}>
				<select
					value={profile.outputLanguage}
					onChange={(e) => root({ outputLanguage: e.target.value })}
				>
					<option value="en">{t(language, "languageNames.en")}</option>
					<option value="fr">{t(language, "languageNames.fr")}</option>
					<option value="es">{t(language, "languageNames.es")}</option>
				</select>
			</Field>
		</div>
	);
}

export default function Inspector({
	selectedBlock,
	project,
	setProject,
	language,
	onImportGithubProfile,
}) {
	const [tab, setTab] = useState("component");
	const [techModal, setTechModal] = useState(false);
	const definition = selectedBlock
		? componentDefinitions[selectedBlock.type]
		: null;

	const updateProps = (patch) => {
		if (!selectedBlock) return;
		setProject((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === selectedBlock.id
					? { ...block, props: { ...block.props, ...patch } }
					: block,
			),
		}));
	};

	const applyPreset = (presetLanguage) => {
		const preset = componentTextPresets[selectedBlock?.type]?.[presetLanguage];
		if (preset) updateProps(preset);
	};

	return (
		<aside className="inspector-panel app-panel">
			<div className="inspector-tabs">
				<button
					className={tab === "component" ? "active" : ""}
					onClick={() => setTab("component")}
				>
					<Settings2 size={15} /> {t(language, "inspectorUi.component")}
				</button>
				<button
					className={tab === "profile" ? "active" : ""}
					onClick={() => setTab("profile")}
				>
					<UserRound size={15} /> {t(language, "inspectorUi.profile")}
				</button>
			</div>
			{tab === "component" ? (
				<>
					<div className="panel-heading inspector-heading">
						<div>
							<span className="panel-kicker">{t(language, "inspector")}</span>
							<h2>
								{definition?.label[language] ||
									definition?.label.en ||
									"Component"}
							</h2>
						</div>
					</div>
					<div className="inspector-scroll">
						{selectedBlock ? (
							<div className="inspector-form">
								{componentTextPresets[selectedBlock.type] && (
									<Field
										label={t(language, "componentLanguagePreset")}
										hint={t(language, "componentLanguagePresetHint")}
									>
										<select
											defaultValue=""
											onChange={(event) => {
												if (event.target.value) applyPreset(event.target.value);
												event.target.value = "";
											}}
										>
											<option value="">{t(language, "choosePreset")}</option>
											<option value="fr">
												{t(language, "languageNames.fr")}
											</option>
											<option value="en">
												{t(language, "languageNames.en")}
											</option>
											<option value="es">
												{t(language, "languageNames.es")}
											</option>
										</select>
									</Field>
								)}
								<BlockFields
									block={selectedBlock}
									updateProps={updateProps}
									project={project}
									setProject={setProject}
									language={language}
								/>
							</div>
						) : (
							<div className="empty-state">{t(language, "noComponent")}</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className="panel-heading inspector-heading">
						<div>
							<span className="panel-kicker">
								{t(language, "inspectorUi.globalData")}
							</span>
							<h2>{t(language, "profileData")}</h2>
						</div>
					</div>
					<div className="inspector-scroll">
						<ProfileFields
							project={project}
							setProject={setProject}
							language={language}
							openTech={() => setTechModal(true)}
							onImportGithubProfile={onImportGithubProfile}
						/>
					</div>
				</>
			)}

			<Modal
				open={techModal}
				title={t(language, "technologies")}
				onClose={() => setTechModal(false)}
				size="xl"
				language={language}
			>
				<TechPicker
					selected={project.profile.skills}
					onChange={(skills) =>
						setProject((current) => ({
							...current,
							profile: { ...current.profile, skills },
						}))
					}
					searchPlaceholder={t(language, "searchTech")}
					selectedLabel={t(language, "selected")}
					language={language}
				/>
			</Modal>
		</aside>
	);
}
