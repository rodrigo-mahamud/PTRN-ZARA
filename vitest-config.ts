import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
   plugins: [react()],
   test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      css: true,
      deps: {
         inline: ["@testing-library/user-event", "@testing-library/react", "@testing-library/jest-dom"],
      },
      include: ["**/*.{test,spec}.{ts,tsx}"],
      exclude: ["node_modules/**", "dist/**", ".next/**", "coverage/**"],
      coverage: {
         provider: "v8",
         reporter: ["text", "json", "html"],
         exclude: ["node_modules/", "dist/", ".next/", "coverage/", "**/*.d.ts", "**/*.config.*", "**/types/*", "test/**"],
      },
      reporters: ["default"],
      watch: false,
      root: ".",
      environmentOptions: {
         jsdom: {
            resources: "usable",
         },
      },
   },
   resolve: {
      alias: {
         "@": resolve(__dirname, "./src"),
         test: resolve(__dirname, "./test"),
         react: "react",
         "react-dom": "react-dom",
         "@testing-library/react": "@testing-library/react",
         "@testing-library/user-event": "@testing-library/user-event",
      },
   },
});
