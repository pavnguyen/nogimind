import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormattedText } from './FormattedText'

describe('FormattedText', () => {
  it('keeps a single sentence out of the heading style', () => {
    // Regression: any sentence shorter than 80 characters without a final period
    // used to become an uppercase <h3>. The Fix tab renders its safety rules
    // through this component.
    render(<FormattedText text="Giữ đầu ở ngoài hông để tránh Guillotine counter" />)

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByText(/Giữ đầu ở ngoài hông/)).toBeInTheDocument()
  })

  it('still promotes a label inside structured, multi-line text', () => {
    render(<FormattedText text={'Điểm chính\n\n1. Giữ hông thấp\n2. Đẩy gối họ lên ngực'} />)

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Điểm chính')
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
  })

  it('renders inline text as one run, with bold markers', () => {
    render(<FormattedText inline text="**Khuỷu** sát người" />)

    expect(screen.queryByRole('heading')).toBeNull()
    expect(screen.getByText('Khuỷu').tagName).toBe('STRONG')
  })
})
