import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "https://plum.startupemulator.com/",
  },
};
export default config;
