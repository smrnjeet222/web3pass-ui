import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import { WalletProvider } from "@/providers/connectkit";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme";
import { ModeToggle } from "@/components/ui/theme-toogler";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Web3Pass",
  description: "Web 3 password manager",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", inter.variable)}
      >
        <ThemeProvider>
          <WalletProvider>
            <TRPCReactProvider cookies={cookies().toString()}>
              <Navbar />
              <main className="container min-h-screen py-8">{children}</main>

              <div className="fixed bottom-2 right-2">
                <ModeToggle />
              </div>
              <Footer />
            </TRPCReactProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
