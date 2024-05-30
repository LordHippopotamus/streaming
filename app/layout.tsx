import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "./NextAuthProvider";
import Navigation from "./Navigation";

export const metadata: Metadata = {
  title: "Streaming",
  description: "Simple sreaming app with srs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-50">
        <NextAuthProvider>
          <Navigation />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
