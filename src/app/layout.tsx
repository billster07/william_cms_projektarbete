import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import ClientNavigation from "./components/ClientNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "A portfolio with my web projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex justify-center bg-white text-black p-4 text-center">
          <div className="flex justify-center h-48 w-48">
            <Image
              alt="Logo"
              src="/logo-wh-trans.png"
              className="object-fit w-full"
              height="100"
              width="100"
            />
          </div>
        </header>
        <div className="bg-white text-black p-4 text-center">
          <ClientNavigation />
        </div>
        {children}
        <footer className="bg-white text-black p-4 text-center">© 2025</footer>
      </body>
    </html>
  );
}
