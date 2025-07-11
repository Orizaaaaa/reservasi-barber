'use client'
import ButtonBack from '@/elements/buttonBack'
import MobileLayout from '@/fragments/layout/mobileLayout/mobileLayout'
import { haircut, regular_cut, yangyang2 } from '@/image'
import { Button } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { FaCrown, FaHeart, FaStar } from 'react-icons/fa'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

type Props = {}

const page = (props: Props) => {
    return (
        <section>

            <section className="header w-full bg-secondBlack p-4">
                <ButtonBack />
                <div className="flex flex-col justify-center items-center">
                    <div className="w-40 h-40">
                        <Image className='w-full h-full' src={yangyang2} alt="logo" />
                    </div>
                    <div className="flex mt-10 gap-7">
                        <div className="box-1 flex flex-col justify-center items-center  ">
                            <div className="p-5 bg-black rounded-full">
                                <FaHeart color='white' size={27} />
                            </div>
                            <h1 className='text-yellowCustom font-bold mt-3' >1370 Cust</h1>
                            <p className='text-white font-light text-xs' >Served</p>
                        </div>
                        <div className="box-1 flex flex-col justify-center items-center  ">
                            <div className="p-5 bg-black rounded-full">
                                <FaCrown color='white' size={27} />
                            </div>
                            <h1 className='text-yellowCustom font-bold mt-3' >10 Years</h1>
                            <p className='text-white font-light text-xs' >experience</p>
                        </div>
                        <div className="box-1 flex flex-col justify-center items-center   ">
                            <div className="p-5 bg-black rounded-full ">
                                <FaStar color='white' size={27} />
                            </div>
                            <h1 className='text-yellowCustom font-bold mt-3' >1370</h1>
                            <p className='text-white font-light text-xs ' >Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="w-full flex justify-center items-center mt-4">
                <div className="title text-center flex flex-col justify-center items-center">
                    <h1 className='text-2xl font-semibold'>DIDING</h1>
                    <p>sepesialis di selingkuhin </p>
                    <div className="flex gap-1">
                        <FaStar size={20} color='#E67514' />
                        <FaStar size={20} color='#E67514' />
                        <FaStar size={20} color='#E67514' />
                        <FaStar size={20} color='#E67514' />
                        <FaStar size={20} color='#E67514' />
                    </div>

                </div>
            </div>

            <section className='p-4' >
                <h1 className='font-semibold' >About Capster</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore dolores exercitationem ipsum, quas eaque est voluptate perferendis quibusdam. Rem blanditiis accusantium ex hic placeat nobis quisquam rerum quam aliquid id.</p>
            </section>

            <section className='p-4' >
                <h1 className='font-semibold mb-3' >Histori</h1>
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
                                        <h1 className="text-white">TAPPER FADE HAIRCUT</h1>
                                        <h1 className="text-white">50K</h1>
                                    </div>

                                    <div className="flex gap-1">
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                    </div>
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
                                        <h1 className="text-white">TAPPER FADE HAIRCUT</h1>
                                        <h1 className="text-white">50K</h1>
                                    </div>

                                    <div className="flex gap-1">
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                        <FaStar size={20} color='#E67514' />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </section>
        </section>

    )
}

export default page