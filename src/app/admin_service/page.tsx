'use client'
import { createService, getAllService } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { formatRupiah, users } from '@/utils/helper';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import React, { useEffect } from 'react'

type Props = {}

function page({ }: Props) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [services, setServices] = React.useState([])
    const [form, setForm]: any = React.useState({
        name: "",
        description: "",
        price: 0
    });
    const fetchData = async () => {
        const data = await getAllService()
        setServices(data?.data || [])
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [page, setPage]: any = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev: { name: string }) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e: any) => {
        e.preventDefault();
        await createService(form, (res: any) => {
            console.log(res);
            fetchData()
            onClose()
            setForm({
                name: "",
                description: "",
                price: 0
            })
        })
    }

    return (
        <DefaultLayout>
            <div className="flex justify-between items-center mb-3">
                <h1 className='text-white'>Service</h1>
                <div className="">
                    <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={onOpen}>Add Service</ButtonPrimary>
                </div>
            </div>

            <Table
                aria-label="Example table with client side pagination "
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
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
                    <TableColumn key="description">DESCRIPTION</TableColumn>
                    <TableColumn key="price">PRICE</TableColumn>
                </TableHeader>
                <TableBody items={services}>
                    {(item: any) => (
                        <TableRow key={item.name}>
                            {(columnKey: any) => (
                                <TableCell>
                                    {columnKey === 'price'
                                        ? formatRupiah(item[columnKey])
                                        : getKeyValue(item, columnKey)}
                                </TableCell>
                            )}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <ModalDefault isOpen={isOpen} onClose={onClose} className='w-full max-w-2xl bg-secondBlack' closeButton={false} >
                <h1 className='text-white' >CREATE PAYMENTS</h1>
                <form className="" onSubmit={handleCreate}>
                    <InputSecond
                        marginY='my-2'
                        title="Name"
                        htmlFor="name"
                        type="text"
                        className="w-full"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <InputSecond
                        marginY='my-2'
                        title="Description"
                        htmlFor="description"
                        type="text"
                        className="w-full"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <InputSecond
                        marginY='my-2'
                        title="Price"
                        htmlFor="price"
                        type="number"
                        className="w-full"
                        value={form.price}
                        onChange={handleChange}
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type='submit'
                            className="bg-blue-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </ModalDefault>
        </DefaultLayout>

    )
}

export default page