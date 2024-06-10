import { MaybeRef } from '@react-hooks-library/shared'
import { useCallback } from 'react'

import { _window } from '../_ssr.config'
import { useEventListener } from '../useEventListener'

export type Keys = string | string[]
export type KeyStrokeEventName = 'keydown' | 'keypress' | 'keyup'
export type KeyStrokeOptions = {
  /** Key Stroke Event Name
   *
   * Can only be one of the following:
   *  - keydown
   *  - keypress
   *  - keyup
   */
  eventName?: KeyStrokeEventName

  /** The DOM node to attach the event listener to
   * @default window
   */
  target?: MaybeRef<EventTarget>

  /**
   * when `true` will use `event.code`
   *
   * when `false` will use `event.key`
   *
   * @default false
   */
  code?: boolean

  /** TA boolean value that, if true,
   * indicates that the function specified by listener
   * will never call `preventDefault()`.
   *
   * @default window
   */
  passive?: false
}

/**
 * Listen for keyboard keys being stroked.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useKeyStroke
 */
export function useKeyStroke(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  const {
    target = _window,
    eventName = 'keydown',
    passive = false,
    code = false
  } = options

  const listener = useCallback(
    (e: KeyboardEvent) => {
      const eventKey = code ? e.code : e.key

      const matches =
        typeof keys === 'string' ? keys === eventKey : keys.includes(eventKey)
      if (matches) handler(e)
    },
    [code, handler, keys]
  )

  return useEventListener(target, eventName, listener, { passive })
}

/**
 * Listen for keyboard keys on keydown.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useKeyStroke
 */
export function useKeyDown(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keydown' })
}

/**
 * Listen for keyboard keys on keypress.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyPressed(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keypress' })
}

/**
 * Listen for keyboard keys on keyup.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyUp(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keyup' })
}
