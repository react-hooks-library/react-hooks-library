import { useState } from 'react'
import { useMount } from '..'

import { useEventListener } from '../useEventListener'
import { _window } from '../_ssr.config'

export interface Router {
  trigger: string
  state?: any
  length?: number
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
}

const buildState = (trigger: string): Router => {
  const { state, length } = _window?.history || {}
  const {
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search
  } = _window?.location || {}

  return {
    trigger,
    state,
    length,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search
  }
}

/**
 * Reactive browser location.
 *
 * @see https://react-hooks-library.vercel.app/core/useDebounce
 *
 */
export function useRouter() {
  const [state, setState] = useState<Router | null>(null)

  useMount(() => {
    setState(buildState('load'))
  })

  useEventListener('popstate', () => setState(buildState('popstate')), {
    passive: true
  })

  useEventListener('hashchange', () => setState(buildState('hashchange')), {
    passive: true
  })

  return state
}
