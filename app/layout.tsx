import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { NavCard } from "@/components/navigation/NavCard/navcard";
import { FooterCard } from "@/components/navigation/FooterCard/footercard";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vouch",
  description:
    "Cost of living going up? Need somewhere where you can find good deals - Vouch finds the best deals from top Aussie services so you get more just for signing up. No gimmicks. Just real rewards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-804255444"
          strategy="afterInteractive"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-804255444');`,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
     <body className="min-h-full flex flex-col">
      <NavCard/>

      {children}

        <Analytics />
        <SpeedInsights/>
        <FooterCard/>
      </body>
    </html>
  );
}
