/**
 * Section accent tokens shared by `SectionAccordion` and `SkillSectionNav`.
 *
 * Kept in its own module (instead of exporting from the component file) so the
 * two components stay fast-refresh friendly.
 */

export type SectionAccent = 'gold' | 'jade' | 'sea' | 'steel' | 'moss' | 'copper' | 'warm'

type AccentStyle = {
  /** Small status dot in the accordion header and the nav chips. */
  dot: string
  /** Section border on idle / hover. */
  border: string
  /** Active nav chip (mobile strip). */
  chipActive: string
  /** Active nav row (desktop rail). */
  railActive: string
  /** Text tone for the active nav row. */
  textActive: string
}

export const SECTION_ACCENTS: Record<SectionAccent, AccentStyle> = {
  gold: {
    dot: 'bg-gold-400',
    border: 'border-gold-400/18 hover:border-gold-300/32',
    chipActive: 'border-gold-300/40 bg-gold-300/[0.12] text-gold',
    railActive: 'border-gold-300/60 bg-gold-300/[0.07]',
    textActive: 'text-gold',
  },
  jade: {
    dot: 'bg-jade-400',
    border: 'border-jade-400/18 hover:border-jade-300/32',
    chipActive: 'border-jade-300/40 bg-jade-300/[0.12] text-jade',
    railActive: 'border-jade-300/60 bg-jade-300/[0.07]',
    textActive: 'text-jade',
  },
  sea: {
    dot: 'bg-sea-400',
    border: 'border-sea-400/18 hover:border-sea-300/32',
    chipActive: 'border-sea-300/40 bg-sea-300/[0.12] text-sea',
    railActive: 'border-sea-300/60 bg-sea-300/[0.07]',
    textActive: 'text-sea',
  },
  steel: {
    dot: 'bg-steel-400',
    border: 'border-steel-400/18 hover:border-steel-300/32',
    chipActive: 'border-steel-300/40 bg-steel-300/[0.12] text-steel',
    railActive: 'border-steel-300/60 bg-steel-300/[0.07]',
    textActive: 'text-steel',
  },
  moss: {
    dot: 'bg-moss-400',
    border: 'border-moss-400/18 hover:border-moss-300/32',
    chipActive: 'border-moss-300/40 bg-moss-300/[0.12] text-moss',
    railActive: 'border-moss-300/60 bg-moss-300/[0.07]',
    textActive: 'text-moss',
  },
  copper: {
    dot: 'bg-copper-400',
    border: 'border-copper-400/18 hover:border-copper-300/32',
    chipActive: 'border-copper-300/40 bg-copper-300/[0.12] text-copper',
    railActive: 'border-copper-300/60 bg-copper-300/[0.07]',
    textActive: 'text-copper',
  },
  warm: {
    dot: 'bg-warm-400',
    border: 'border-warm-50/[0.08] hover:border-warm-50/16',
    chipActive: 'border-warm-50/20 bg-warm-50/[0.08] text-warm-100',
    railActive: 'border-warm-50/25 bg-warm-50/[0.05]',
    textActive: 'text-warm-100',
  },
}
