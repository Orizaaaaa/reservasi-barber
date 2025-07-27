'use client'
import { getAllReservation } from '@/api/method';
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    const [booking, setBooking] = React.useState<any>([]);
    const fetchData = async () => {
        const booking = await getAllReservation()

        setBooking(booking?.data || [])

    }
    useEffect(() => {
        fetchData();
    }, []);
    console.log(booking);

    return (
        <div>page</div>
    )
}

export default page