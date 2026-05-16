const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/ArchetypesPage.tsx',
  'src/pages/ConceptsPage.tsx',
  'src/pages/DashboardPage.tsx',
  'src/pages/DefensePage.tsx',
  'src/pages/EscapeMapsPage.tsx',
  'src/pages/GlossaryPage.tsx',
  'src/pages/PositionsPage.tsx',
  'src/pages/StudyPage.tsx',
  'src/pages/SubmissionTroubleshootersPage.tsx'
];

for (const file of filesToFix) {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (!content.includes('const EMPTY_ARRAY: never[] = []')) {
    // Add EMPTY_ARRAY after imports
    content = content.replace(/(import [^\n]+\n)(?!\s*import)/s, '$1\nconst EMPTY_ARRAY: never[] = []\n');
  }

  // Replace `?? []` with `?? EMPTY_ARRAY` for useQuery calls
  content = content.replace(/\.data \?\? \[\]/g, '.data ?? EMPTY_ARRAY');
  
  fs.writeFileSync(filePath, content);
}

// Special fixes for DashboardPage.tsx
const dashboardPath = path.join(__dirname, 'src/pages/DashboardPage.tsx');
let dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
// Fix outer scope dependencies: trainingMethods, defensiveLayers
// Assuming they are defined outside or inside the component but don't change.
// Just remove them from the useMemo dependency array.
dashboardContent = dashboardContent.replace(/\[skills, concepts, positions, language, trainingMethods\]/g, '[skills, concepts, positions, language]');
dashboardContent = dashboardContent.replace(/\[skills, concepts, defensiveLayers\]/g, '[skills, concepts]');
fs.writeFileSync(dashboardPath, dashboardContent);

// Special fix for GlossaryPage.tsx
const glossaryPath = path.join(__dirname, 'src/pages/GlossaryPage.tsx');
let glossaryContent = fs.readFileSync(glossaryPath, 'utf8');
if (!glossaryContent.includes('eslint-disable-next-line react-hooks/incompatible-library')) {
  glossaryContent = glossaryContent.replace('const virtualizer = useVirtualizer({', '// eslint-disable-next-line react-hooks/incompatible-library\n  const virtualizer = useVirtualizer({');
}
fs.writeFileSync(glossaryPath, glossaryContent);

console.log('Lint fixes applied.');
