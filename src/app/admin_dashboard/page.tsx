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
            payment_id: item.payment_id._id,
            status: item.status,
            capster_id: item.capster_id._id,
        })
        // bisa navigasi ke halaman edit atau buka modal
    }

    const handleDelete = (item: any) => {
        console.log('Delete:', item._id)
        // bisa buka konfirmasi hapus
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
    console.log('caoster', capsters);
    console.log('form', form);
    console.log('data', data);


    return (
        <DefaultLayout>

            <div className="grid grid-cols-2 gap-4 mb-4" >
                <div className="text border border-gray-400 rounded-2xl p-3">
                    <h1 className='text-black text-2xl font-semibold' >Jumlah Barberman Aktif</h1>
                    <h2 className='text-black text-3xl font-extrabold ' >2</h2>
                </div>
                <div className="text border border-gray-400 rounded-2xl p-3">
                    <h1 className='text-black text-2xl  font-semibold' >Total Booking Hari Ini</h1>
                    <h2 className='text-black text-3xl font-extrabold' >2</h2>
                </div>
            </div>

            <div className="border  border-gray-400 p-3 rounded-2xl">
                <h1 className='text-xl font-semibold mb-3' >Jumlah Antrian</h1>
                <div className="grid grid-cols-2 gap-10">
                    <div className="content">
                        <h1 className='text-lg mb-2'>Capster Yangyang</h1>
                        <hr />
                        <h1 className='text-black text-3xl font-extrabold my-5' >5</h1>

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
                                    {users.map((user) => (
                                        <tr key={user.jam * 10} className="hover:bg-gray-50 transition">
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.name}</td>
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.jam + ':00'}</td>
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="content">
                        <h1 className='text-lg mb-2'>Capster Yangyang</h1>
                        <hr />
                        <h1 className='text-black text-3xl font-extrabold my-5' >5</h1>

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
                                    {users.map((user) => (
                                        <tr key={user.jam * 10} className="hover:bg-gray-50 transition">
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.name}</td>
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.jam + ':00'}</td>
                                            <td className="pr-6 py-4 text-sm text-gray-900">{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            {/* <h1 className="text-black mb-4">TODAY RESERVATION</h1>
            <Table
                aria-label="Tabel Booking"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(p) => setPage(p)}
                        />
                    </div>
                }
                classNames={{
                    th: 'text-white bg-black',
                    wrapper: 'min-h-[222px] bg-[#16181a] text-white',
                }}
            >
                <TableHeader>
                    <TableColumn key="name">NAME</TableColumn>
                    <TableColumn key="phone">PHONE</TableColumn>
                    <TableColumn key="capster_name">CAPSTER</TableColumn>
                    <TableColumn key="service_name">SERVICE</TableColumn>
                    <TableColumn key="haircut_type">HAIRCUT</TableColumn>
                    <TableColumn key="formatted_date">DATE</TableColumn>
                    <TableColumn key="hour">HOUR</TableColumn>
                    <TableColumn key="payment_name">PAYMENT</TableColumn>
                    <TableColumn key="status">STATUS</TableColumn>
                    <TableColumn key="action">ACTION</TableColumn>
                </TableHeader>
                <TableBody items={items} isLoading={loading}>
                    {(item: any) => (
                        <TableRow key={item._id}>
                            {(columnKey: any) => (
                                <TableCell>
                                    {columnKey === 'action' ? (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={openModalEdit.bind(null, item)}
                                                className="bg-blue-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="bg-red-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ) : (
                                        getKeyValue(item, columnKey)
                                    )}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table> */}

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
