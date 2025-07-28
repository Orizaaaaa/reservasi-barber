'use client'

import React, { useEffect } from 'react'
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import ModalDefault from '@/fragments/modal/modal';
import { formatDate, formatDateStr, hours } from '@/utils/helper';
import { Autocomplete, AutocompleteItem, Calendar, DatePicker, useDisclosure } from '@heroui/react';
import { parseDate } from '@internationalized/date';
import { useRouter } from 'next/navigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { MdOutlineAccessTime } from 'react-icons/md';
import toast from 'react-hot-toast';
import { createBooking, getAllCapster, getAllPayments, getAllService, getCapsterHours } from '@/api/method';
import BottomNavigation from '@/fragments/nav/navigation';

type Props = {}

function page({ }: Props) {
    const router = useRouter();
    const [capsterHours, setCapsterHours] = React.useState<any>([]);
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
        rating: 5,
        image: '',
        haircut_type: '',
        service_id: '',
        status: 'Menunggu',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };

    const handleSelectTime = (time: string) => {
        const [hour] = time.split(':');
        setForm(prev => ({ ...prev, hour: parseInt(hour) }));
    };

    useEffect(() => {
        if (form.capster_id) {
            getCapsterHours(form.capster_id, (data: any) => {
                setCapsterHours(data.data);
            });
        }
    }, [form.date]);


    const onSelectionChangeCapster = (_id: string) => {
        setForm({
            ...form,
            capster_id: _id
        });

        // Fetch capster hours when ID changes
        getCapsterHours(_id, (data: any) => {
            console.log("Fetched Capster Hours:", data);
            setCapsterHours(data.data);
            // You can handle the data here if needed
        });
    };
    const onSelectionChangePayment = (id: string) => {
        setForm({
            ...form,
            payment_id: id
        });
    };

    const onSelectionChangeService = (id: string) => {
        setForm({
            ...form,
            service_id: id
        });
    };

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
        const requiredFields = [
            'name',
            'email',
            'phone',
            'date',
            'hour',
            'capster_id',
            'payment_id',
            'rating',
            'haircut_type',
            'service_id',
            'status',
        ];

        const isValid = requiredFields.every((field) => {
            const value = form[field as keyof typeof form];
            if (typeof value === 'number') {
                return value !== 0;
            }
            return value !== '' && value !== null && value !== undefined;
        });

        if (!isValid) {
            toast.error('Harap isi semua field terlebih dahulu!');
            return;
        }

        const loadingToast = toast.loading('Membuat booking...');

        const formattedForm = {
            ...form,
            date: formatDateStr(form.date),
        };

        try {
            // Simpan nomor telepon ke localStorage
            localStorage.setItem('userPhone', form.phone);

            await createBooking(formattedForm, (res: any) => {
                toast.success('Booking berhasil!', {
                    id: loadingToast,
                });

                console.log('Booking berhasil:', res);
                // Reset form atau redirect jika perlu
            });
        } catch (err) {
            console.error('Gagal membuat booking', err);
            toast.error('Gagal membuat booking.', {
                id: loadingToast,
            });
        }
    };

    const isHourBooked = (hour: number): boolean => {
        const selectedDate = formatDate(form.date); // hasil: "2025-07-28"
        return capsterHours.some((item: any) => {
            const itemDate = formatDate(item.date); // Convert juga ke format "2025-07-28"
            return itemDate === selectedDate && parseInt(item.hour) === hour;
        });
    };



    console.log(capsterHours);
    console.log(capsters);
    console.log(services);
    console.log(payments);
    console.log(formatDateStr(form.date));
    console.log(form);

    return (
        <div className='container mx-auto px-3 py-4 mb-20' >
            <div className="rounded-full my-4 cursor-pointer" onClick={() => router.back()}>
                <IoArrowBackCircleOutline size={25} />
            </div>
            <h1 className='text-2xl font-semibold ' >Booking</h1>
            <div className="form ">
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

                <div className="w-full mt-5">
                    <h1 className=" font-medium text-black mb-1">Jenis Pembayaran</h1>

                    <Autocomplete
                        variant='bordered'
                        placeholder="Pilih Jenis Pembayaran"
                        className="w-full"
                        onSelectionChange={(e: any) => onSelectionChangePayment(e)}
                        value={form.payment_id}
                    >
                        {payments.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>

                <div className="w-full mt-5">
                    <h1 className=" font-medium text-black mb-1">Jenis Layanan</h1>

                    <Autocomplete
                        variant='bordered'
                        placeholder="Pilih Jenis Layanan"
                        className="w-full"
                        onSelectionChange={(e: any) => onSelectionChangeService(e)}
                        value={form.service_id}
                    >
                        {services.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.name}</AutocompleteItem>
                        ))}
                    </Autocomplete>
                </div>




                <div className="w-full mt-6">
                    <h1 className=" font-medium text-black mb-1">Pilih Capster</h1>

                    <Autocomplete
                        placeholder="Pilih Capster"
                        className="w-full"
                        variant='bordered'
                        onSelectionChange={(e: any) => onSelectionChangeCapster(e)}
                        value={form.capster_id}
                    >
                        {capsters.map((item: any) => (
                            <AutocompleteItem key={item._id}>{item.username}</AutocompleteItem>
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

                <div className='my-6' >
                    <h1 className='text-black mb-2 font-medium' >Jam</h1>
                    <div className='border border-gray-400 flex justify-between py-1 px-3 rounded-lg items-center cursor-pointer' onClick={onOpen}>
                        <p>{form.hour}.00</p>
                        <MdOutlineAccessTime size={20} color='gray' />
                    </div>
                </div>


                <ButtonPrimary onClick={handleSubmit} className='py-2 px-3 rounded-xl mt-4 w-full '>
                    Booking
                </ButtonPrimary>
            </div>

            <BottomNavigation />

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
                                    {times.map((time) => {
                                        const disabled = isHourBooked(time);
                                        return (
                                            <button
                                                key={time}
                                                disabled={disabled}
                                                className={`px-3 py-1 rounded transition ${disabled
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : 'bg-yellow-300 hover:bg-yellow-400'
                                                    }`}
                                                onClick={() => !disabled && handleSelectTime(`${time}:00`)}
                                            >
                                                {time}:00
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                        Waktu dipilih: <strong>{form.hour ? `${form.hour}:00` : 'Belum dipilih'}</strong>
                    </p>
                </div>
            </ModalDefault>
        </div>
    )
}

export default page