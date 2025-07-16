'use client'
import InputForm from '@/elements/input/InputForm'
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React from 'react'

type Props = {}

function page({ }: Props) {
    const [form, setForm] = React.useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        hour: 0,
        capster_id: '',
        payment_id: '',
        rating: 0,
        image: '',
        haircut_type: '',
        service_id: '',
        status: 'Menunggu',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

    };
    return (
        <DefaultLayout>
            <div className="form">
                <InputSecond
                    styleTitle='text-black'
                    bg='bg-none border border border-gray-400'
                    className="w-full"
                    htmlFor="phone"
                    title="No Handphone"
                    type="text"
                    onChange={handleChange}
                    value={form.phone}
                />
            </div>
        </DefaultLayout>
    )
}

export default page