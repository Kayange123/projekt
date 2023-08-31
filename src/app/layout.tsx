import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "../Providers/ToasterProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - Projects",
  description: "Showcase and develop remarkable projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <header>
            <Navbar />
          </header>
        </ClientOnly>
        {children}
        <ClientOnly>
          <footer>
            <Footer />
          </footer>
        </ClientOnly>
      </body>
    </html>
  );
}
