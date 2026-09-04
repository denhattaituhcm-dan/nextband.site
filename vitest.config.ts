import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [path.resolve(__dirname, "./nextband/src/test/setup.ts")],
    fileParallelism: false,
    testTimeout: 45000,
    hookTimeout: 45000,
    exclude: [
      "**/node_modules/**",
      "**/e2e/**",
      "**/*.spec.ts",
      "server/tests/deadline_and_status.test.mjs",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./nextband/src"),
      "@server": path.resolve(__dirname, "./server"),
    },
  },
});
