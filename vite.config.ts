import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'skills-modern', test: /src\/data\/(skills\/modern|modernExpansionSkills)/ },
            { name: 'skills-submissions', test: /src\/data\/skills\/submissions/ },
            { name: 'skills-passing', test: /src\/data\/skills\/passing/ },
            { name: 'skills-escapes', test: /src\/data\/skills\/escapes/ },
            { name: 'skills-guard', test: /src\/data\/skills\/guard/ },
            { name: 'skills-wrestling', test: /src\/data\/skills\/wrestling/ },
            { name: 'skills-leglocks', test: /src\/data\/skills\/legLocks/ },
            { name: 'skills-core', test: /src\/data\/(skills\/foundation|skills\/pins|skills\/skillSeedFactory|skillNodes)/ },
            { name: 'generated-skill-data', test: /src\/data\/(generated|remainingCoverage)/ },
            { name: 'reference-data', test: /src\/data\/(glossaryTerms|concepts|positions)/ },
            { name: 'search-vendor', test: /node_modules\/minisearch/ },
            { name: 'search-engine', test: /src\/(utils\/searchEngine|workers\/searchWorker)/ },
          ],
        },
      },
    },
  },
})
