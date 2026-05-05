import { Link } from 'react-router-dom'
import type { GlossaryTerm } from '../../types/glossary'

const conceptKey = (text: string) => text.split(':')[0].trim().toLowerCase()

export const GlossaryLink = ({ text, terms }: { text: string; terms: GlossaryTerm[] }) => {
  const key = conceptKey(text)
  const term = terms.find((item) => item.term.toLowerCase() === key || item.id === key.replaceAll(' ', '-'))
  if (!term) return <span>{text}</span>
  return (
    <Link to={`/glossary?q=${encodeURIComponent(term.term)}`} className="text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 hover:text-cyan-100">
      {text}
    </Link>
  )
}
