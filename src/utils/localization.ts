import type { LanguageCode, LocalizedStringArray, LocalizedText, SkillDomain, SkillLevel } from '../types/skill'

export const getLocalizedText = (text: LocalizedText | undefined, lang: LanguageCode): string =>
  text?.[lang] || text?.en || text?.vi || ''

export const getLocalizedArray = (text: LocalizedStringArray | undefined, lang: LanguageCode): string[] =>
  text?.[lang] || text?.en || text?.vi || []

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
