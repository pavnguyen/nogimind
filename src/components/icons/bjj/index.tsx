import type { SVGProps } from 'react'
import { BjjIcon } from './BjjIcon'

export { BjjIcon } from './BjjIcon'

type NamedIconProps = Omit<SVGProps<SVGSVGElement>, 'name'> & {
  size?: number | string
  strokeWidth?: number
}

/* ── Positions ───────────────────────────────────────────────────────────── */
export const BjjGuard = (props: NamedIconProps) => <BjjIcon name="guard" {...props} />
export const BjjMount = (props: NamedIconProps) => <BjjIcon name="mount" {...props} />
export const BjjBackTake = (props: NamedIconProps) => <BjjIcon name="backTake" {...props} />

export const BjjPositionIcons = [BjjGuard, BjjMount, BjjBackTake]

/* ── Attacks ─────────────────────────────────────────────────────────────── */
export const BjjHook = (props: NamedIconProps) => <BjjIcon name="hook" {...props} />
export const BjjGrip = (props: NamedIconProps) => <BjjIcon name="grip" {...props} />
export const BjjChoke = (props: NamedIconProps) => <BjjIcon name="choke" {...props} />
export const BjjLegLock = (props: NamedIconProps) => <BjjIcon name="legLock" {...props} />
export const BjjChain = (props: NamedIconProps) => <BjjIcon name="chain" {...props} />

export const BjjAttackIcons = [BjjHook, BjjGrip, BjjChoke, BjjLegLock, BjjChain]

/* ── Defensive ───────────────────────────────────────────────────────────── */
export const BjjEscape = (props: NamedIconProps) => <BjjIcon name="escape" {...props} />
export const BjjFrame = (props: NamedIconProps) => <BjjIcon name="frame" {...props} />
export const BjjTakedown = (props: NamedIconProps) => <BjjIcon name="takedown" {...props} />
export const BjjTap = (props: NamedIconProps) => <BjjIcon name="tap" {...props} />

export const BjjDefensiveIcons = [BjjEscape, BjjFrame, BjjTakedown, BjjTap]

/* ── Brand ───────────────────────────────────────────────────────────────── */
export const BjjBrandMark = (props: NamedIconProps) => <BjjIcon name="brand" {...props} />
