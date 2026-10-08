import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LazyYouTubeEmbed } from './LazyYouTubeEmbed'

const embedUrl = 'https://www.youtube.com/embed/abc12345678'

/** The player mounts from an effect once the card is in view. */
const renderPlayer = async (url = embedUrl) => {
  const utils = render(
    <LazyYouTubeEmbed youtubeId="abc12345678" embedUrl={url} title="Test video" />,
  )
  await screen.findByTitle('Test video')
  return utils
}

describe('LazyYouTubeEmbed', () => {
  it('renders the YouTube player itself, with no extra app play button', async () => {
    const { container } = await renderPlayer()

    const iframe = container.querySelector('iframe')
    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute('title')).toBe('Test video')
    // No app-owned play button, so the only control the viewer presses is
    // YouTube's own play button.
    expect(screen.queryByRole('button')).toBeNull()
  })

  it('does not autoplay the embed (playback starts on the viewer click)', async () => {
    const { container } = await renderPlayer()

    const src = container.querySelector('iframe')?.getAttribute('src') ?? ''
    expect(src).toBe(`${embedUrl}?playsinline=1&rel=0`)
    expect(src).not.toContain('autoplay=1')
  })

  it('appends playback params to embed urls that already carry a query string', async () => {
    const { container } = await renderPlayer(`${embedUrl}?start=30`)

    expect(container.querySelector('iframe')?.getAttribute('src')).toBe(
      `${embedUrl}?start=30&playsinline=1&rel=0`,
    )
  })

  it('allows the player the permissions it needs', async () => {
    const { container } = await renderPlayer()

    expect(container.querySelector('iframe')?.getAttribute('allow')).toContain('autoplay')
    expect(container.querySelector('iframe')?.hasAttribute('allowfullscreen')).toBe(true)
  })
})
