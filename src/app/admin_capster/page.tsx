'use client'
import { createCapster, getAllCapster } from '@/api/method';
import ButtonPrimary from '@/elements/buttonPrimary';
import InputSecond from '@/elements/input/InputSecond';
import CaraoselImage from '@/fragments/caraoselGalery/caraoselGalery';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import ModalDefault from '@/fragments/modal/modal';
import { users } from '@/utils/helper';
import { Autocomplete, AutocompleteItem, getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SwiperSlide } from 'swiper/react';
import { IoCameraOutline, IoCloseCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import logo from '@/assets/logo.svg';
import ButtonSecondary from '@/elements/buttonSecondary';

type Props = {}

function page({ }: Props) {

    const [formUpdate, setFormUpdate] = useState({
        name: [] as (File | string)[],
    });
    const [errorMsg, setErrorMsg] = useState({
        image: '',
        imageUpdate: '',
    });
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [capters, setCapters] = useState([])
    const [selectedCapster, setSelectedCapster] = useState<string | null>(null);

    const fetchData = async () => {
        const capster = await getAllCapster()
        setCapters(capster?.data || [])
    }

    useEffect(() => {
        fetchData()
    }, [])

    const openModalCreate = (capsterId: string) => {
        setSelectedCapster(capsterId);
        onOpen();
    }

    const router = useRouter();
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, InputSelect: string) => {
        const selectedImage = e.target.files?.[0];

        if (!selectedImage) {
            console.log('No file selected');
            return;
        }

        // Validasi tipe file
        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(selectedImage.type)) {
            setErrorMsg((prev) => ({
                ...prev,
                imageUpdate: '*Hanya file PNG dan JPG yang diperbolehkan',
            }));
            return;
        }

        // Validasi ukuran file (dalam byte, 5MB = 5 * 1024 * 1024)
        const maxSize = 5 * 1024 * 1024;
        if (selectedImage.size > maxSize) {
            setErrorMsg((prev) => ({
                ...prev,
                imageUpdate: '*Ukuran file maksimal 5 MB',
            }));
            return;
        }

        // Hapus pesan error jika file valid
        setErrorMsg((prev) => ({
            ...prev,
            imageUpdate: '',
        }));

        // Update state formUpdate dengan file yang valid
        setFormUpdate((prevState) => ({
            ...prevState,
            name: [...prevState.name, selectedImage],
        }));
    };

    const deleteArrayImage = (index: number) => {
        setFormUpdate(prevState => ({
            ...prevState,
            name: prevState.name.filter((_, i) => i !== index)
        }));
    };

    const handleUpdate = async () => {
        try {
            // Here you would typically upload the images to the server
            // and associate them with the selectedCapster
            console.log('Uploading images for capster:', selectedCapster);
            console.log('Images to upload:', formUpdate.name);

            // Reset form after submission
            setFormUpdate({ name: [] });
            onClose();
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <DefaultLayout>
            <div className="flex justify-between items-center mb-3">
                <h1 className='text-black text-xl font-semibold'>ALL CAPSTERS</h1>
            </div>

            {capters?.map((item: any, index: any) => (
                <div key={index} className="content p-3 border border-gray-400 rounded-xl mb-5">
                    <div className="flex flex-col items-center md:flex-row md:items-start md:gap-4 mx-auto">
                        <div className="w-28 h-52 md:w-40 md:h-56  mb-4 md:mb-0">
                            <img
                                className="rounded-lg mx-auto w-full h-full object-cover"
                                src={item.avatar || 'https://infokalteng.co/foto_berita/135642-dbb76965-0732-4b1b-bbe2-cbea751844c6.jpeg'}
                                alt="Yangyang"
                            />
                        </div>

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
                            {/* Display existing images here */}
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                            <img className='w-20 h-20 object-cover rounded-lg' src="https://www.apetogentleman.com/wp-content/uploads/2021/05/bald-fade-buzz-cut.jpg" alt="" />
                        </div>

                        <div className="flex items-end mt-4 lg:mt0">
                            <div className="flex gap-3">
                                <ButtonPrimary
                                    className='py-2 px-3 rounded-xl'
                                    onClick={() => openModalCreate(item._id)}
                                >
                                    + Tambah Foto
                                </ButtonPrimary>
                                <ButtonPrimary
                                    className='py-2 px-3 rounded-xl'
                                    onClick={() => router.push(`/admin_capster/edit_capster/${item._id}`)}
                                >
                                    Edit Capster
                                </ButtonPrimary>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            <ButtonPrimary
                className='py-2 px-3 rounded-xl mt-6'
                onClick={() => router.push('/admin_capster/add_capster')}
            >
                + Tambah Capster
            </ButtonPrimary>

            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1 className='text-black text-xl font-semibold mb-4'>TAMBAH FOTO UNTUK CAPSTER</h1>
                <div>
                    <CaraoselImage>
                        {formUpdate.name.length > 0 ? (
                            formUpdate.name.map((image: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <div className="relative">
                                        <div className="flex justify-center items-center" style={{ pointerEvents: 'none' }}>
                                            <img
                                                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                                                alt={`preview-${index}`}
                                                className="w-auto h-[200px] object-contain"
                                            />
                                        </div>
                                        <button
                                            onClick={() => deleteArrayImage(index)}
                                            className="absolute top-2 right-2 z-10 bg-white rounded-full"
                                        >
                                            <IoCloseCircleOutline color="red" size={24} />
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-[200px] border-1 border-slate-200">
                                <IoCameraOutline size={50} />
                            </div>
                        )}
                    </CaraoselImage>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <ButtonPrimary className='rounded-md relative cursor-pointer py-2 px-1'>
                            Tambah Foto
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => handleImageChange(e, 'update')}
                                accept="image/png, image/jpeg"
                                multiple
                            />
                        </ButtonPrimary>
                        <ButtonSecondary
                            className='rounded-md py-2 px-1'
                            onClick={() => setFormUpdate({ name: [] })}
                        >
                            Hapus Semua
                        </ButtonSecondary>
                    </div>

                    {errorMsg.imageUpdate && (
                        <p className='text-red-500 text-sm mt-2'>{errorMsg.imageUpdate}</p>
                    )}

                    <div className="mt-6">
                        <ButtonPrimary
                            className='w-full py-2 rounded-md'
                            onClick={handleUpdate}
                            disabled={formUpdate.name.length === 0}
                        >
                            Simpan Foto
                        </ButtonPrimary>
                    </div>
                </div>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default page