import "./globals.css";
import { Figtree } from "next/font/google";

// import Sidebar from "../components/Sidebar";
// import SupabaseProvider from "./providers/SupabaseProvider";
// import UserProvider from "./providers/UserProvider";
// import ModalProvider from "./providers/ModalProvider";
// import ToasterProvider from "./providers/ToastProvider";
// import getSongsByUserId from "@/actions/getSongsByUserId";
// import Player from "@/components/Player";
// import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModelProvider";
import AuthModal from "@/components/AuthModal";

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
  // const userSongs = await getSongsByUserId();
  // const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={figtree.className}>
        {/*<ToasterProvider />*/}
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
            {/*<Player />*/}
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
