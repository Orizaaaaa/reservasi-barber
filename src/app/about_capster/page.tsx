import ButtonBack from '@/elements/buttonBack'
import MobileLayout from '@/fragments/layout/mobileLayout/mobileLayout'
import { haircut, yangyang2 } from '@/image'
import Image from 'next/image'
import React from 'react'
import { FaCrown, FaHeart, FaStar } from 'react-icons/fa'

type Props = {}

const page = (props: Props) => {
    return (
        <section>

            <section className="header w-full bg-primary p-4">
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
                            <h1 className='text-white font-bold mt-3' >1370 Cust</h1>
                            <p className='text-white font-light text-xs' >di layani</p>
                        </div>
                        <div className="box-1 flex flex-col justify-center items-center  ">
                            <div className="p-5 bg-black rounded-full">
                                <FaCrown color='white' size={27} />
                            </div>
                            <h1 className='text-white font-bold mt-3' >1370 Cust</h1>
                            <p className='text-white font-light text-xs' >di layani</p>
                        </div>
                        <div className="box-1 flex flex-col justify-center items-center  ">
                            <div className="p-5 bg-black rounded-full">
                                <FaStar color='white' size={27} />
                            </div>
                            <h1 className='text-white font-bold mt-3' >1370 Cust</h1>
                            <p className='text-white font-light text-xs' >di layani</p>
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
                <div className="grid grid-cols-3 lg:grid-cols-5">
                    <div className="box1 bg-black pb-4 rounded-xl">
                        <div className="h-52">
                            <Image className='w-full h-full object-cover rounded-t-xl' src={haircut} alt="logo" />
                        </div>
                        <h1 className='text-white text-center mt-3'>Tapper Fade Haircut</h1>
                        <div className="flex gap-1 justify-center">
                            <FaStar size={20} color='#E67514' />
                            <FaStar size={20} color='#E67514' />
                            <FaStar size={20} color='#E67514' />
                            <FaStar size={20} color='#E67514' />
                            <FaStar size={20} color='#E67514' />
                        </div>
                    </div>
                </div>
            </section>
        </section>

    )
}

export default page