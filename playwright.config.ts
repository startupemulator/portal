import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    baseURL: "https://plum.startupemulator.com/",
  },
};
export default config;
