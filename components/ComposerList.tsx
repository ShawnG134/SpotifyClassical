import React from "react";

interface Composer {
  id: string;
  name: string;
}

interface ComposerListProps {
  composers: Composer[];
  onComposerClick: (composerId: string) => void;
}

const ComposerList: React.FC<ComposerListProps> = ({
  composers,
  onComposerClick,
}) => {
  return (
    <div className="flex flex-col gap-y-2 mt-4 px-3">
      {composers.map((composer) => (
        <div
          key={composer.id}
          className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 cursor-pointer"
          onClick={() => onComposerClick(composer.id)}
        >
          <p className="text-neutral-400">{composer.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ComposerList;
