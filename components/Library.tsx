import {TbPlaylist} from "react-icons/tb";
import {famousComposers} from "@/utils/constants";

const Library = () => {

	const handleClick = (composer: string) => {
		window.location.href = `/SideBarComposer?name=${encodeURIComponent(composer)}`;
	};

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between px-5 py-4">
				<div className="inline-flex items-center gap-2">
					<TbPlaylist className="text-neutral-400" size={26}/>
					<p className="text-neutral-400 font-medium text-md">Composer List</p>
				</div>
			</div>
			<ul className="w-full text-neutral-400 list-none p-0 m-0">
				{famousComposers.map((composer) => (
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
