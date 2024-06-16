import "./globals.css";
import { Figtree } from "next/font/google";

import Sidebar from "@/components/Sidebar";
import UserProvider from "@/providers/UserProvider";
import { SpotifyProvider } from "@/context/SpotifyContent";

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
        <UserProvider>
          <SpotifyProvider>
            <Sidebar>{children}</Sidebar>
          </SpotifyProvider>
          {/*<Player />*/}
        </UserProvider>
      </body>
    </html>
  );
}
