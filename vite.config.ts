import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// @ts-expect-error: vite-plugin-eslint does not provide proper type declarations
import eslint from "vite-plugin-eslint";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslint({
      failOnError: false, // Show errors but don't fail the build
      failOnWarning: false,
      include: ["src/**/*.ts", "src/**/*.tsx"],
      emitError: true, // This will emit errors as overlay during development
      emitWarning: true,
    }),
  ],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@layout": path.resolve(__dirname, "./src/layouts"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "+types": path.resolve(__dirname, "./src/+types.ts"),
    },
  },
});
