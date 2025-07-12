'use client'
import { getAllReservation } from '@/api/method'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import {
    getKeyValue,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from '@heroui/react'
import React, { useEffect } from 'react'

const Page = () => {
    const [loading, setLoading] = React.useState(false)
    const [data, setData] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)
    const rowsPerPage = 4

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getAllReservation()
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
    const handleEdit = (item: any) => {
        console.log('Edit:', item._id)
        // bisa navigasi ke halaman edit atau buka modal
    }

    const handleDelete = (item: any) => {
        console.log('Delete:', item._id)
        // bisa buka konfirmasi hapus
    }

    return (
        <DefaultLayout>
            <h1 className="text-white mb-4">TODAY RESERVATION</h1>
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
                                                onClick={() => handleEdit(item)}
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
            </Table>
        </DefaultLayout>
    )
}

export default Page
