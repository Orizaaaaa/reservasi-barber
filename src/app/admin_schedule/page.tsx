import ButtonPrimary from '@/elements/buttonPrimary'
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>

            <div className="p-3 border-2 border-slate-300 rounded-lg">
                <div className='flex gap-10'>
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

                <h1 className='font-medium mt-4'>Jam Kerja</h1>
                <div className="grid grid-cols-5 gap-4 md:grid-cols-7 mt-2 text-sm">
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 12:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                    <div className=" gap-2 items-center font-light">
                        <h1>Senin</h1>
                        <h1 >08:00 - 17:00</h1>
                    </div>
                </div>
                <ButtonPrimary className='py-2 px-3 mt-4 rounded-lg'> Atur Jadwal</ButtonPrimary>
            </div>

        </DefaultLayout>
    )
}

export default page