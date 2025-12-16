'use client'

import { useEffect, useRef } from 'react'

interface ScrollDepthTrackerProps {
  articleTitle: string
}

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params: Record<string, any>
    ) => void
  }
}

export default function ScrollDepthTracker({ articleTitle }: ScrollDepthTrackerProps) {
  const depthMarksRef = useRef({
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  })

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100

      // Check each depth mark
      Object.keys(depthMarksRef.current).forEach((mark) => {
        const threshold = parseInt(mark)
        if (
          scrollPercentage >= threshold &&
          !depthMarksRef.current[mark as keyof typeof depthMarksRef.current]
        ) {
          depthMarksRef.current[mark as keyof typeof depthMarksRef.current] = true

          // Send event to Google Analytics if available
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: articleTitle,
              value: threshold,
              depth_percentage: threshold,
            })
          }

          // Also log to console for debugging (can be removed in production)
          console.log(`Scroll depth: ${threshold}% on article: ${articleTitle}`)
        }
      })
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [articleTitle])

  return null // This component doesn't render anything
}
