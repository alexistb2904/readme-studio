import { useMemo, useState } from "react";
import { Check, Search, X, ListFilter } from "lucide-react";
import { technologyCategories, technologyById } from "../data/technologies.js";
import TechIcon from "./TechIcon.jsx";
import { t } from "../i18n.js";

export default function TechPicker({
	selected = [],
	onChange,
	searchPlaceholder,
	selectedLabel,
	language = "en",
}) {
	const [query, setQuery] = useState("");
	const [activeCategory, setActiveCategory] = useState("all");
	const [selectedOnly, setSelectedOnly] = useState(false);
	const normalized = query.trim().toLowerCase();
	const selectedSet = useMemo(() => new Set(selected), [selected]);
	const selectedTech = selected.map((id) => technologyById[id]).filter(Boolean);

	const categories = useMemo(() => {
		return technologyCategories
			.map((category) => ({
				...category,
				items: category.items.filter((item) => {
					const matchesText = `${item.name} ${item.category}`
						.toLowerCase()
						.includes(normalized);
					const matchesCategory =
						activeCategory === "all" || category.name === activeCategory;
					const matchesSelected = !selectedOnly || selectedSet.has(item.id);
					return matchesText && matchesCategory && matchesSelected;
				}),
			}))
			.filter((category) => category.items.length);
	}, [activeCategory, normalized, selectedOnly, selectedSet]);

	const toggle = (id) => {
		if (selectedSet.has(id)) onChange(selected.filter((value) => value !== id));
		else onChange([...selected, id]);
	};

	return (
		<div className="tech-picker">
			<div className="search-field">
				<Search size={16} />
				<input
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					placeholder={searchPlaceholder}
				/>
				{query && (
					<button
						type="button"
						className="plain-icon"
						onClick={() => setQuery("")}
						aria-label={t(language, "aria.clearSearch")}
					>
						<X size={15} />
					</button>
				)}
			</div>

			<div className="selected-tech-summary">
				<div className="selected-tech-title">
					<strong>
						{selected.length} {selectedLabel}
					</strong>
					{selected.length > 0 && (
						<button
							type="button"
							className="text-action"
							onClick={() => onChange([])}
						>
							{t(language, "techPicker.clear")}
						</button>
					)}
				</div>
				<div className="selected-tech-list">
					{selectedTech.slice(0, 18).map((tech) => (
						<button
							type="button"
							className="selected-tech-chip"
							key={tech.id}
							onClick={() => toggle(tech.id)}
						>
							<TechIcon tech={tech} size={18} />
							<span>{tech.name}</span>
							<X size={13} />
						</button>
					))}
					{selectedTech.length > 18 && (
						<span className="more-chip">+{selectedTech.length - 18}</span>
					)}
				</div>
			</div>

			<div
				className="tech-toolbar"
				aria-label={t(language, "aria.technologyFilters")}
			>
				<ListFilter size={14} />
				<button
					type="button"
					className={activeCategory === "all" ? "active" : ""}
					onClick={() => setActiveCategory("all")}
				>
					{t(language, "techPicker.all")}
				</button>
				{technologyCategories.map((category) => (
					<button
						type="button"
						key={category.name}
						className={activeCategory === category.name ? "active" : ""}
						onClick={() => setActiveCategory(category.name)}
					>
						{category.name}
					</button>
				))}
				<button
					type="button"
					className={`selected-filter ${selectedOnly ? "active" : ""}`}
					onClick={() => setSelectedOnly((current) => !current)}
				>
					<Check size={13} /> {t(language, "techPicker.selected")}
				</button>
			</div>

			<div className="tech-catalog">
				{categories.map((category) => (
					<section
						key={category.name}
						className="tech-category"
						id={`tech-category-${category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
					>
						<div className="tech-category-title">
							<span>{category.name}</span>
							<span>{category.items.length}</span>
						</div>
						<div className="tech-grid">
							{category.items.map((tech) => {
								const active = selectedSet.has(tech.id);
								return (
									<button
										type="button"
										key={tech.id}
										className={`tech-option ${active ? "selected" : ""}`}
										onClick={() => toggle(tech.id)}
									>
										<TechIcon tech={tech} size={24} />
										<span>{tech.name}</span>
										{active && <Check size={14} className="tech-check" />}
									</button>
								);
							})}
						</div>
					</section>
				))}
				{!categories.length && (
					<div className="empty-state compact">
						{t(language, "techPicker.empty")}
					</div>
				)}
			</div>
		</div>
	);
}
