import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    pool: "forks",
    singleFork: true,
    setupFiles: ["./src/__tests__/setup.js"],
    testTimeout: 30000,
  },
})
