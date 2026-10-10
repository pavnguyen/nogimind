import { FormattedText } from '../common/FormattedText'
import { cn } from '../../utils/cn'

type Props = {
  /** The trigger: a failed attempt, an opponent reaction, or a symptom. */
  problem: string
  /** What to do about it. */
  fix: string
  className?: string
}

/**
 * One "trigger -> answer" row. Shared by the execution cues in the Learn tab
 * and the Fix It Fast list, so both read the same way in every locale.
 */
export const ProblemFixCard = ({ problem, fix, className }: Props) => (
  <div className={cn('rounded-xl border border-warm-50/[0.06] bg-warm-950/45 px-3 py-2.5', className)}>
    <div className="flex gap-2">
      <span aria-hidden="true" className="shrink-0 text-[13px] font-semibold leading-5 text-copper">?</span>
      <FormattedText inline text={problem} className="min-w-0 max-w-prose text-[13px] font-semibold leading-5 text-copper" />
    </div>
    <div className="mt-1.5 flex gap-2">
      <span aria-hidden="true" className="shrink-0 text-[13px] leading-6 text-jade">↳</span>
      <FormattedText inline text={fix} className="min-w-0 max-w-prose text-[13px] leading-6 text-jade" />
    </div>
  </div>
)
