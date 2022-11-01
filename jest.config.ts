// jest.config.ts
import type { Config } from "@jest/types";
const blitzPreset = require("blitz/jest-preset");

const config: Config.InitialOptions = {
  ...blitzPreset,
  projects: blitzPreset.projects.map((p) => ({
    ...p,
    testPathIgnorePatterns: [...p.testPathIgnorePatterns, "FOLDER_TO_IGNORE"],
  })),
};
module.exports = {
  // ...
  testTimeout: 20000,
};
export default config;
