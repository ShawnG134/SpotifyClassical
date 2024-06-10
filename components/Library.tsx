import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import useAuthModal from "@/hooks/useAuthModal";

const composers = [
  { id: "1", name: "Ludwig van Beethoven" },
  { id: "2", name: "Johann Sebastian Bach" },
  { id: "3", name: "Wolfgang Amadeus Mozart" },
  { id: "4", name: "Franz Schubert" },
  { id: "5", name: "Pyotr Ilyich Tchaikovsky" },
];

const Library = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Composers</p>
        </div>
        <AiOutlinePlus
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          size={20}
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {composers.map((composer) => (
          <div
            key={composer.id}
            className="flex items-center justify-between px-5 py-4 border-b border-neutral-800"
          >
            <p className="text-neutral-400">{composer.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
