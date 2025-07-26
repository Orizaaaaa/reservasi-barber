'use client'
import { createCapster, getAllCapster } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { users } from '@/utils/helper';
import { Autocomplete, AutocompleteItem, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
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

    const router = useRouter();

    return (
        <DefaultLayout>
            <div className="flex justify-between items-center mb-3">
                <h1 className='text-black text-xl font-semibold'>ALL CAPSTERS</h1>
            </div>

            {capters?.map((item: any, index: any) => (
                <div key={index} className="content p-3 border border-gray-400 rounded-xl mb-5">
                    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-4 mx-auto">
                        {/* Gambar di tengah (mobile) dan kiri (desktop) */}
                        <div className="w-28 h-52 md:w-40 md:h-56  mb-4 md:mb-0">
                            <img
                                className="rounded-lg mx-auto w-full h-full object-cover"
                                src={item.avatar || 'https://infokalteng.co/foto_berita/135642-dbb76965-0732-4b1b-bbe2-cbea751844c6.jpeg'}
                                alt="Yangyang"
                            />
                        </div>

                        {/* Teks */}
                        <div className=" md:text-left px-2 md:px-4">
                            <h1 className="text-lg font-bold text-center md:text-left">{item.username}</h1>
                            <h2 className="text-sm text-gray-600 mb-2 text-center md:text-left">{item.spesialis}</h2>
                            <p className="text-sm text-gray-700">
                                {item.description}
                            </p>
                        </div>
                    </div>


                    <div className="flex-row lg:flex justify-between mt-4">
                        <div className="grid grid-cols-4 md:grid-cols-5 gap-5">
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                        </div>

                        <div className="flex items-end mt-4 lg:mt0">
                            <div className="flex gap-3">
                                <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={openModalCreate}> + Tambah Foto</ButtonPrimary>
                                <ButtonPrimary className='py-2 px-3 rounded-xl' onClick={openModalCreate}> Edit Capster</ButtonPrimary>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ButtonPrimary className='py-2 px-3 rounded-xl mt-6' onClick={() => (router.push('/admin_capster/add_capster'))}> + Tambah Capster</ButtonPrimary>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1 className='text-black' >ADD FOTO</h1>

            </ModalDefault>


        </DefaultLayout>
    )
}

export default page