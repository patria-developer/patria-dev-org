import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'your-project-id';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'patria-dev-studio',
  title: 'Patria Dev Studio',
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
