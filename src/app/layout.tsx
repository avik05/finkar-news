import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoHindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Finkar News | Automated Financial Intelligence",
  description: "Fast, intelligent, and real-time financial news aggregator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = 'paper';
                  var storage = localStorage.getItem('theme-storage');
                  if (storage) {
                    theme = JSON.parse(storage).state.theme;
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  document.documentElement.setAttribute('data-theme', 'paper');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} ${notoHindi.variable} antialiased min-h-screen bg-background text-foreground selection:bg-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
