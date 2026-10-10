import { describe, it, expect } from 'vitest'
import { splitProblemAndFix, previewOf, firstItemPreview, splitCues } from './skillParagraphs'

describe('splitProblemAndFix', () => {
  it('splits an English question-form entry', () => {
    expect(splitProblemAndFix("Can't straighten their arm? Pin the elbow to your hip with your legs.")).toEqual({
      problem: "Can't straighten their arm?",
      fix: 'Pin the elbow to your hip with your legs.',
    })
  })

  it('splits Vietnamese entries, which used to fall through the English-only regex', () => {
    expect(splitProblemAndFix('Không thể duỗi thẳng cánh tay của họ? Dùng chân kẹp khuỷu tay vào hông.')).toEqual({
      problem: 'Không thể duỗi thẳng cánh tay của họ?',
      fix: 'Dùng chân kẹp khuỷu tay vào hông.',
    })
    expect(splitProblemAndFix('Họ stack bạn? Đưa chân còn lại của bạn đến hông xa của họ.')).toEqual({
      problem: 'Họ stack bạn?',
      fix: 'Đưa chân còn lại của bạn đến hông xa của họ.',
    })
  })

  it('splits French entries that space the question mark', () => {
    expect(splitProblemAndFix('Impossible de tendre le bras ? Épinglez le coude sur la hanche.')).toEqual({
      problem: 'Impossible de tendre le bras ?',
      fix: 'Épinglez le coude sur la hanche.',
    })
  })

  it('splits the dash and colon forms used by key corrections', () => {
    expect(splitProblemAndFix('Nếu họ thả tay ra, đầu gối của bạn quá thấp - hãy đưa nó lên ngang vai.')).toEqual({
      problem: 'Nếu họ thả tay ra, đầu gối của bạn quá thấp',
      fix: 'hãy đưa nó lên ngang vai.',
    })
    expect(splitProblemAndFix('Bị flatten: underhook quá nông')).toEqual({
      problem: 'Bị flatten',
      fix: 'underhook quá nông',
    })
  })

  it('keeps single-thought entries whole', () => {
    expect(splitProblemAndFix('Coyote Half Guard là hệ thống Half Guard tấn công hiệu quả nhất trong no-gi')).toBeNull()
    expect(splitProblemAndFix('Tư thế bẻ gãy → mất thăng bằng → chọn sweep dựa trên phản ứng của họ')).toBeNull()
    expect(splitProblemAndFix('Release immediately when they tap')).toBeNull()
  })
})

describe('previewOf', () => {
  it('drops markdown bold markers and collapses whitespace', () => {
    expect(previewOf('**Elbow** line\n  stays tight')).toBe('Elbow line stays tight')
  })

  it('truncates long text on a word boundary', () => {
    const preview = previewOf('word '.repeat(40))
    expect(preview.endsWith('...')).toBe(true)
    expect(preview.length).toBeLessThan(120)
  })

  it('returns an empty string for undefined-like input', () => {
    expect(previewOf('   ')).toBe('')
  })
})

describe('splitCues', () => {
  it('splits an arrow chain into steps', () => {
    expect(splitCues('Đối thủ lùi lại hoặc trụ → xoay hông qua vai → vào Matrix.')).toEqual([
      'Đối thủ lùi lại hoặc trụ',
      'xoay hông qua vai',
      'vào Matrix.',
    ])
  })

  it('keeps a prose cue whole and does not split on commas', () => {
    const sentence =
      'Đứng trên đôi chân của bạn, vòng ra bên ngoài chân dẫn đầu của họ, buộc họ xoay hông và tấn công khoảng trống lộ ra ngoài.'
    expect(splitCues(sentence)).toEqual([sentence])
  })

  it('splits up to five steps and falls back to one cue beyond that', () => {
    expect(splitCues('a → b → c → d → e')).toHaveLength(5)

    const longChain = 'a → b → c → d → e → f'
    expect(splitCues(longChain)).toEqual([longChain])
    // The caller can also ask for a tighter cap.
    expect(splitCues('a → b → c → d', 3)).toEqual(['a → b → c → d'])
  })

  it('returns an empty list for blank input', () => {
    expect(splitCues('   ')).toEqual([])
  })
})

describe('firstItemPreview', () => {
  it('returns undefined for an empty list and the first item otherwise', () => {
    expect(firstItemPreview([])).toBeUndefined()
    expect(firstItemPreview(['Keep the elbow line.'])).toBe('Keep the elbow line.')
  })
})
