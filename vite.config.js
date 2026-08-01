import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const defaultBuyMeACoffeeUrl = "https://buymeacoffee.com/alexistb2904";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const buyMeACoffeeUrl =
		process.env.VITE_BUYMEACOFFEE_URL ||
		env.VITE_BUYMEACOFFEE_URL ||
		defaultBuyMeACoffeeUrl;

	return {
		plugins: [react()],
		base: "/readme-studio/",
		define: {
			"import.meta.env.VITE_BUYMEACOFFEE_URL": JSON.stringify(buyMeACoffeeUrl),
		},
	};
});
