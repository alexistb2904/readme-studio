import { useState } from "react";

export default function TechIcon({ tech, size = 28, showLabel = false }) {
	const [failed, setFailed] = useState(false);
	const initials = tech.name
		.split(/\s+/)
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<span
			className={`tech-icon-wrap ${showLabel ? "with-label" : ""}`}
			title={tech.name}
		>
			{failed ? (
				<span
					className="tech-icon-fallback"
					style={{ width: size, height: size, fontSize: Math.max(9, size / 3) }}
				>
					{initials}
				</span>
			) : (
				<img
					className="tech-icon"
					src={`https://cdn.simpleicons.org/${tech.slug}`}
					alt=""
					width={size}
					height={size}
					loading="lazy"
					onError={() => setFailed(true)}
				/>
			)}
			{showLabel && <span>{tech.name}</span>}
		</span>
	);
}
