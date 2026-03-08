import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://codetree.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CodeTree — Learn to Code Interactively",
    template: "%s | CodeTree",
  },
  description:
    "Master coding with hands-on exercises, a live code editor, and a gamified learning experience. Learn HTML, CSS, JavaScript, React, Python, Gen AI, and more.",
  keywords: [
    "learn coding",
    "interactive coding",
    "coding exercises",
    "web development",
    "JavaScript",
    "React",
    "Python",
    "generative AI",
    "coding platform",
    "CodeTree",
  ],
  authors: [{ name: "CodeTree" }],
  creator: "CodeTree",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "CodeTree",
    title: "CodeTree — Learn to Code Interactively",
    description:
      "Master coding with hands-on exercises, a live code editor, and gamified learning. Build real skills in HTML, CSS, JavaScript, React, Python, and Gen AI.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CodeTree — Interactive Coding Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeTree — Learn to Code Interactively",
    description:
      "Hands-on coding exercises, live editor, and gamified learning. Start free today.",
    images: ["/og-image.png"],
    creator: "@codetree",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="canonical" href={baseUrl} />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased font-inter`}
        >
          <Provider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
            <Analytics />
            <Toaster
              position="bottom-right"
              theme="system"
              toastOptions={{
                className:
                  "!bg-[var(--bg-card)] !border !border-[var(--border-default)] !text-[var(--fg)] !shadow-lg",
              }}
            />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
