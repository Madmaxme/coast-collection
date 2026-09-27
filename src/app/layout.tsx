import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.wordmark,
  description: site.footerBlurb,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f3ece5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <ClerkProvider
          localization={{
            signIn: {
              start: {
                title: site.sheetCopy.signIn,
                subtitle: "",
                actionLink: site.sheetCopy.createAccount,
              },
            },
            signUp: {
              start: {
                title: site.sheetCopy.createAccount,
                subtitle: "",
                actionLink: site.sheetCopy.signIn,
              },
            },
            formButtonPrimary: site.sheetCopy.signIn,
            formFieldLabel__emailAddress: site.sheetCopy.email,
            formFieldLabel__password: site.sheetCopy.password,
            lastAuthenticationStrategy: "",
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}