import { toPng } from 'html-to-image'
import { useCallback } from 'react'

export function usePngExport() {
  const exportAsPng = useCallback(async (element: HTMLElement | null, filename?: string) => {
    if (!element) return

    const date = new Date().toISOString().split('T')[0]
    const defaultFilename = `system-design-tier-list-${date}.png`

    try {
      const dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0D1117', // Match dark theme base color
        skipFonts: false,
        fontEmbedCSS: `
          @font-face {
            font-family: 'JetBrains Mono';
            src: url('https://fonts.gstatic.com/s/jetbrainsmono/v23/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0P9T8x5Onw.woff2') format('woff2');
            font-weight: 400 700;
            font-style: normal;
            font-display: swap;
          }
        `,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        filter: (node) => {
          // Exclude the detail panel and backdrop from export
          if (node.classList?.contains?.('detail-panel')) return false
          if (node.classList?.contains?.('detail-backdrop')) return false
          if (node.classList?.contains?.('app-header')) return false
          return true
        },
      })

      const link = document.createElement('a')
      link.download = filename || defaultFilename
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('Failed to export PNG:', error)
      throw error
    }
  }, [])

  return { exportAsPng }
}