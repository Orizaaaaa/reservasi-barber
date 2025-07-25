'use client'
import { createBooking, getAllCapster, getAllPayments, getAllService } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import DropdownCustom from '@/elements/dropdown/Dropdown';
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { formatDate, formatDateStr, hours } from '@/utils/helper';
import { Autocomplete, AutocompleteItem, Calendar, DatePicker, useDisclosure } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import React, { useEffect } from 'react'
import { MdOutlineAccessTime } from 'react-icons/md';

type Props = {}

function page({ }: Props) {
    const [capsters, setCapsters] = React.useState<any>([]);
    const [services, setServices] = React.useState<any>([]);
    const [payments, setPayments] = React.useState<any>([]);
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

    const onSelectionChange = (item: string | null, field: keyof typeof form) => {
        if (!item) return;

        setForm((prev) => ({
            ...prev,
            [field]: item,
        }));
    };


    const dataTipe = [
        { key: 'dipinjam', label: 'Dipinjam', value: 'dipinjam' },
        { key: 'belum diambil', label: 'Belum diambil', value: 'belum diambil' },
        { key: 'dikembalikan', label: 'Dikembalikan', value: 'dikembalikan' },
        { key: 'terlambat', label: 'Terlambat', value: 'terlambat' },
        { key: 'hilang', label: 'Hilang', value: 'hilang' },
    ];

    const fetchDataDropdown = async () => {
        try {
            const resServices: any = await getAllService();
            const resPayments: any = await getAllPayments();
            const resCapsters: any = await getAllCapster();
            setCapsters(resCapsters.data);
            setServices(resServices.data);
            setPayments(resPayments.data);
        } catch (error) {
            console.error('Gagal fetch data:', error);
        }
    };

    useEffect(() => {
        fetchDataDropdown();
    }, []);

    const handleSubmit = async () => {

        // Format tanggal jika ada
        const formattedForm = {
            ...form,
            date: formatDateStr(form.date), // pastikan form.tanggal adalah object { day, month, year }
        };

        // Kirim data ke API
        try {
            await createBooking(formattedForm, (res: any) => {
                console.log("Booking berhasil:", res);
                // lakukan sesuatu setelah berhasil, misal reset form atau redirect
            });
        } catch (err) {
            console.error("Gagal membuat booking", err);
        }
    };


    console.log(capsters);
    console.log(services);
    console.log(payments);
    console.log(formatDateStr(form.date));
    console.log(form);


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




                <div className="w-full">
                    <h1 className=" font-medium text-black mb-1">Pilih Capster</h1>

                    <Autocomplete
                        placeholder="Pilih Capster"
                        className="w-full"
                        variant='bordered'
                        onSelectionChange={(e: any) => onSelectionChange(e, 'capster_id')}
                        value={form.capster_id}
                    >
                        {capsters.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.username}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>

                <div className="w-full mt-5">
                    <h1 className=" font-medium text-black mb-1">Jenis Layanan</h1>

                    <Autocomplete
                        variant='bordered'
                        placeholder="Pilih Jenis Layanan"
                        className="w-full"
                        onSelectionChange={(e: any) => onSelectionChange(e, 'service_id')}
                        value={form.service_id}
                    >
                        {services.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>

                <InputSecond
                    styleTitle="text-black"
                    bg="bg-none border border-gray-400 placeholder-gray-400"
                    className="w-full"
                    htmlFor="haircut_type"
                    placeholder="Masukan Jenis Cukuran"
                    title="Jenis Cukuran"
                    type="text"
                    onChange={handleChange}
                    value={form.haircut_type}
                />


                <div className="w-full mt-5">
                    <h1 className=" font-medium text-black mb-1">Jenis Pembayaran</h1>

                    <Autocomplete
                        variant='bordered'
                        placeholder="Pilih Jenis Pembayaran"
                        className="w-full"
                        onSelectionChange={(e: any) => onSelectionChange(e, 'payment_id')}
                        value={form.payment_id}
                    >
                        {payments.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>


                <ButtonPrimary onClick={handleSubmit} className='py-2 px-3 rounded-xl mt-4 '>
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