'use client'
import { getAllCapster, getAllReservation } from '@/api/method';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout';
import ModalDefault from '@/fragments/modal/modal';
import { Autocomplete, AutocompleteItem, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react'
import React, { useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { RiEdit2Line } from 'react-icons/ri';

type Props = {}

function page({ }: Props) {
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
            <h1 className="text-black mb-4">TODAY RESERVATION</h1>
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
                    th: 'bg-gray-100 text-black font-semibold',
                    td: 'text-black',
                    wrapper: 'bg-white text-black',
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
                                                <RiEdit2Line />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item)}
                                                className="bg-red-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                                            >
                                                <FaTrashAlt />
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
            </Table>

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

export default page