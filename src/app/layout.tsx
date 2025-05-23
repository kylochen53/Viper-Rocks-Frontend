import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./dist/css/explorer-1.min.css";
import { Nav } from "./(components)/Nav";
import { MobileNav } from "./(components)/MobileNav";
import { Footer } from "./(components)/Footer";
import SessionProvider from "./(components)/SessionProvider/SessionProvider"; //next SessionProvider imported
import { getServerSession } from "next-auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUNAR ROCKS!",
  description: "Lunar Rocks a JPL and CSULA collab",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <head></head>
      <body>
        <Nav />
        <MobileNav />
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
        <Footer />
        {/* <!-- JavaScript -->
        <script src="explorer-1.min.js" async></script> */}
      </body>
    </html>
  );
}
