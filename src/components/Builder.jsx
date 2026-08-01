import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createBlock } from "../data/templates.js";
import { t } from "../i18n.js";
import Canvas from "./Canvas.jsx";
import Inspector from "./Inspector.jsx";
import Palette from "./Palette.jsx";
import PreviewPane from "./PreviewPane.jsx";

export default function Builder({
	project,
	setProject,
	selectedId,
	setSelectedId,
	language,
	onCopy,
	onDownload,
	copied,
	onImportGithubProfile,
}) {
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);
	const selectedBlock =
		project.blocks.find((block) => block.id === selectedId) || null;

	const addBlock = (type, index = project.blocks.length) => {
		const block = createBlock(type, {}, project.profile.outputLanguage || "en");
		setProject((current) => {
			const blocks = [...current.blocks];
			blocks.splice(index, 0, block);
			return { ...current, blocks };
		});
		setSelectedId(block.id);
	};

	const onDragEnd = ({ active, over }) => {
		if (!over) return;
		const activeData = active.data.current;
		const overId = String(over.id);

		if (activeData?.kind === "palette") {
			const overBlockId = overId.startsWith("block:") ? overId.slice(6) : null;
			const index = overBlockId
				? project.blocks.findIndex((block) => block.id === overBlockId)
				: project.blocks.length;
			addBlock(activeData.type, index < 0 ? project.blocks.length : index);
			return;
		}

		if (activeData?.kind === "block") {
			const activeId = activeData.blockId;
			const overBlockId = overId.startsWith("block:") ? overId.slice(6) : null;
			if (!overBlockId || activeId === overBlockId) return;
			setProject((current) => {
				const oldIndex = current.blocks.findIndex(
					(block) => block.id === activeId,
				);
				const newIndex = current.blocks.findIndex(
					(block) => block.id === overBlockId,
				);
				if (oldIndex < 0 || newIndex < 0) return current;
				return {
					...current,
					blocks: arrayMove(current.blocks, oldIndex, newIndex),
				};
			});
		}
	};

	const toggle = (id) =>
		setProject((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id ? { ...block, visible: !block.visible } : block,
			),
		}));
	const duplicate = (id) =>
		setProject((current) => {
			const index = current.blocks.findIndex((block) => block.id === id);
			if (index < 0) return current;
			const copy = JSON.parse(JSON.stringify(current.blocks[index]));
			copy.id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
			const blocks = [...current.blocks];
			blocks.splice(index + 1, 0, copy);
			setSelectedId(copy.id);
			return { ...current, blocks };
		});
	const remove = (id) => {
		setProject((current) => ({
			...current,
			blocks: current.blocks.filter((block) => block.id !== id),
		}));
		if (selectedId === id) setSelectedId(null);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={onDragEnd}
		>
			<main className="builder-layout">
				<Palette language={language} onAdd={addBlock} />
				<Canvas
					blocks={project.blocks}
					selectedId={selectedId}
					language={language}
					emptyText={t(language, "emptyCanvas")}
					onSelect={setSelectedId}
					onToggle={toggle}
					onDuplicate={duplicate}
					onDelete={remove}
				/>
				<Inspector
					selectedBlock={selectedBlock}
					project={project}
					setProject={setProject}
					language={language}
					onImportGithubProfile={onImportGithubProfile}
				/>
				<PreviewPane
					project={project}
					language={language}
					onCopy={onCopy}
					onDownload={onDownload}
					copied={copied}
				/>
			</main>
		</DndContext>
	);
}
