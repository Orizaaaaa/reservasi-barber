'use client'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React, { useEffect } from 'react'

type Props = {}

const page = (props: Props) => {
    useEffect(() => {

    }, []);
    return (
        <DefaultLayout>
            <div className='flex gap-10 px-4'>
                <div className='h-28 w-28 rounded-full'>
                    <img className='cover w-full h-full  rounded-full'
                        src="https://awsimages.detik.net.id/community/media/visual/2017/12/06/6414c1ae-fcd1-49a6-8316-4a71c29f93ff_43.jpg?w=600&q=90"
                        alt=""
                    />
                </div>

                <div>
                    <h1 className='text-xl font-bold' >Yangyang</h1>
                    <h1 className='font-semi-bold mt-2 font-semibold' >Hari Kerja : Senin -Sabtu </h1>
                    <h1 className='font-semi-bold font-semibold' >Hari Libur : Minggu </h1>
                    <h1 className='font-semi-bold font-semibold ' >Status     :  <span className='italic' >Sedang bekerja</span>  </h1>
                </div>

            </div>


        </DefaultLayout>

    )
}

export default page