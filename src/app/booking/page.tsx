'use client'
import ButtonBack from '@/elements/buttonBack'
import DropdownCustom from '@/elements/dropdown/Dropdown'
import InputSecond from '@/elements/input/InputSecond'
import { mukti, yangyang } from '@/image'
import { AutocompleteItem, Calendar } from '@heroui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

interface FormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    hour: number;
    capster_id: string;
    payment_id: string;
    rating: number;
    image: string;
    haircut_type: string;
    service_id: string;
    status: string;
}

const Page = () => {
    const hours = {
        Pagi: ['10:00', '11:00', '12:00'],
        Siang: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
        Malam: ['18:00', '19:00', '20:00', '21:00'],
    };

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        date: '',
        hour: 0,
        capster_id: '',
        payment_id: '',
        rating: 0,
        image: '',
        haircut_type: '',
        service_id: '',
        status: 'Menunggu',
    });

    const handleSelectTime = (time: string) => {
        const [hour] = time.split(':');
        setForm(prev => ({ ...prev, hour: parseInt(hour) }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleDropdownChange = (key: string, field: keyof FormData) => {
        setForm(prev => ({ ...prev, [field]: key }));
    };

    const handleDateChange = (date: any) => {
        const isoString = date.toISOString(); // example: "2025-06-23T10:00:00Z"
        setForm(prev => ({ ...prev, date: isoString }));
    };

    const dataStatus = [
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
    ];

    console.log(form);


    return (
        <section className="bg-black">
            <section className="container mx-auto p-3">
                <ButtonBack />

                {/* Profile Capster */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                    <div className="p-6 bg-gradient-to-b from-yellowCustom to-black flex flex-col items-center justify-center rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                        <div className="w-32 h-32 mb-4 ring-2 ring-grayCustom rounded-full overflow-hidden relative">
                            <Image src={yangyang} alt="Profil Yangyang.Skom" className="w-full h-full object-cover" />

                        </div>
                        <h1 className="text-white text-2xl font-bold tracking-wide mb-1">Yangyang.Skom</h1>
                    </div>

                    <div className="p-6 bg-gradient-to-b from-yellowCustom to-black flex flex-col items-center justify-center rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300">
                        <div className="w-32 h-32 mb-4 ring-2 ring-grayCustom rounded-full overflow-hidden relative">
                            <Image src={mukti} alt="Profil Mukti" className="w-full h-full object-cover" />

                        </div>
                        <h1 className="text-white text-2xl font-bold tracking-wide mb-1">Mukti</h1>
                    </div>
                </div>

                {/* Calendar */}
                <div className="flex justify-center items-center mt-7">
                    <Calendar aria-label="Date Picker" calendarWidth="100%" onChange={handleDateChange} />
                </div>

                {/* Waktu tersedia */}
                <div className="bg-gray-100 p-6 rounded-md shadow text-center max-w-xl mx-auto mt-7">
                    <h2 className="text-gray-600 font-semibold text-lg mb-4 tracking-wide uppercase">
                        Waktu tersedia
                    </h2>

                    <div className="grid grid-cols-3 gap-4">
                        {Object.entries(hours).map(([label, times]) => (
                            <div key={label}>
                                <h3 className="font-bold mb-2">{label}</h3>
                                <div className="flex flex-col items-center gap-3">
                                    {times.map((time) => (
                                        <button
                                            key={time}
                                            className="bg-yellow-300 px-3 py-1 rounded hover:bg-yellow-400 transition"
                                            onClick={() => handleSelectTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        Waktu dipilih: <strong>{form.hour ? `${form.hour}:00` : 'Belum dipilih'}</strong>
                    </p>
                </div>

                {/* Input Fields */}
                <div className="flex gap-4 mt-6">
                    <div className="w-1/2">
                        <InputSecond
                            className="w-full"
                            htmlFor="haircut_type"

                            title="Jenis Cukuran"
                            type="text"
                            onChange={handleChange}
                            value={form.haircut_type}
                        />
                    </div>
                    <div className="w-1/2">
                        <InputSecond
                            className="w-full"
                            htmlFor="phone"

                            title="No Handphone"
                            type="text"
                            onChange={handleChange}
                            value={form.phone}
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-4">
                    <div className="w-1/2">
                        <InputSecond
                            className="w-full"
                            htmlFor="name"

                            title="Nama"
                            type="text"
                            onChange={handleChange}
                            value={form.name}
                        />
                    </div>
                    <div className="w-1/2">
                        <InputSecond
                            className="w-full"
                            htmlFor="email"

                            title="Email"
                            type="email"
                            onChange={handleChange}
                            value={form.email}
                        />
                    </div>
                </div>

                {/* Dropdown Fields */}
                <div className="flex gap-3 mt-6">
                    <div className="w-full">
                        <h1 className="text-sm text-gray-400">Jenis Layanan</h1>
                        <DropdownCustom
                            clearButton={false}
                            defaultItems={dataStatus}
                            onSelect={(key: string) => handleDropdownChange(key, 'service_id')}
                        >
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                    </div>

                    <div className="w-full">
                        <h1 className="text-sm text-gray-400">Jenis Pembayaran</h1>
                        <DropdownCustom
                            clearButton={false}
                            defaultItems={dataStatus}
                            onSelect={(key: string) => handleDropdownChange(key, 'payment_id')}
                        >
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                    </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-end mt-7">
                    <button className="flex gap-2 items-center p-2 bg-slate-300 rounded-lg">
                        <p>Next</p> <IoIosArrowForward />
                    </button>
                </div>
            </section>
        </section>
    );
};

export default Page;
