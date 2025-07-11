import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <DefaultLayout>
            <h1 className='text-white'>Capster</h1>
        </DefaultLayout>
    )
}

export default page