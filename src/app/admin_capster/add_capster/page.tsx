'use client'
import { createCapster } from '@/api/method'
import ButtonPrimary from '@/elements/buttonPrimary'
import ButtonSecondary from '@/elements/buttonSecondary'
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React, { useState } from 'react'
import { CiCamera } from 'react-icons/ci'
import { IoCameraOutline } from 'react-icons/io5'
import { MdOutlineCameraAlt } from 'react-icons/md'

type Props = {}

interface ProfileForm {
    username: string;
    phone: string;
    description: string;
    avatar: string;
    email: string;
    address: string;
}

const page = (props: Props) => {
    const [form, setForm] = useState<ProfileForm>({
        username: '',
        phone: '',
        description: '',
        avatar: '',
        email: '',
        address: ''
    });

    const handleCreate = async (e: any) => {
        e.preventDefault();
        await createCapster(form, (res: any) => {
            console.log(res);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    return (
        <DefaultLayout>
            <div className="flex justify-center items-center">
                <div>
                    <div className='border border-gray-400 py-20 px-10 rounded-lg flex justify-center items-center'>
                        <CiCamera size={50} color='black' />
                    </div>

                    <div className='flex justify-center items-center gap-2 mt-5'>
                        <ButtonPrimary className='border-2 border-black px-3 py-2 rounded-lg'>Ubah Foto </ButtonPrimary>
                        <ButtonSecondary className=' px-3 py-2 rounded-lg' >Hapus Foto</ButtonSecondary>
                    </div>
                </div>
            </div>

            <form className="" onSubmit={handleCreate}>
                <InputSecond
                    styleTitle={'text-black'}
                    bg={'bg-transparent border border-gray-400'}
                    marginY='my-1'
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
                            styleTitle={'text-black'}
                            bg={'bg-transparent border border-gray-400'}
                            marginY='my-1'
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
                            styleTitle={'text-black'}
                            bg={'bg-transparent border border-gray-400'}
                            className="w-full"
                            htmlFor="phone"
                            marginY='my-1'
                            title="No Handphone"
                            type="text"
                            onChange={handleChange}
                            value={form.phone}
                        />
                    </div>
                </div>


                <InputSecond
                    styleTitle={'text-black'}
                    bg={'bg-transparent border border-gray-400'}
                    marginY='my-1'
                    title="Alamat"
                    htmlFor="address"
                    type="text"
                    className="w-full"
                    value={form.address}
                    onChange={handleChange}
                />

                <h3 className='text-black mb-1 mt-3' >Deskripsi</h3>
                <textarea
                    placeholder="Deskripsi"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 p-2 rounded-md text-black bg-transparent"
                />


                <ButtonPrimary className='py-2 px-3 rounded-xl mt-4 '>
                    Tambah Capster
                </ButtonPrimary>
            </form>
        </DefaultLayout >

    )
}

export default page