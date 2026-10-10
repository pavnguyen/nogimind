import { useMemo } from 'react'
import { cn } from '../../utils/cn'

type LineType = 'empty' | 'numbered' | 'header' | 'text'

type ParsedLine = {
  type: LineType
  content: string
  number?: number
}

type Group = {
  type: 'list' | 'paragraph' | 'header' | 'spacer'
  items: ParsedLine[]
}

/**
 * Heading detection only applies to structured text.
 *
 * A string without a single line break is one sentence the caller has already
 * styled, so it must not be promoted: the old heuristic turned every sentence
 * shorter than 80 characters that lacked a final period into an uppercase
 * <h3> (for example the safety rules in the Fix tab, or a French sentence
 * ending on a space before its question mark).
 */
function isStructured(text: string): boolean {
  const lines = text.split('\n')
  return lines.length > 1 && lines.some((line) => line.trim().length > 0)
}

function parseLines(text: string, structured: boolean): ParsedLine[] {
  return text.split('\n').map((line) => {
    const trimmed = line.trim()
    if (!trimmed) return { type: 'empty', content: '' }

    const numberedMatch = trimmed.match(/^(\d+)\.\s*(.+)/)
    if (numberedMatch) {
      return { type: 'numbered', content: numberedMatch[2], number: parseInt(numberedMatch[1], 10) }
    }

    // Detect if this looks like a section header (short, no punctuation ending, typically a title)
    if (
      structured &&
      trimmed.length < 80 &&
      !trimmed.endsWith('.') &&
      !trimmed.endsWith(':') &&
      /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]/u.test(trimmed) &&
      !trimmed.startsWith('•')
    ) {
      return { type: 'header', content: trimmed }
    }

    return { type: 'text', content: trimmed }
  })
}

function buildGroups(lines: ParsedLine[]): Group[] {
  const groups: Group[] = []
  let i = 0

  while (i < lines.length) {
    if (lines[i].type === 'empty') {
      groups.push({ type: 'spacer', items: [lines[i]] })
      i++
      continue
    }

    if (lines[i].type === 'numbered') {
      const items: ParsedLine[] = []
      while (i < lines.length && lines[i].type === 'numbered') {
        items.push(lines[i])
        i++
      }
      groups.push({ type: 'list', items })
      continue
    }

    if (lines[i].type === 'header') {
      groups.push({ type: 'header', items: [lines[i]] })
      i++
      continue
    }

    // Collect consecutive text lines into a paragraph
    const items: ParsedLine[] = []
    while (
      i < lines.length &&
      lines[i].type !== 'empty' &&
      lines[i].type !== 'numbered' &&
      lines[i].type !== 'header'
    ) {
      if (lines[i].type === 'text') items.push(lines[i])
      i++
    }
    if (items.length > 0) {
      groups.push({ type: 'paragraph', items })
    }
  }

  return groups
}

function renderInlineContent(text: string) {
  // Handle bold markers (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-warm-50">{part.slice(2, -2)}</strong>
    }
    return part
  })
}

type FormattedTextProps = {
  text: string
  className?: string
  /**
   * Renders one inline run of text instead of block groups: no heading, list or
   * paragraph detection, only the `**bold**` markers. Use it inside compact
   * cards where a short string must not become a heading.
   */
  inline?: boolean
}

export const FormattedText = ({ text, className, inline = false }: FormattedTextProps) => {
  const groups = useMemo(() => {
    if (inline) return []
    const lines = parseLines(text, isStructured(text))
    return buildGroups(lines)
  }, [text, inline])

  if (inline) {
    return (
      <span className={cn('leading-6 text-warm-300', className)}>
        {renderInlineContent(text.replace(/\s+/g, ' ').trim())}
      </span>
    )
  }

  return (
    <div className={cn('space-y-3 leading-7 text-warm-300', className)}>
      {groups.map((group, gi) => {
        switch (group.type) {
          case 'spacer':
            return <div key={gi} className="h-2" />

          case 'header':
            return (
              <h3 key={gi} className="text-sm font-semibold uppercase tracking-wide text-gold">
                {group.items[0]?.content}
              </h3>
            )

          case 'paragraph':
            return (
              <p key={gi}>
                {group.items.map((item, ii) => (
                  <span key={ii}>
                    {renderInlineContent(item.content)}
                    {ii < group.items.length - 1 && ' '}
                  </span>
                ))}
              </p>
            )

          case 'list':
            return (
              <ol key={gi} className="space-y-1.5">
                {group.items.map((item, li) => (
                  <li key={li} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-gold">
                      {item.number ?? li + 1}.
                    </span>
                    <span>{renderInlineContent(item.content)}</span>
                  </li>
                ))}
              </ol>
            )
        }
      })}
    </div>
  )
}
