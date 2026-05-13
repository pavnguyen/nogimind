import type { ReactNode } from 'react'

type Props = {
  header: ReactNode
  oneMinute?: ReactNode
  children: ReactNode
}

export const SkillDetailPageShell = ({ header, oneMinute, children }: Props) => (
  <>
    {oneMinute}
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {header}
      <div className="mt-6 space-y-3">{children}</div>
    </main>
  </>
)
