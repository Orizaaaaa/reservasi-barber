import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <DefaultLayout>
            <div className='flex gap-10'>
                <div className='h-28 w-28 rounded-full'>
                    <img className='cover w-full h-full  rounded-full'
                        src="https://awsimages.detik.net.id/community/media/visual/2017/12/06/6414c1ae-fcd1-49a6-8316-4a71c29f93ff_43.jpg?w=600&q=90"
                        alt=""
                    />
                </div>

                <div>
                    <h1 className='text-xl font-bold' >Yangyang</h1>
                    <h1 className='font-medium mt-2' >Hari Kerja : Senin -Sabtu </h1>
                    <h1 className='font-medium' >Hari Libur : Senin -Sabtu </h1>
                    <h1 className='font-medium ' >Status     :  <span className='italic' >Sedang bekerja</span>  </h1>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default page