import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProviders from "@/providers/ConvexClientProviders";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "DodgerBlue",
};

export const metadata: Metadata = {
  title: "Chat App",
  description: "Realtime chat app using NextJS",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "Amin Darabnia" }],
  icons: [
    { rel: "apple-touch-icon", url: "icon-192x192.png" },
    { rel: "icon", url: "icon-192x192.png" },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProviders>
            <ClerkLoading>
              <LoadingLogo />
            </ClerkLoading>
            <ClerkLoaded>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster richColors />
            </ClerkLoaded>
          </ConvexClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
