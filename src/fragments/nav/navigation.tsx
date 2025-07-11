// components/BottomNavigation.jsx
import React from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineBell, AiOutlineClockCircle } from 'react-icons/ai';
import { BsCalendar } from 'react-icons/bs';

const BottomNavigation = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-grayCustom shadow-2xl shadow-gray-400 md:hidden z-50">
            {/*
        Penjelasan:
        - fixed bottom-0 left-0 right-0: Menempatkan nav di bagian bawah, full width.
        - bg-white: Background putih.
        - shadow-lg: Ini adalah class Tailwind yang menambahkan bayangan besar.
                     Anda bisa mencoba 'shadow', 'shadow-md', 'shadow-xl', atau 'shadow-2xl'
                     untuk melihat efek yang berbeda. 'shadow-lg' biasanya sudah cukup jelas.
        - md:hidden: Sembunyikan di layar ukuran medium ke atas (hanya muncul di mobile).
        - z-50: Pastikan nav berada di atas konten lain.
      */}
            <div className="flex justify-around items-center h-16">
                <Link href="/" className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                    <AiOutlineHome className="text-2xl" />
                </Link>
                <Link href="/calendar" className="flex flex-col items-center justify-center text-blue-600">
                    <BsCalendar className="text-2xl" />
                </Link>
                <Link href="/notifications" className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                    <AiOutlineBell className="text-2xl" />
                </Link>
                <Link href="/history" className="flex flex-col items-center justify-center text-gray-600 hover:text-blue-600">
                    <AiOutlineClockCircle className="text-2xl" />
                </Link>
            </div>
        </nav>
    );
};

export default BottomNavigation;