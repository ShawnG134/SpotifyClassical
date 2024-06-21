import { useEffect, useState } from "react";
import { TbPlaylist } from "react-icons/tb";
import { getComposer } from "@/action/getComposer";

const Library = () => {
  const [composers, setComposers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getComposer()
      .then((composers) => {
        setComposers(composers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch composers:", error);
        setError(error);
        setLoading(false);
        setComposers([]);
      });
  }, []);

  const handleClick = (composer) => {
    window.location.href = `/display?name=${encodeURIComponent(composer)}`;
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Composer List</p>
        </div>
      </div>
      {loading && <p className="text-center text-neutral-400">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">Error loading composers.</p>
      )}
      <ul className="w-full list-none p-0 m-0">
        {composers.map((composer) => (
          <li
            key={composer}
            className="whitespace-nowrap overflow-hidden text-ellipsis px-5 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleClick(composer)}
          >
            {composer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Library;
