'use client'
import ButtonPrimary from '@/elements/buttonPrimary';
import DropdownCustom from '@/elements/dropdown/Dropdown';
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { formatDate, hours } from '@/utils/helper';
import { AutocompleteItem, Calendar, DatePicker, useDisclosure } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import React from 'react'
import { MdOutlineAccessTime } from 'react-icons/md';

type Props = {}

function page({ }: Props) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const dateNow = new Date();
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        phone: '',
        date: parseDate(formatDate(dateNow)),
        hour: 0,
        capster_id: '',
        payment_id: '',
        rating: 0,
        image: '',
        haircut_type: '',
        service_id: '',
        status: 'Menunggu',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };

    const handleDropdownChange = (key: string, field: any) => {
        setForm(prev => ({ ...prev, [field]: key }));
    };

    const dataStatus = [
        { label: "Laki-laki", value: "Laki-laki" },
        { label: "Perempuan", value: "Perempuan" },
    ];

    const handleSelectTime = (time: string) => {
        const [hour] = time.split(':');
        setForm(prev => ({ ...prev, hour: parseInt(hour) }));
    };


    return (
        <DefaultLayout>
            <h1 className='text-2xl font-semibold ' >Booking</h1>
            <div className="form">
                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="name"
                    placeholder="Masukan Nama Customer"
                    title="Nama Customer"
                    type="text"
                    onChange={handleChange}
                    value={form.name}
                />

                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="email"
                    placeholder="Masukan Email Customer"
                    title="Email Customer"
                    type="email"
                    onChange={handleChange}
                    value={form.email}
                />

                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="phone"
                    placeholder="Masukan Nomor Telepon"
                    title="Nomor Telepon"
                    type="tel"
                    onChange={handleChange}
                    value={form.phone}
                />

                <div >
                    <h1 className='text-black mb-2 font-medium'>Tanggal</h1>
                    <DatePicker
                        aria-label='date'
                        name='date'
                        variant='bordered'
                        value={form.date}
                        showMonthAndYearPickers
                        onChange={(e: any) => setForm({ ...form, date: e })}
                    />
                </div>


                <div className='my-6' >
                    <h1 className='text-black mb-2 font-medium' >Jam</h1>
                    <div className='border border-gray-400 flex justify-between py-1 px-3 rounded-lg items-center cursor-pointer' onClick={onOpen}>
                        <p>{form.hour}.00</p>
                        <MdOutlineAccessTime size={20} color='gray' />
                    </div>
                </div>


                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="capster_id"
                    placeholder="Masukan ID Capster"
                    title="ID Capster"
                    type="text"
                    onChange={handleChange}
                    value={form.capster_id}
                />

                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="payment_id"
                    placeholder="Masukan ID Pembayaran"
                    title="ID Pembayaran"
                    type="text"
                    onChange={handleChange}
                    value={form.payment_id}
                />

                <div className="w-full">
                    <h1 className="text-lg font-medium text-black mb-2">Jenis Pembayaran</h1>
                    <DropdownCustom
                        clearButton={false}
                        defaultItems={dataStatus}
                        onSelect={(key: string) => handleDropdownChange(key, 'payment_id')}
                    >
                        {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                    </DropdownCustom>
                </div>

                <div className="flex flex-col">
                    <div className="w-full mt-5">
                        <h1 className="text-lg font-medium text-black mb-2">Jenis Layanan</h1>
                        <DropdownCustom
                            clearButton={false}
                            defaultItems={dataStatus}
                            onSelect={(key: string) => handleDropdownChange(key, 'payment_id')}
                        >
                            {(item: any) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </DropdownCustom>
                    </div>

                    <InputSecond
                        styleTitle="text-black"
                        bg="bg-none border border-gray-400 placeholder-gray-400"
                        className="w-full"
                        htmlFor="haircut_type"
                        placeholder="Masukan Jenis Potongan"
                        title="Jenis Potongan"
                        type="text"
                        onChange={handleChange}
                        value={form.haircut_type}
                    />
                </div>

                <ButtonPrimary className='py-2 px-3 rounded-xl mt-4 '>
                    Booking
                </ButtonPrimary>
            </div>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1 className="text-black text-xl font-semibold mb-4">JAM</h1>
                <div className="bg-gray-100  rounded-md shadow text-center  w-full">
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
            </ModalDefault>
        </DefaultLayout>
    )
}

export default page