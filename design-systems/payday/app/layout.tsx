import type { Metadata } from "next"
import { Geist, Newsreader } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

// Geist for text and controls, Newsreader for headings. There is no monospace.
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "Payday · the FairShift design system",
  description:
    "The design system behind FairShift: warm paper, near-black ink and one blue, built on shadcn/ui.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("font-sans antialiased", geist.variable, newsreader.variable)}
    >
      <body>
        <ThemeProvider defaultTheme="light" enableSystem={false}>
          <TooltipProvider>
            <Toaster>{children}</Toaster>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
