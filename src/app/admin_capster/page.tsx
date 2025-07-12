'use client'
import { createCapster, getAllCapster } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { users } from '@/utils/helper';
import { Autocomplete, AutocompleteItem, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import React, { useEffect, useState } from 'react'

type Props = {}
interface ProfileForm {
    username: string;
    phone: string;
    description: string;
    avatar: string;
    email: string;
    address: string;
}
function page({ }: Props) {
    const fetchData = async () => {
        const capster = await getAllCapster()
        setCapters(capster?.data || [])
    }
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { onOpen: onOpenEdit, onClose: onCloseEdit, isOpen: isOpenEdit } = useDisclosure();
    const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
    const [capters, setCapters] = useState([])
    const [page, setPage]: any = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);
    const [form, setForm] = useState<ProfileForm>({
        username: '',
        phone: '',
        description: '',
        avatar: '',
        email: '',
        address: ''
    });

    const [formEdit, setFormEdit] = useState<ProfileForm>({
        username: '',
        phone: '',
        description: '',
        avatar: '',
        email: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };



    useEffect(() => {
        fetchData()
    }, [])


    const openModalCreate = () => {
        onOpen()
    }

    const openModalEdit = (item: any) => {
        onOpenEdit()
        console.log('Edit:', item);
        setFormEdit({
            username: item.username,
            phone: item.phone,
            description: item.description,
            avatar: item.avatar,
            email: item.email,
            address: item.address
        })
        // bisa navigasi ke halaman edit atau buka modal
    }

    const handleCreate = async (e: any) => {
        e.preventDefault();
        await createCapster(form, (res: any) => {
            console.log(res);
            fetchData()
            onClose()
            setForm({
                username: '',
                phone: '',
                description: '',
                avatar: '',
                email: '',
                address: ''
            })
        })
    }

    console.log('capters', capters);


    return (
        <DefaultLayout>
            <div className="flex justify-between items-center mb-3">
                <h1 className='text-white'>ALL CAPSTERS</h1>
                <div className="">
                    <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={openModalCreate}>Add Capster</ButtonPrimary>
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
                    // bagian kepala tabel
                    th: "text-white bg-black",        // teks kolom header
                    // teks isi cell
                    wrapper: "min-h-[222px] bg-[#16181a] text-white",
                }}
            >
                <TableHeader>
                    <TableColumn key="username">NAME</TableColumn>
                    <TableColumn key="phone">PHONE</TableColumn>
                    <TableColumn key="email">EMAIL</TableColumn>
                    <TableColumn key="address">ADRESS</TableColumn>
                    <TableColumn key="rating">RATING</TableColumn>
                    <TableColumn key="description">DESCRIPTION</TableColumn>
                    <TableColumn key="action">ACTION</TableColumn>
                </TableHeader>
                <TableBody items={capters}>
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

            <ModalDefault className='bg-secondBlack' isOpen={isOpen} onClose={onClose}>
                <h1 className='text-white' >CREATE</h1>
                <form className="" onSubmit={handleCreate}>
                    <InputSecond
                        marginY='my-2'
                        title="Username"
                        htmlFor="username"
                        type="text"
                        className="w-full"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <InputSecond
                                marginY='my-2'
                                title="Email"
                                htmlFor="email"
                                type="email"
                                className="w-full"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputSecond
                                className="w-full"
                                htmlFor="phone"
                                marginY='my-2'
                                title="No Handphone"
                                type="text"
                                onChange={handleChange}
                                value={form.phone}
                            />
                        </div>
                    </div>


                    <InputSecond
                        marginY='my-2'
                        title="Alamat"
                        htmlFor="address"
                        type="text"
                        className="w-full"
                        value={form.address}
                        onChange={handleChange}
                    />

                    <h3 className='text-white mb-1 mt-3' >Deskripsi</h3>
                    <textarea
                        name="description"
                        placeholder="Deskripsi"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border border-white focus:border-white focus:outline-none focus:ring-0 p-2 rounded-md text-white bg-transparent"
                    />


                    {/* Avatar input bisa berupa file upload */}
                    <InputSecond
                        marginY='my-2'
                        title="Avatar URL"
                        htmlFor="avatar"
                        type="text"
                        className="w-full"
                        value={form.avatar}
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

            <ModalDefault className='bg-secondBlack' isOpen={isOpenEdit} onClose={onCloseEdit}>
                <h1 className='text-white' >EDIT</h1>
                <div className="">
                    <InputSecond
                        marginY='my-2'
                        title="Username"
                        htmlFor="username"
                        type="text"
                        className="w-full"
                        value={formEdit.username}
                        onChange={handleChange}
                    />

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <InputSecond
                                marginY='my-2'
                                title="Email"
                                htmlFor="email"
                                type="email"
                                className="w-full"
                                value={formEdit.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <InputSecond
                                className="w-full"
                                htmlFor="phone"
                                marginY='my-2'
                                title="No Handphone"
                                type="text"
                                onChange={handleChange}
                                value={formEdit.phone}
                            />
                        </div>
                    </div>


                    <InputSecond
                        marginY='my-2'
                        title="Alamat"
                        htmlFor="address"
                        type="text"
                        className="w-full"
                        value={formEdit.address}
                        onChange={handleChange}
                    />

                    <h3 className='text-white mb-1 mt-3' >Deskripsi</h3>
                    <textarea
                        name="description"
                        placeholder="Deskripsi"
                        value={formEdit.description}
                        onChange={handleChange}
                        className="w-full border border-white focus:border-white focus:outline-none focus:ring-0 p-2 rounded-md text-white bg-transparent"
                    />


                    {/* Avatar input bisa berupa file upload */}
                    <InputSecond
                        marginY='my-2'
                        title="Avatar URL"
                        htmlFor="avatar"
                        type="text"
                        className="w-full"
                        value={formEdit.avatar}
                        onChange={handleChange}
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className="bg-blue-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                        >
                            Save
                        </button>
                        <button
                            className="bg-red-800 text-white cursor-pointer px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                            onClick={onCloseEdit}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default page