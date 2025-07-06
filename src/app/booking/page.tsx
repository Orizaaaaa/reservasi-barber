
'use client'
import ButtonBack from '@/elements/buttonBack'
import { mukti, yangyang } from '@/image'
import { Calendar } from '@heroui/react'
import Image from 'next/image'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'

type Props = {}

const page = (props: Props) => {
    const hours = {
        Pagi: ['10:00', '11:00', '12:00'],
        Siang: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        Malam: ['18:00', '19:00', '20:00', '21:00'],
    };
    const [form, setForm] = React.useState({
        date: '',
        time: '',
    })

    const handleSelect = (time: string) => {
        setForm((prev) => ({ ...prev, time }));
    };
    return (
        <section className='container mx-auto p-3' >
            <ButtonBack />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <div className="p-6 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="w-32 h-32 mb-4 ring-4 ring-gray-800 rounded-full overflow-hidden">
                        <Image src={yangyang} alt="Profil Yangyang.Skom" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-white text-2xl font-bold tracking-wide mb-1">Yangyang.Skom</h1>
                </div>

                <div className="p-6 bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center rounded-2xl shadow-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="w-32 h-32 mb-4 ring-4 ring-gray-800 rounded-full overflow-hidden">
                        <Image src={mukti} alt="Profil Mukti" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-white text-2xl font-bold tracking-wide mb-1">Mukti</h1>
                </div>
            </div>
            <div className="flex justify-center items-center mt-7">
                <Calendar aria-label="Date (No Selection)" />
            </div>

            <div className="bg-gray-100 p-6 rounded-md shadow text-center max-w-xl mx-auto mt-7">
                <h2 className="text-gray-600 font-semibold text-lg mb-4 tracking-wide uppercase">
                    waktu tersedia
                </h2>

                <div className="grid grid-cols-3 gap-4">
                    {Object.entries(hours).map(([label, times], colIndex) => (
                        <div key={label}>
                            <h3 className="font-bold mb-2">{label}</h3>
                            <div className="flex flex-col items-center gap-3">
                                {times.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleSelect(time)}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    Waktu dipilih: <strong>{form.time || '-'}</strong>
                </p>
            </div>

            <div className="flex justify-end mt-7">
                <button className='flex gap2 items-center p-2 bg-slate-300 rounded-lg' > <p>Next</p> <IoIosArrowForward /></button>
            </div>
            {/* buat modal konfirmasi pembayaran */}
        </section>
    )
}

export default page