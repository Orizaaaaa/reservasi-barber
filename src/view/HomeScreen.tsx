'use client'
import Image from "next/image";

import { VscAccount, VscArchive, VscHome, VscSettingsGear } from "react-icons/vsc";
import { IoImagesOutline, IoSearch } from "react-icons/io5";
import { haircut, logo, mukti, yangyang } from "@/image";
import { RiScissorsCutFill, RiTiktokFill } from "react-icons/ri";
import { Button } from "@heroui/react";
import Dock from "../fragments/tabBar/Dock";
import { ImUserPlus } from "react-icons/im";
import BottomNavigation from "@/fragments/nav/navigation";

export default function HomeScreen() {
    const items = [
        { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
        { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
        { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
        { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
    ];
    return (
        <div className=" container mx-auto mt-7 px-2">
            <div className="flex w-full items-center justify-between">
                <div className="shadow-lg shadow-black/40 p-3 rounded-lg" >
                    <h1 className="font-bold text-lg text-slate-400" >Welcome to KaBarbershop</h1>
                </div>

                <Image src={logo} alt="logo" width={50} height={50} />
            </div>
            <div className="flex w-full px-3 py-2 items-center gap-3 rounded-lg shadow-lg shadow-black/30 mt-4" >
                <IoSearch color="grey" size={20} />
                <input placeholder="Search" className=" border-none w-full" type="text" />
            </div>

            <section className="barberman">
                <h1 className="my-5 text-xl text-slate-400" >Barberman</h1>
                <div className="grid grid-cols-2 gap-5 ">

                    <div className="p-3 bg-pri flex bg-primary flex-col justify-center items-center rounded-xl">
                        <div className="w-28 h-28">
                            <Image src={yangyang} alt="logo" className="w-full h-full" />
                        </div>
                        <h1 className="text-white" >Yangyang.Skom</h1>
                    </div>
                    <div className="p-3 bg-pri flex bg-primary flex-col justify-center items-center rounded-xl">
                        <div className="w-28 h-28">
                            <Image src={mukti} alt="logo" className="w-full h-full" />
                        </div>
                        <h1 className="text-white" >Mukti</h1>
                    </div>

                </div>
            </section>

            <section className="fitur mt-8">

                <div className="grid grid-cols-4 gap-2">
                    <div className="box flex flex-col justify-center items-center boder-2 shadow-lg shadow-black/40 p-3 rounded-lg">
                        <RiScissorsCutFill size={20} />
                        <h1 className="text-black text-sm" >Capster</h1>
                    </div>
                    <div className="box flex flex-col justify-center items-center boder-2 shadow-lg shadow-black/40 p-3 rounded-lg">
                        <ImUserPlus size={20} />
                        <h1 className="text-black text-sm" >Booking</h1>
                    </div>
                    <div className="box flex flex-col justify-center items-center boder-2 shadow-lg shadow-black/40 p-3 rounded-lg">
                        <IoImagesOutline size={20} />
                        <h1 className="text-black text-sm" >Haircut</h1>
                    </div>
                    <div className="box flex flex-col justify-center items-center boder-2 shadow-lg shadow-black/40 p-3 rounded-lg">
                        <RiTiktokFill size={20} />
                        <h1 className="text-black text-sm" >Social Media</h1>
                    </div>

                </div>

            </section>

            <section className="top-haircut">
                <h1 className="my-5 text-xl text-slate-400" >Top Haicut</h1>
                <div className="bg-primary rounded-xl w-60">
                    <div className="flex gap-5 p-3">
                        <h1 className="text-white text-sm" >Tapper Fade haircut</h1>
                        <Image src={haircut} alt="logo" width={90} height={90} />
                    </div>
                </div>
            </section>


            <BottomNavigation />

        </div>
    );
}
