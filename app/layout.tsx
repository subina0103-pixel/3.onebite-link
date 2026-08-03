import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FoldersProvider } from "@/app/lib/FoldersContext";
import { LinksProvider } from "@/app/lib/LinksContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크",
  description: "내 링크를 한 곳에서 관리하세요",
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
      <body className="h-full flex flex-col">
          <FoldersProvider>
            <LinksProvider>{children}</LinksProvider>
          </FoldersProvider>
        </body>
    </html>
  );
}
