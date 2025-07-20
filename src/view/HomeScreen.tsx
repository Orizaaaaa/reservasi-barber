'use client'
import Image from "next/image";

import { IoSearch, IoStar } from "react-icons/io5";
import { mukti, regular_cut } from "@/image";
import { Button } from "@heroui/react";
import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import { GoDotFill } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export default function HomeScreen() {

    return (
        <section className="bg-white" >
            <div className=" container mx-auto px-2  h-screen">
                <div className="flex justify-between items-center">
                    <IoIosNotifications size={25} color="#656565" />
                    <h1 className="text font-bold text-grayCustom" >KAMIS AGUSTUS 25</h1>
                    <IoIosSettings size={25} color="#656565" />
                </div>

                <div className="flex justify-between font-medium text-xl text-black mt-2">
                    <h1 className="text-black">HEY,</h1>
                    <h1 className="text-black">MICHAEL</h1>
                </div>

                <div className="flex w-full px-3 py-2 items-center gap-3 rounded-lg shadow-lg shadow-black/30 mt-4 border-2 border-grayCustom" >
                    <IoSearch color="#f9d41c" size={20} />
                    <input placeholder="SEARCH" className=" border-none w-full placeholder-gray-500" type="text" />
                </div>


                <h1 className="text text-sm text-grayCustom mt-6 mb-3" >LATEST VISIT</h1>

                <div >
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={16}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        {/* Contoh slide pertama */}
                        <SwiperSlide className="!w-[90%]">
                            <div className="flex gap-4 border border-grayCustom bg-secondBlack p-2 rounded-xl">
                                <div className="h-12 w-12">
                                    <Image className="w-full h-full object-cover rounded-lg" src={mukti} alt="logo" />
                                </div>
                                <div className="text-grayCustom">
                                    <h1 className="text-white">GABRIEL YONATHAN</h1>
                                    <div className="flex items-center gap-2">
                                        <IoStar color="#f9d41c" />
                                        <h1 className="text-white">4.9</h1>
                                        <GoDotFill size={5} />
                                        <h1 className="text-sm text-white">114 review</h1>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="!w-[90%]">
                            <div className="flex gap-4 border border-grayCustom bg-secondBlack p-2 rounded-xl">
                                <div className="h-12 w-12">
                                    <Image className="w-full h-full object-cover rounded-lg" src={mukti} alt="logo" />
                                </div>
                                <div className="text-grayCustom">
                                    <h1 className="text-white">GABRIEL YONATHAN</h1>
                                    <div className="flex items-center gap-2">
                                        <IoStar color="#f9d41c" />
                                        <h1 className="text-white">4.9</h1>
                                        <GoDotFill size={5} />
                                        <h1 className="text-sm text-white">114 review</h1>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>




                    </Swiper>
                </div>


                <h1 className="text text-sm text-grayCustom mt-6 mb-3" >PRICE LIST KABARBERSHOP</h1>




                <div className=""> {/* padding untuk kasih ruang kiri-kanan */}
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={16}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide className="!w-[80%]"> {/* penting: kasih width tetap */}
                            <div className="border border-grayCustom bg-secondBlack p-2 rounded-xl">
                                <div className="h-56">
                                    <Image className="w-full h-full object-cover rounded-lg" src={regular_cut} alt="logo" />
                                </div>
                                <div className="flex justify-between items-start w-full mt-2">
                                    <div className="text">
                                        <h1 className="text-yellowCustom text-small">OPEN NOW</h1>
                                        <h1 className="text-white">REGULAR CUT</h1>
                                        <h1 className="text-white">50K</h1>
                                    </div>
                                    <Button className="bg-yellowCustom font-bold rounded-md px-4 py-2 text-black text-sm whitespace-nowrap">
                                        BOOK NOW
                                    </Button>
                                </div>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide className="!w-[80%]">
                            <div className="border border-grayCustom bg-secondBlack p-2 rounded-xl">
                                <div className="h-56">
                                    <Image className="w-full h-full object-cover rounded-lg" src={regular_cut} alt="logo" />
                                </div>
                                <div className="flex justify-between items-start w-full mt-2">
                                    <div className="text">
                                        <h1 className="text-yellowCustom text-small">OPEN NOW</h1>
                                        <h1 className="text-white">REGULAR CUT</h1>
                                        <h1 className="text-white">50K</h1>
                                    </div>
                                    <Button className="bg-yellowCustom font-bold rounded-md px-4 py-2 text-black text-sm whitespace-nowrap">
                                        BOOK NOW
                                    </Button>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>




                {/* <BottomNavigation /> */}

            </div>
        </section>
    );
}
