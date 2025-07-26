'use client'
import { getCapsterById } from '@/api/method'
import ButtonPrimary from '@/elements/buttonPrimary'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import {
    getKeyValue,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaPenSquare, FaTrashAlt } from 'react-icons/fa'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'

type Props = {}

const Page = (props: Props) => {
    const [data, setData] = useState<any>(null)
    const [items, setItems] = useState<any[]>([])
    const { id }: any = useParams()

    useEffect(() => {
        if (!id) return

        getCapsterById(id, (res: any) => {
            const result = res.data
            setData(result)

            const scheduleData = result.schedule || {}

            const days = [
                { key: 'senin', label: 'Senin' },
                { key: 'selasa', label: 'Selasa' },
                { key: 'rabu', label: 'Rabu' },
                { key: 'kamis', label: 'Kamis' },
                { key: 'jumat', label: 'Jumat' },
                { key: 'sabtu', label: 'Sabtu' },
                { key: 'minggu', label: 'Minggu' },
            ]

            const formattedItems = days.map((day) => {
                const sched = scheduleData[day.key] || {}
                return {
                    _id: day.key,
                    name: day.label,
                    is_active: sched.is_active,
                    jam_kerja: sched.is_active ? sched.jam_kerja : '-',
                    jam_istirahat: sched.is_active ? sched.jam_istirahat : '-',
                }
            })
            setItems(formattedItems)
        })
    }, [id])

    const handleToggle = (id: string) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id ? { ...item, is_active: !item.is_active } : item
            )
        );
    };

    console.log('data', data);

    return (
        <DefaultLayout>
            {data && (
                <>
                    <div className="flex gap-10 px-4 mb-6">
                        <div className="h-28 w-28 rounded-full">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src={data.avatar}
                                alt={data.username}
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold">{data.username}</h1>
                            <h1 className="font-semibold mt-2">Hari Kerja: Senin - Sabtu</h1>
                            <h1 className="font-semibold">Hari Libur: Minggu</h1>
                            <h1 className="font-semibold">
                                Status:{' '}
                                <span className="italic">
                                    {
                                        data.schedule?.[new Date().toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                        }).toLowerCase()]?.is_active
                                            ? 'Sedang bekerja'
                                            : 'Sedang libur'
                                    }
                                </span>
                            </h1>
                        </div>
                    </div>

                    <Table
                        aria-label="Tabel Jadwal"
                        classNames={{
                            th: 'bg-gray-100 text-black font-semibold',
                            td: 'text-black',
                            wrapper: 'bg-white text-black',
                        }}
                    >
                        <TableHeader>
                            <TableColumn key="name">HARI</TableColumn>
                            <TableColumn key="is_active">STATUS</TableColumn>
                            <TableColumn key="jam_kerja">JAM KERJA</TableColumn>
                            <TableColumn key="jam_istirahat">JAM ISTIRAHAT</TableColumn>
                            <TableColumn key="action">ACTION</TableColumn>
                        </TableHeader>
                        <TableBody items={items}>
                            {(item: any) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={item.is_active}
                                                onChange={() => handleToggle(item._id)}
                                            />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                                                dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                                                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                                                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                                after:start-[2px] after:bg-white after:border-gray-300 after:border 
                                                after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                                                peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                                            </div>

                                        </label>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex">
                                            <h1 className='py-1 px-3 border-black border rounded-md' >10 : 00</h1>
                                            <h1 className="mx-2">-</h1>
                                            <h1 className='py-1 px-3 border-black border rounded-md' >10 : 00</h1>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex">
                                            <h1 className='py-1 px-3 border-black border rounded-md' >10 : 00</h1>
                                            <h1 className="mx-2">-</h1>
                                            <h1 className='py-1 px-3 border-black border rounded-md' >10 : 00</h1>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <ButtonPrimary className='py-2 w-full rounded-lg' >Generate</ButtonPrimary>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}
        </DefaultLayout>
    )
}

export default Page
