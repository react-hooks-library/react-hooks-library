import { useEffect, useState } from 'react'
import { isClient } from '@react-hooks-library/shared'

/**
 * Reactive media query hook that returns the truthy value of the media query.
 *
 * @param {string} query
 * @returns {boolean} boolean value of the query
 *
 * @see https://react-hooks-library.vercel.app/core/useMediaQuery
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(isClient ? window.matchMedia(query).matches : false)

  useEffect(() => {
    setMatches(window.matchMedia(query).matches)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener for old safari browsers
    'addEventListener' in mediaQuery
      ? mediaQuery.addEventListener('change', handler)
      : mediaQuery.addListener(handler)

    return () => {
      'addEventListener' in mediaQuery
        ? mediaQuery.removeEventListener('change', handler)
        : mediaQuery.removeListener(handler)
    }
  }, [query])

  return matches
}
