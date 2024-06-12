"use client";

import { Composer } from "@/types";
import AlbumCover from "@/components/AlbumCover";

interface PageContentProps {
  composers: Composer[];
}

const PageContent: React.FC<PageContentProps> = ({ composers }) => {
  if (composers.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  return (
    <div
      className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
    >
      {composers.map((item) => (
        <AlbumCover onClick={(id: string) => {}} key={item.id} data={item} />
      ))}
    </div>
  );
};

export default PageContent;