import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import BaseLayout from "@/components/layout/base";

const inter = Inter({ subsets: ["latin",] })

export const metadata: Metadata = {
  title: "Live Websocket Tester",
  description: "A Realtime Websocket Tester",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <BaseLayout>
            {children}
          </BaseLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
