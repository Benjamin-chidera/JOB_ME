import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Providers } from "@/redux/provider";
import { getServerSession } from "next-auth";
import SessionProvider from "../libs/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JOBME",
  description:
    "JOBME lets job seekers browse and apply for jobs while managing applications. Employers can post openings, reach qualified candidates, and manage applications easily.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <SessionProvider session={session}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
