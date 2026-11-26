"use client"

// Navigation for the prototype. Normally it is Next's own: each screen is a
// route. A shared copy (an artifact, or any single HTML file) cannot change
// path, so a build with NEXT_PUBLIC_PROTOTYPE_SINGLE=1 keeps every screen on
// one page and moves between them with the URL hash instead.
import { useMemo, useSyncExternalStore } from "react"
import NextLink from "next/link"
import { useRouter as useNextRouter } from "next/navigation"

export const SINGLE = process.env.NEXT_PUBLIC_PROTOTYPE_SINGLE === "1"

const screens = {
  "/app": "home",
  "/app/setup/business": "business",
  "/app/setup/workers": "workers",
  "/app/setup/review": "review",
} as const

export type Screen = (typeof screens)[keyof typeof screens]

const toHash = (href: string) =>
  `#${(screens as Record<string, Screen>)[href] ?? "home"}`

/** Next's Link, or a hash link in the one-page build. */
export function Link({
  href,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & { href: string }) {
  return SINGLE ? (
    <a href={toHash(href)} {...props} />
  ) : (
    <NextLink href={href} {...props} />
  )
}

/** push and replace, as Next's router has them. */
export function useRouter() {
  const router = useNextRouter()
  return useMemo(
    () => ({
      push(href: string) {
        if (SINGLE) window.location.hash = toHash(href)
        else router.push(href)
      },
      replace(href: string) {
        if (SINGLE) window.location.replace(toHash(href))
        else router.replace(href)
      },
    }),
    [router]
  )
}

const subscribe = (listener: () => void) => {
  window.addEventListener("hashchange", listener)
  return () => window.removeEventListener("hashchange", listener)
}

/** Which screen the hash names. Only meaningful in the one-page build. */
export function useScreen(): Screen {
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => ""
  )
  return (Object.values(screens) as string[]).includes(hash) ? (hash as Screen) : "home"
}
