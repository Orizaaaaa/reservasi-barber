'use client'
import ButtonPrimary from '@/elements/buttonPrimary';
import DropdownCustom from '@/elements/dropdown/Dropdown';
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import { formatDate } from '@/utils/helper';
import { AutocompleteItem, Calendar, DatePicker } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import React from 'react'

type Props = {}

function page({ }: Props) {
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

    return (
        <DefaultLayout>
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

                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="hour"
                    placeholder="Masukan Jam (0-23)"
                    title="Jam"
                    type="number"
                    onChange={handleChange}
                    value={form.hour}
                />

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
                    Tambah Capster
                </ButtonPrimary>
            </div>
        </DefaultLayout>
    )
}

export default page