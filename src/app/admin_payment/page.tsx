'use client'
import { createPayment, getAllPayments } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { users } from '@/utils/helper';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import React, { useEffect } from 'react'

type Props = {}

function page({ }: Props) {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [form, setForm]: any = React.useState({
        name: ''
    });
    const [payments, setPayments] = React.useState([])
    const fetchData = async () => {
        const data = await getAllPayments()
        setPayments(data?.data || [])
    }
    useEffect(() => {
        fetchData()
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
        await createPayment(form, (res: any) => {
            console.log(res);
            fetchData()
            onClose()
            setForm({
                name: ''
            })
        })
    }
    return (
        <DefaultLayout>
            <div className="flex justify-between items-center mb-3">
                <h1 className='text-white'>PAYMENTS</h1>
                <div className="">
                    <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={onOpen}>Add Payments</ButtonPrimary>
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
                    <TableColumn key="_id">ID</TableColumn>
                    <TableColumn key="name">NAME</TableColumn>

                </TableHeader>
                <TableBody items={payments}>
                    {(item: any) => (
                        <TableRow key={item.name}>
                            {(columnKey: any) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
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