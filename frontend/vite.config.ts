import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    base:
      mode === "production" && env.VITE_PUBLIC_URL ? env.VITE_PUBLIC_URL : "/",
    plugins: [react()],
    css: {
      postcss: {
        plugins: [autoprefixer],
      },
    },
  };
});
