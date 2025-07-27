'use client'
import { getAllCapster, getAllReservation } from '@/api/method'
import InputForm from '@/elements/input/InputForm'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal'
import {
    Autocomplete,
    AutocompleteItem,
    getKeyValue,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from '@heroui/react'
import React, { useEffect } from 'react'

type User = {
    jam: number;
    name: string;
    email: string;
};

const users: User[] = [
    { jam: 10, name: "Andi", email: "andi@example.com" },
    { jam: 20, name: "Budi", email: "budi@example.com" },
    { jam: 19, name: "Citra", email: "citra@example.com" },
];

const Page = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [loading, setLoading] = React.useState(false)
    const [capsters, setCapster] = React.useState<any[]>([])
    const [data, setData] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)
    const rowsPerPage = 4
    const [form, setForm] = React.useState({
        payment_id: '',
        status: '',
        capster_id: '',
    })

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getAllReservation()
            const capster = await getAllCapster()
            const formatted = result?.data?.map((item: any) => ({
                ...item,
                capster_name: item.capster_id?.username || '-',
                service_name: item.service_id?.name || '-',
                payment_name: item.payment_id?.name || '-',
                formatted_date: new Date(item.date).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
            }))
            setData(formatted || [])
            setCapster(capster?.data || [])
            setLoading(false)
        }

        fetchData()
    }, [])

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    // Filter today's reservations
    const todayReservations = data.filter(item => {
        const reservationDate = new Date(item.date).toISOString().split('T')[0];
        return reservationDate === today;
    });

    // Count total bookings today
    const totalTodayBooking = todayReservations.length;

    // Get active barbers today (those with assigned reservations)
    const activeBarbers = todayReservations
        .filter(item => item.capster_id !== null)
        .map(item => item.capster_id);

    // Remove duplicates
    const uniqueActiveBarbers = [...new Map(activeBarbers.map(item => [item._id, item])).values()];

    // Count active barbers
    const totalActiveBarbers = uniqueActiveBarbers.length;

    // Group reservations by barber
    const reservationsByBarber = uniqueActiveBarbers.map(barber => {
        const barberReservations = todayReservations.filter(item =>
            item.capster_id && item.capster_id._id === barber._id
        );

        return {
            barberName: barber.username,
            count: barberReservations.length,
            reservations: barberReservations.map(res => ({
                name: res.name,
                hour: res.hour,
                email: res.email
            }))
        };
    });

    // Pagination
    const pages = Math.ceil(data.length / rowsPerPage)

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return data.slice(start, end)
    }, [page, data])

    // Aksi Edit dan Delete
    const openModalEdit = (item: any) => {
        onOpen()
        console.log('Edit:', item);
        setForm({
            payment_id: item.payment_id?._id || '',
            status: item.status,
            capster_id: item.capster_id?._id || '',
        })
    }

    const handleDelete = (item: any) => {
        console.log('Delete:', item._id)
    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSelectionChange = (_id: string) => {
        setForm({
            ...form,
            capster_id: _id
        });
    };

    return (
        <DefaultLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="text border border-gray-400 rounded-2xl p-3">
                    <h1 className='text-black text-2xl font-semibold'>Jumlah Barberman Aktif</h1>
                    <h2 className='text-black text-3xl font-extrabold'>{totalActiveBarbers}</h2>
                </div>
                <div className="text border border-gray-400 rounded-2xl p-3">
                    <h1 className='text-black text-2xl font-semibold'>Total Booking Hari Ini</h1>
                    <h2 className='text-black text-3xl font-extrabold'>{totalTodayBooking}</h2>
                </div>
            </div>

            <div className="border border-gray-400 p-3 rounded-2xl">
                <h1 className='text-xl font-semibold mb-3'>Jumlah Antrian</h1>
                {reservationsByBarber.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {reservationsByBarber.map((barber, index) => (
                            <div className="content" key={index}>
                                <h1 className='text-lg mb-2'>Capster {barber.barberName}</h1>
                                <hr />
                                <h1 className='text-black text-3xl font-extrabold my-5'>{barber.count}</h1>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 rounded-md shadow-md">
                                        <thead className="">
                                            <tr>
                                                <th className="pr-6 py-3 text-left text-sm font-semibold">Nama Customer</th>
                                                <th className="pr-6 py-3 text-left text-sm font-semibold">Jam</th>
                                                <th className="pr-6 py-3 text-left text-sm font-semibold">Email</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {barber.reservations.map((reservation, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50 transition">
                                                    <td className="pr-6 py-4 text-sm text-gray-900">{reservation.name}</td>
                                                    <td className="pr-6 py-4 text-sm text-gray-900">{reservation.hour}:00</td>
                                                    <td className="pr-6 py-4 text-sm text-gray-900">{reservation.email}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">Tidak ada antrian hari ini</p>
                    </div>
                )}
            </div>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1>EDIT</h1>
                <Autocomplete className="max-w-xs" onSelectionChange={(e: any) => onSelectionChange(e)} value={form.capster_id} selectedKey={form.capster_id}>
                    {capsters.map((item: any) => (
                        <AutocompleteItem key={item._id}>{item.username}</AutocompleteItem>
                    ))}
                </Autocomplete>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default Page