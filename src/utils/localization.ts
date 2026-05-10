import type { LanguageCode, LocalizedStringArray, LocalizedText, SkillDomain, SkillLevel } from '../types/skill'

const viPhraseReplacements: Array<[RegExp, string]> = [
  [/Frames and Pummeling/g, 'Frame và pummel'],
  [/first checkpoint/g, 'mốc kiểm soát đầu tiên'],
  [/control checkpoint/g, 'mốc kiểm soát'],
  [/checkpoint/g, 'mốc kiểm soát'],
  [/head line/g, 'đường đầu'],
  [/lower body/g, 'thân dưới'],
  [/upper body/g, 'thân trên'],
  [/body alignment/g, 'căn chỉnh cơ thể'],
  [/Head position/g, 'Vị trí đầu'],
  [/Hand fighting/g, 'Đấu tay'],
  [/hand fight/g, 'đấu tay'],
  [/Win hands\./g, 'Thắng tay.'],
  [/Win hands/g, 'Thắng tay'],
  [/Head in\./g, 'Đầu vào trong.'],
  [/Head in/g, 'Đầu vào trong'],
  [/Checkpoint first\./g, 'Lấy mốc kiểm soát trước.'],
  [/Checkpoint first/g, 'Lấy mốc kiểm soát trước'],
  [/Lower body tight\./g, 'Thân dưới siết chặt.'],
  [/Lower body tight/g, 'Thân dưới siết chặt'],
  [/Keep the head on the safe or inside side\./g, 'Giữ đầu ở bên an toàn hoặc bên trong.'],
  [/Control hands, grips, or frames before forcing\./g, 'Kiểm soát tay, grip hoặc frame trước khi cố ép.'],
  [/Use hips, knees, or feet to keep angle and base\./g, 'Dùng hông, gối hoặc bàn chân để giữ angle và base.'],
  [/Win the first checkpoint for frame và pummel\./g, 'Tay, đầu hoặc hông phải thắng mốc kiểm soát đầu tiên trước khi ép tiếp.'],
  [/Win the first checkpoint for frames and pummeling\./gi, 'Tay, đầu hoặc hông phải thắng mốc kiểm soát đầu tiên trước khi ép tiếp.'],
  [/A clear first checkpoint decides the next action\./g, 'Mốc kiểm soát rõ ràng quyết định bước tiếp theo.'],
  [/Head position controls direction and timing\./g, 'Vị trí đầu kiểm soát hướng và timing.'],
  [/Hands determine whether the lane stays open\./g, 'Tay quyết định line còn mở hay bị đóng.'],
  [/Lower body alignment keeps control alive\./g, 'Căn chỉnh thân dưới giữ kiểm soát còn sống.'],
  [/Branch early\./g, 'Đổi nhánh sớm.'],
  [/Branch early/g, 'Đổi nhánh sớm'],
  [/Control line/g, 'Đường kiểm soát'],
  [/\bhands\b/g, 'tay'],
  [/\bhead\b/g, 'đầu'],
  [/\belbows\b/g, 'khuỷu tay'],
  [/\bhips\b/g, 'hông'],
  [/\bfeet\b/g, 'bàn chân'],
  [/\bknees\b/g, 'gối'],
  [/\bwrists\b/g, 'cổ tay'],
  [/\bforearms\b/g, 'cẳng tay'],
]

const viTokenLabels: Record<string, string> = {
  hand: 'tay',
  hands: 'tay',
  wrist: 'cổ tay',
  wrists: 'cổ tay',
  forearm: 'cẳng tay',
  forearms: 'cẳng tay',
  elbow: 'khuỷu tay',
  elbows: 'khuỷu tay',
  head: 'đầu',
  ears: 'tai',
  ear: 'tai',
  shoulder: 'vai',
  shoulders: 'vai',
  chest: 'ngực',
  sternum: 'xương ức',
  ribs: 'xương sườn',
  hip: 'hông',
  hips: 'hông',
  pelvis: 'pelvis',
  knee: 'gối',
  knees: 'gối',
  shin: 'ống quyển',
  shins: 'ống quyển',
  foot: 'bàn chân',
  feet: 'bàn chân',
  heel: 'gót',
  heels: 'gót',
  toes: 'ngón chân',
  grip: 'grip',
  timing: 'timing',
  pressure: 'áp lực',
  angle: 'angle',
  safety: 'an toàn',
  finish: 'finish',
  escape: 'thoát',
  hook: 'hook',
  micro_adjustment: 'chỉnh nhỏ',
}

export const getTechnicalTokenLabel = (value: string, lang: LanguageCode) => {
  if (lang !== 'vi') return value.replace(/_/g, ' ')
  return viTokenLabels[value] ?? value.replace(/_/g, ' ')
}

const polishVietnameseText = (value: string) => {
  let result = value
  viPhraseReplacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement)
  })

  return result
}

export const getLocalizedText = (text: LocalizedText | undefined, lang: LanguageCode): string =>
  lang === 'vi' ? polishVietnameseText(text?.vi || text?.en || '') : text?.[lang] || text?.en || text?.vi || ''

export const getLocalizedArray = (text: LocalizedStringArray | undefined, lang: LanguageCode): string[] =>
  text?.[lang] || text?.en || text?.vi || []

const needsGloss = (value: string) => {
  const trimmed = value.trim()
  return trimmed.length > 0 && trimmed.length <= 120
}

export const getLocalizedTechnicalText = (text: LocalizedText | undefined, lang: LanguageCode): string => {
  const primary = getLocalizedText(text, lang)
  if (!text || lang === 'en') return primary
  const gloss = text.en?.trim()
  if (!gloss || gloss === primary || !needsGloss(primary)) return primary
  return `${primary} (${gloss})`
}

export const getLocalizedTechnicalArray = (text: LocalizedStringArray | undefined, lang: LanguageCode): string[] => {
  const items = getLocalizedArray(text, lang)
  if (!text || lang === 'en') return items
  return items.map((item, index) => {
    const gloss = text.en?.[index]?.trim()
    if (!gloss || gloss === item || !needsGloss(item)) return item
    return `${item} (${gloss})`
  })
}

const domainLabels: Record<SkillDomain, LocalizedText> = {
  positional_awareness: { vi: 'Nhận thức vị trí', en: 'Positional Awareness', fr: 'Conscience positionnelle' },
  survival_defense: { vi: 'Sinh tồn & phòng thủ', en: 'Survival & Defense', fr: 'Survie & défense' },
  escapes: { vi: 'Thoát vị trí', en: 'Escapes', fr: 'Escapes' },
  guard_retention: { vi: 'Giữ guard', en: 'Guard Retention', fr: 'Rétention de garde' },
  guard_offense: { vi: 'Tấn công từ guard', en: 'Guard Offense', fr: 'Attaque de garde' },
  wrestle_up_wrestling: { vi: 'Wrestle-Up & wrestling', en: 'Wrestle-Up & Wrestling', fr: 'Wrestle-up & lutte' },
  passing: { vi: 'Passing', en: 'Passing', fr: 'Passing' },
  pins_rides: { vi: 'Pin & ride', en: 'Pins & Rides', fr: 'Pins & rides' },
  back_control: { vi: 'Kiểm soát lưng', en: 'Back Control', fr: 'Contrôle du dos' },
  submission_systems: { vi: 'Hệ thống submission', en: 'Submission Systems', fr: 'Systèmes de soumission' },
}

const levelLabels: Record<SkillLevel, LocalizedText> = {
  beginner: { vi: 'Cơ bản', en: 'Beginner', fr: 'Débutant' },
  intermediate: { vi: 'Trung cấp', en: 'Intermediate', fr: 'Intermédiaire' },
  advanced: { vi: 'Nâng cao', en: 'Advanced', fr: 'Avancé' },
}

export const getDomainLabel = (domain: SkillDomain, lang: LanguageCode) => getLocalizedText(domainLabels[domain], lang)
export const getLevelLabel = (level: SkillLevel, lang: LanguageCode) => getLocalizedText(levelLabels[level], lang)
