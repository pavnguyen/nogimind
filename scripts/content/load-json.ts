import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CONTENT_ROOT = resolve(__dirname, '../../content')
const GENERATED_ROOT = resolve(__dirname, '../../public/generated')

export function jsonPath(...parts: string[]): string {
  return join(CONTENT_ROOT, ...parts)
}

export function generatedPath(...parts: string[]): string {
  return join(GENERATED_ROOT, ...parts)
}

export function readJson<T>(...parts: string[]): T {
  const fullPath = jsonPath(...parts)
  const raw = readFileSync(fullPath, 'utf-8')
  return JSON.parse(raw) as T
}

export function readGeneratedJson<T>(...parts: string[]): T {
  const fullPath = generatedPath(...parts)
  const raw = readFileSync(fullPath, 'utf-8')
  return JSON.parse(raw) as T
}

export function writeJson(filePath: string, data: unknown): void {
  const dir = dirname(filePath)
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  const output = JSON.stringify(data, null, 2)
  writeFileSync(filePath, output.endsWith('\n') ? output : output + '\n', 'utf-8')
}

export interface SkillLocation {
  domain: string
  id: string
}

export function discoverSkills(): SkillLocation[] {
  const skillsRoot = jsonPath('skills')
  const domains = readdirSync(skillsRoot, { withFileTypes: true }).filter(d => d.isDirectory())
  const skills: SkillLocation[] = []

  for (const domain of domains) {
    const domainPath = join(skillsRoot, domain.name)
    const skillDirs = readdirSync(domainPath, { withFileTypes: true }).filter(d => d.isDirectory())
    for (const skill of skillDirs) {
      skills.push({ domain: domain.name, id: skill.name })
    }
  }

  return skills
}

export function getSkillContentPath(domain: string, skillId: string): string {
  return jsonPath('skills', domain, skillId)
}
