import Navbar from "@/components/Navbar/Navbar";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ClientOnly from "@/components/ClientOnly";
import ToasterProvider from "../Providers/ToasterProvider";
import { getCurrentUser } from "@/libs/session";
import { SessionInterface } from "@/constants/common.types";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - Projects",
  description: "Showcase and develop remarkable projects",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentUser() as SessionInterface;
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <header>
            <Navbar session={session}/>
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
