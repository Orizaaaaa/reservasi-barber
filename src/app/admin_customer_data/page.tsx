'use client'
import { getAllReservation } from '@/api/method'
import ButtonPrimary from '@/elements/buttonPrimary'
import ButtonSecondary from '@/elements/buttonSecondary'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import {
    Autocomplete,
    AutocompleteItem,
    DatePicker,
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

type Props = {}

const Page = (props: Props) => {
    const [data, setData] = React.useState<any[]>([])
    const [page, setPage] = React.useState(1)
    const [loading, setLoading] = React.useState(false)
    const rowsPerPage = 4

    const dataTipe = [
        { key: 'dipinjam', label: 'Dipinjam', value: 'dipinjam' },
        { key: 'belum diambil', label: 'Belum diambil', value: 'belum diambil' },
        { key: 'dikembalikan', label: 'Dikembalikan', value: 'dikembalikan' },
        { key: 'terlambat', label: 'Terlambat', value: 'terlambat' },
        { key: 'hilang', label: 'Hilang', value: 'hilang' },
    ]

    const pages = Math.ceil(data.length / rowsPerPage)

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return data.slice(start, end)
    }, [page, data])

    // Ambil data dari API dan filter yang selesai
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getAllReservation()
            const filtered = result?.data?.filter((item: any) => item.status === 'Selesai') || []

            const formatted = filtered.map((item: any) => ({
                ...item,
                capster_name: item.capster_id?.username || '-',
                payment_name: item.payment_id?.name || '-',
                service_name: item.service_id?.name || '-',
                date_formatted: new Date(item.date).toLocaleDateString('id-ID'),
            }))

            setData(formatted)
            setLoading(false)
        }

        fetchData()
    }, [])

    return (
        <DefaultLayout>
            <Autocomplete
                placeholder="Semua"
                className="w-full border-2 border-primary rounded-lg"
            >
                {dataTipe.map((item) => (
                    <AutocompleteItem key={item.key} className="border-b border-black">
                        {item.label}
                    </AutocompleteItem>
                ))}
            </Autocomplete>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5">
                <div className="col-span-1 md:col-span-2">
                    <DatePicker className="w-full border-2 border-black rounded-lg" />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <DatePicker className="w-full border-2 border-black rounded-lg" />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <ButtonSecondary className="w-full h-full rounded-lg py-3 md:py-0">
                        Cetak Data
                    </ButtonSecondary>
                </div>
            </div>

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
                    <TableColumn key="name">NAMA CUSTOMER</TableColumn>
                    <TableColumn key="phone">PHONE</TableColumn>
                    <TableColumn key="capster_name">CAPSTER</TableColumn>
                    <TableColumn key="date_formatted">TANGGAL</TableColumn>
                    <TableColumn key="hour">JAM</TableColumn>
                    <TableColumn key="payment_name">PEMBAYARAN</TableColumn>
                    <TableColumn key="haircut_type">HAIRCUT</TableColumn>
                </TableHeader>
                <TableBody items={items} isLoading={loading}>
                    {(item: any) => (
                        <TableRow key={item._id}>
                            {(columnKey: any) => (
                                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default Page
