import Header from "@/components/Header";
import React from "react";

import SearchInput from "@/components/SearchInput";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

export default async function Search({ searchParams }: SearchProps) {
  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      {/*<SearchContent songs={[]} />*/}
    </div>
  );
}
// const Page = () => {
//   return <div>Search</div>;
// };
//
// export default Page;
