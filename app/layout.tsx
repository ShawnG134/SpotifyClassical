import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import React from "react";
import { SpotifyAuthProvider } from "@/context/SpotifyAuthContext";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify clone",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        {/*<ToasterProvider />*/}
        <SpotifyAuthProvider>
          <Sidebar>{children}</Sidebar>
        </SpotifyAuthProvider>
        {/*<Player />*/}
      </body>
    </html>
  );
}
