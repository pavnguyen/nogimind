import type { LocalizedStringArray, LocalizedText, SkillDomain, SkillLevel } from '../../types/skill'

export const lt = (vi: string, en: string, fr: string): LocalizedText => ({ vi, en, fr })

export const la = (vi: string[], en: string[], fr: string[]): LocalizedStringArray => ({
  vi,
  en,
  fr,
})

export type SkillSeed = {
  id: string
  title: LocalizedText
  domain: SkillDomain
  level: SkillLevel
  tags: string[]
  shortDescription: LocalizedText
  why: LocalizedText
  situation: LocalizedText
  goal: LocalizedText
  concepts: string[]
  prerequisites: string[]
  relatedSkills: string[]
}

export const seed = (
  id: string,
  viTitle: string,
  enTitle: string,
  frTitle: string,
  domain: SkillDomain,
  level: SkillLevel,
  tags: string[],
  viDescription: string,
  enDescription: string,
  frDescription: string,
  viGoal: string,
  enGoal: string,
  frGoal: string,
  concepts: string[],
  prerequisites: string[],
  relatedSkills: string[],
): SkillSeed => ({
  id,
  title: lt(viTitle, enTitle, frTitle),
  domain,
  level,
  tags,
  shortDescription: lt(viDescription, enDescription, frDescription),
  why: id === 'competition-ruleset-awareness'
    ? lt(
        'Nhận thức luật thi đấu giúp bạn chọn chiến thuật phù hợp với luật, điểm số, đồng hồ và mức rủi ro thay vì dùng cùng một game plan cho mọi giải.',
        'Ruleset Awareness helps you choose tactics that match the rules, score, clock, and risk level instead of using one game plan everywhere.',
        'La conscience du règlement aide à choisir une tactique adaptée aux règles, au score, au chrono et au niveau de risque au lieu d’utiliser le même game plan partout.',
      )
    : lt(
        `${viTitle} giúp bạn hiểu exchange đang đi về đâu, chọn phản ứng sớm và nối kỹ thuật thành hệ thống có kiểm chứng.`,
        `${enTitle} helps you read where the exchange is going, choose early responses, and connect techniques into a testable system.`,
        `${frTitle} aide à lire la direction de l’échange, choisir une réponse tôt, et connecter les techniques en système testable.`,
      ),
  situation: id === 'competition-ruleset-awareness'
    ? lt(
        'Dùng trước giải, trước round hoặc khi trận đổi trạng thái điểm số/thời gian để quyết định nên giữ control, tăng pace, kéo guard, tấn công chân hay reset an toàn.',
        'Use it before a tournament, before a round, or when score/time changes so you can decide whether to hold control, raise pace, pull guard, attack legs, or reset safely.',
        'À utiliser avant compétition, avant le round ou quand score/temps change pour décider s’il faut tenir le contrôle, accélérer, pull guard, attaquer jambes ou reset en sécurité.',
      )
    : lt(
        `Dùng khi bạn gặp tình huống liên quan ${viTitle.toLowerCase()} trong drilling, positional sparring hoặc live rolling.`,
        `Use it when the round enters a ${enTitle.toLowerCase()} situation during drilling, positional sparring, or live rolling.`,
        `À utiliser quand le round entre dans une situation de ${frTitle.toLowerCase()} pendant le drill, le sparring positionnel ou le live rolling.`,
      ),
  goal: lt(viGoal, enGoal, frGoal),
  concepts,
  prerequisites,
  relatedSkills,
})
