'use client'
import { postImage } from '@/api/image_post'
import { createCapster } from '@/api/method'
import ButtonPrimary from '@/elements/buttonPrimary'
import ButtonSecondary from '@/elements/buttonSecondary'
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { CiCamera } from 'react-icons/ci'
import { IoCameraOutline } from 'react-icons/io5'
import { MdOutlineCameraAlt } from 'react-icons/md'

type Props = {}

interface ProfileForm {
    username: string;
    phone: string;
    description: string;
    avatar: any;
    email: string;
    address: string;
}

const page = (props: Props) => {
    const router = useRouter()
    const [form, setForm] = useState<ProfileForm>({
        username: '',
        phone: '',
        description: '',
        avatar: null as File | null,
        email: '',
        address: ''
    });


    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            let imageUrl = '';

            if (form.avatar) {
                const uploadToast = toast.loading('Mengunggah gambar...');
                try {
                    imageUrl = await postImage({ image: form.avatar });
                    toast.success('Gambar berhasil diunggah', { id: uploadToast });
                } catch (error) {
                    toast.error('Gagal mengunggah gambar', { id: uploadToast });
                    return;
                }
            }

            const createToast = toast.loading('Menyimpan data capster...');
            await createCapster(
                { ...form, avatar: imageUrl },
                (res: any) => {
                    toast.success('Capster berhasil ditambahkan!', { id: createToast });
                    router.push('/admin_capster');
                    setForm({
                        username: '',
                        phone: '',
                        description: '',
                        avatar: null,
                        email: '',
                        address: ''
                    });
                    console.log(res);

                }
            );
        } catch (error) {
            console.error('Gagal membuat capster:', error);
            toast.error('Terjadi kesalahan saat membuat capster.');
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileManager = (fileName: string) => {
        if (fileName === 'add') {
            const fileInput = document.getElementById("image-input-add") as HTMLInputElement | null;
            fileInput ? fileInput.click() : null;
        } else {
            console.log('error');

        }
    };
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        if (InputSelect === 'add') {
            const selectedImage = e.target.files?.[0];
            setForm({ ...form, avatar: selectedImage || null });
        } else {
            console.log('error');

        }
    };

    return (
        <DefaultLayout>
            <div className="flex justify-center items-center">
                <div>

                    {form.avatar && form.avatar instanceof Blob ? (
                        <img
                            className="h-[200px] w-[200px] mx-auto object-cover border border-gray-400 rounded-lg"
                            src={URL.createObjectURL(form.avatar)}
                            alt="Preview"
                        />
                    ) : (
                        <div className="h-[200px] w-[200px] mx-auto border border-gray-400 rounded-lg flex items-center justify-center bg-gray-100">
                            <CiCamera size={50} color="gray" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="image-input-add"
                        onChange={(e) => handleImageChange(e, 'add')}
                    />
                    <div className='flex justify-center items-center gap-2 mt-5'>
                        <ButtonPrimary className='border-2 border-black px-3 py-2 rounded-lg'
                            onClick={() => handleFileManager('add')}>Ubah Foto </ButtonPrimary>
                        <ButtonSecondary onClick={() => setForm({ ...form, avatar: null })} className=' px-3 py-2 rounded-lg' >Hapus Foto</ButtonSecondary>
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
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 p-2 rounded-md text-black bg-transparent"
                />


                <ButtonPrimary typeButon={'submit'} className='py-2 px-3 rounded-xl mt-4 '>
                    Tambah Capster
                </ButtonPrimary>
            </form>
        </DefaultLayout >

    )
}

export default page