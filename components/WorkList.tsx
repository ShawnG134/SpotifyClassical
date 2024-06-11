import React from "react";

interface Work {
  id: string;
  title: string;
}

interface WorkListProps {
  works: Work[];
}

const WorkList: React.FC<WorkListProps> = ({ works }) => {
  return (
    <div className="flex flex-col gap-y-2 mt-4 px-3">
      {works.map((work) => (
        <div
          key={work.id}
          className="flex items-center justify-between px-5 py-4 border-b border-neutral-800"
        >
          <p className="text-neutral-400">{work.title}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkList;
