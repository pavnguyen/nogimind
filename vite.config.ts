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
            // Heavy data files — split into dedicated chunks
            { name: 'micro-detail-data', test: /src\/data\/microDetailSystems/ },
            { name: 'technical-detail-data', test: /src\/data\/technicalDetails/ },
            { name: 'blackbelt-detail-data', test: /src\/data\/(blackbeltDetails|generatedBlackbeltDetails|generatedBodyToBodyDetails)/ },
            { name: 'quality-checklist-data', test: /src\/data\/qualityChecklists/ },
            { name: 'video-data', test: /src\/data\/videos/ },
            { name: 'defensive-data', test: /src\/data\/(defensiveLayers|archetypes|techniqueStateMachines)/ },
            { name: 'mastery-data', test: /src\/data\/(masteryStages|trainingMethods|sharedKnowledge)/ },

            // Skill seed files by domain
            { name: 'skills-modern', test: /src\/data\/(skills\/modern|modernExpansionSkills)/ },
            { name: 'skills-submissions', test: /src\/data\/skills\/submissions/ },
            { name: 'skills-passing', test: /src\/data\/skills\/passing/ },
            { name: 'skills-escapes', test: /src\/data\/skills\/escapes/ },
            { name: 'skills-guard', test: /src\/data\/skills\/guard/ },
            { name: 'skills-wrestling', test: /src\/data\/skills\/wrestling/ },
            { name: 'skills-leglocks', test: /src\/data\/skills\/legLocks/ },
            { name: 'skills-core', test: /src\/data\/(skills\/foundation|skills\/pins|skills\/skillSeedFactory|skillNodes|skillBuilder)/ },
            { name: 'skills-priority', test: /src\/data\/skills\/priorityNoGi/ },
            { name: 'generated-skill-data', test: /src\/data\/(generated|remainingCoverage)/ },

            // Reference & search
            { name: 'reference-data', test: /src\/data\/(glossaryTerms|concepts|positions)/ },
            { name: 'search-vendor', test: /node_modules\/minisearch/ },
            { name: 'search-engine', test: /src\/(utils\/searchEngine|workers\/searchWorker)/ },
          ],
        },
      },
    },
  },
})
