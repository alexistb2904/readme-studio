import { X } from "lucide-react";
import { t } from "../i18n.js";

export default function Modal({
	open,
	title,
	children,
	onClose,
	size = "md",
	language = "en",
}) {
	if (!open) return null;
	return (
		<div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
			<section
				className={`modal modal-${size}`}
				role="dialog"
				aria-modal="true"
				aria-label={title}
				onMouseDown={(event) => event.stopPropagation()}
			>
				<header className="modal-header">
					<h2>{title}</h2>
					<button
						className="icon-button"
						type="button"
						onClick={onClose}
						aria-label={t(language, "aria.close")}
					>
						<X size={18} />
					</button>
				</header>
				<div className="modal-content">{children}</div>
			</section>
		</div>
	);
}
