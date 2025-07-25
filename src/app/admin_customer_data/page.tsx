'use client'
import ButtonPrimary from '@/elements/buttonPrimary'
import ButtonSecondary from '@/elements/buttonSecondary'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import { Autocomplete, AutocompleteItem, DatePicker } from '@heroui/react'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const dataTipe = [
        { key: 'dipinjam', label: 'Dipinjam', value: 'dipinjam' },
        { key: 'belum diambil', label: 'Belum diambil', value: 'belum diambil' },
        { key: 'dikembalikan', label: 'Dikembalikan', value: 'dikembalikan' },
        { key: 'terlambat', label: 'Terlambat', value: 'terlambat' },
        { key: 'hilang', label: 'Hilang', value: 'hilang' },
    ];
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


        </DefaultLayout>
    )
}

export default page