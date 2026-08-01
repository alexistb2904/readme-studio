import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, Eye, EyeOff, GripVertical, Trash2 } from "lucide-react";
import { componentDefinitions } from "../data/templates.js";
import { t } from "../i18n.js";

function SortableBlock({
	block,
	selected,
	language,
	onSelect,
	onToggle,
	onDuplicate,
	onDelete,
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: `block:${block.id}`,
		data: { kind: "block", blockId: block.id },
	});
	const definition = componentDefinitions[block.type];
	const style = { transform: CSS.Transform.toString(transform), transition };

	return (
		<article
			ref={setNodeRef}
			style={style}
			className={`canvas-block ${selected ? "selected" : ""} ${isDragging ? "dragging" : ""} ${!block.visible ? "is-hidden" : ""}`}
			onClick={() => onSelect(block.id)}
		>
			<button
				className="block-drag"
				type="button"
				{...attributes}
				{...listeners}
				aria-label={t(language, "aria.reorderComponent")}
			>
				<GripVertical size={17} />
			</button>
			<div className="block-main">
				<strong>
					{definition?.label[language] || definition?.label.en || block.type}
				</strong>
				<small>
					{definition?.description[language] || definition?.description.en}
				</small>
			</div>
			<div className="block-actions">
				<button
					type="button"
					className="plain-icon"
					onClick={(event) => {
						event.stopPropagation();
						onToggle(block.id);
					}}
					title={block.visible ? t(language, "visible") : t(language, "hidden")}
				>
					{block.visible ? <Eye size={16} /> : <EyeOff size={16} />}
				</button>
				<button
					type="button"
					className="plain-icon"
					onClick={(event) => {
						event.stopPropagation();
						onDuplicate(block.id);
					}}
					title={t(language, "duplicate")}
				>
					<Copy size={16} />
				</button>
				<button
					type="button"
					className="plain-icon danger"
					onClick={(event) => {
						event.stopPropagation();
						onDelete(block.id);
					}}
					title={t(language, "delete")}
				>
					<Trash2 size={16} />
				</button>
			</div>
		</article>
	);
}

export default function Canvas({
	blocks,
	selectedId,
	language,
	emptyText,
	onSelect,
	onToggle,
	onDuplicate,
	onDelete,
}) {
	const { setNodeRef, isOver } = useDroppable({
		id: "canvas-drop",
		data: { kind: "canvas" },
	});
	const ids = blocks.map((block) => `block:${block.id}`);

	return (
		<section className="canvas-panel app-panel">
			<div className="panel-heading canvas-heading">
				<div>
					<span className="panel-kicker">
						{t(language, "inspectorUi.canvasKicker")}
					</span>
					<h2>{t(language, "structure")}</h2>
				</div>
				<span className="count-badge">{blocks.length}</span>
			</div>
			<div
				ref={setNodeRef}
				className={`canvas-dropzone ${isOver ? "is-over" : ""}`}
			>
				<SortableContext items={ids} strategy={verticalListSortingStrategy}>
					{blocks.map((block) => (
						<SortableBlock
							key={block.id}
							block={block}
							selected={selectedId === block.id}
							language={language}
							onSelect={onSelect}
							onToggle={onToggle}
							onDuplicate={onDuplicate}
							onDelete={onDelete}
						/>
					))}
				</SortableContext>
				{!blocks.length && <div className="empty-canvas">{emptyText}</div>}
			</div>
		</section>
	);
}
