import Header from "@/components/Header";
import getComposerPiece from "@/action/getComposerPiece";
import ComposerList from "@/components/ComposersList";
import ProfileDisplay from "@/components/profileDisplay";
import UserProfile from "@/components/profileDisplay";

export const revalidate = 0;

export default async function Home() {
  const composer = await getComposerPiece();

  return (
    <div className="text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">
            Welcome to Spotify Classical
          </h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest Songs</h1>
        </div>
      </div>
      <ComposerList composers={composer}></ComposerList>
      <UserProfile></UserProfile>
    </div>
  );
}
