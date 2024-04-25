import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClientProviders from "@/providers/ConvexClientProviders";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat app",
  description: "Realtime chat app using Nextjs",
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
