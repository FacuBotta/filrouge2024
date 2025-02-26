import { defineConfig } from 'cypress';

export default defineConfig({
  video: true,
  e2e: {
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
