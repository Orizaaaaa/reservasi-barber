'use client'
import InputSecond from '@/elements/input/InputSecond';
import DefaultLayout from '@/fragments/layout/adminLayout/DefaultLayout'
import { users } from '@/utils/helper';
import { getKeyValue, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import React, { useState } from 'react'

type Props = {}
interface ProfileForm {
    username: string;
    phone: string;
    description: string;
    avatar: string;
    email: string;
    address: string;
}
function page({ }: Props) {
    const [page, setPage]: any = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page, users]);

    const [form, setForm] = useState<ProfileForm>({
        username: '',
        phone: '',
        description: '',
        avatar: '',
        email: '',
        address: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <DefaultLayout>
            <h1 className='text-white'>Capster</h1>
            <form className="space-y-4">
                <InputSecond

                    title="Username"
                    htmlFor="username"
                    type="text"
                    className="w-full"
                    value={form.username}
                    onChange={handleChange}
                />

                <InputSecond

                    title="No. Handphone"
                    htmlFor="phone"
                    type="text"
                    className="w-full"
                    value={form.phone}
                    onChange={handleChange}
                />

                <InputSecond

                    title="Email"
                    htmlFor="email"
                    type="email"
                    className="w-full"
                    value={form.email}
                    onChange={handleChange}
                />

                <InputSecond

                    title="Alamat"
                    htmlFor="address"
                    type="text"
                    className="w-full"
                    value={form.address}
                    onChange={handleChange}
                />

                <h3 className='text-white' >Deskripsi</h3>
                <textarea
                    name="description"
                    placeholder="Deskripsi"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-md"
                ></textarea>

                {/* Avatar input bisa berupa file upload */}
                <InputSecond
                    title="Avatar URL"
                    htmlFor="avatar"
                    type="text"
                    className="w-full"
                    value={form.avatar}
                    onChange={handleChange}
                />
            </form>

            <Table
                aria-label="Example table with client side pagination "
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    // bagian kepala tabel
                    th: "text-white bg-black",        // teks kolom header
                    // teks isi cell
                    wrapper: "min-h-[222px] bg-[#16181a] text-white",
                }}
            >
                <TableHeader>
                    <TableColumn key="name">NAME</TableColumn>
                    <TableColumn key="role">ROLE</TableColumn>
                    <TableColumn key="status">STATUS</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                    {(item: any) => (
                        <TableRow key={item.name}>
                            {(columnKey: any) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </DefaultLayout>
    )
}

export default page