import { glossaryTerms } from '../src/data/glossaryTerms'
import { skillNodes } from '../src/data/skillNodes'
import { hasValidationErrors, validateSkillData } from '../src/utils/validateSkillData'

const result = validateSkillData(skillNodes, glossaryTerms)

console.log(`skills: ${result.skillCount}`)
console.log(`glossary terms: ${result.glossaryCount}`)
console.log(`missing translations: ${result.missingTranslations.length}`)
console.log(`missing related ids: ${result.missingRelatedIds.length}`)
console.log(`missing prerequisite ids: ${result.missingPrerequisiteIds.length}`)
console.log(`missing glossary related ids: ${result.missingGlossaryRelatedIds.length}`)
console.log(`skills missing body mechanics: ${result.missingBodyMechanics.length}`)
console.log(`complex skills under minimum depth: ${result.complexSkillsUnderDepth.length}`)
console.log(`phase depth issues: ${result.phasesUnderMinimum.length}`)
console.log(`empty strings: ${result.emptyStrings.length}`)
console.log(`placeholder hits: ${result.placeholders.length}`)

if (hasValidationErrors(result)) {
  console.error(JSON.stringify(result, null, 2))
  process.exit(1)
}

console.log('Skill data validation passed.')
