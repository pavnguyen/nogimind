import type { SVGProps } from 'react'
import { BJJ_GLYPHS, type BjjIconName } from './paths'

type BjjIconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  name: BjjIconName
  /** Pixel size; defaults to 1em so it tracks the surrounding text size. */
  size?: number | string
  /** Override the 2px outline weight when a lighter stroke is needed. */
  strokeWidth?: number
}

/**
 * Renders a custom BJJ glyph.
 *
 * Mirrors the lucide-react API surface used across the app (`className`, `size`,
 * `strokeWidth`, `aria-hidden`) so both icon families are interchangeable.
 *
 * @example
 * <BjjIcon name="choke" className="h-4 w-4" />
 */
export const BjjIcon = ({ name, size = '1em', strokeWidth, className, ...rest }: BjjIconProps) => {
  const glyph = BJJ_GLYPHS[name]
  const width = strokeWidth ?? glyph.strokeWidth ?? 2

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph.circles?.map(([cx, cy, r]) => <circle key={`c-${cx}-${cy}-${r}`} cx={cx} cy={cy} r={r} />)}
      {glyph.paths?.map((d) => <path key={d} d={d} />)}
    </svg>
  )
}
