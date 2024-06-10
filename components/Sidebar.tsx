"use client";

import React, {useMemo} from 'react';
import {usePathname} from "next/navigation";
import {HiHome} from "react-icons/hi";
import {BiSearch} from "react-icons/bi";
import Box from "@/components/box";
import SidebarItem from "@/components/SidebarItem";

interface props {
    children: React.ReactNode;
}

const Sidebar: React.FC<props> = ({children}) => {
    const pathname = usePathname();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Search',
            active: pathname === '/search',
            href: '/search',
        },
    ], [pathname]);
    return <div className="flex h-full">
        <div className="md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
            <Box>
                Side Navigation
            </Box>
            <Box>
                <div className="
        flex-col
        gap-y-4
        px-5
        py-4
      ">
                    {routes.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                </div>
            </Box>
            <Box className={"overflow-y-auto h-full"}>
                Song Library
            </Box>
        </div>
    </div>
}

export default Sidebar;
