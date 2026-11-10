import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar/Navbar";
import AppSidebar from "@/components/ui/Sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";



const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Āfāq — Explore the Universe",
  description:
    "Discover the universe through planets, missions, cosmic stories, and extraordinary discoveries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
        <body
          className={`${inter.variable} ${spaceGrotesk.variable} h-full  overflow-x-hidden bg-background font-sans antialiased`}
        >
      <SidebarProvider defaultOpen={false}>
      
          <Navbar />
          <AppSidebar />
          <main className="relative h-full w-full">{children}</main>
      </SidebarProvider>  
        </body>
    </html>
  );
}