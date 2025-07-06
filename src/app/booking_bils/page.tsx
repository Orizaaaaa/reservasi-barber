import React from 'react';

const page = () => {
    return (
        <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <div className="w-full max-w-md flex items-center justify-center mb-8">
                {/* Profile Picture Placeholder */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-700 rounded-full flex-shrink-0 mr-4"></div>
                {/* Booking Anda Title */}
                <div className="flex-grow bg-white rounded-full py-3 px-6 shadow-lg flex items-center justify-center">
                    <h1 className="text-blue-900 text-xl sm:text-2xl font-semibold">Booking anda</h1>
                </div>
            </div>

            {/* Booking Details Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8">
                {/* Detail Item: Nama */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700 text-base sm:text-lg font-medium">Nama</span>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">: Asep Barong</span>
                </div>

                {/* Detail Item: Jam */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700 text-base sm:text-lg font-medium">Jam</span>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">: 14:00</span>
                </div>

                {/* Detail Item: Capster */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700 text-base sm:text-lg font-medium">Capster</span>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">: YANGYANG</span>
                </div>

                {/* Detail Item: Pembayaran */}
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="text-gray-700 text-base sm:text-lg font-medium">Pembayaran</span>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">: Cash</span>
                </div>

                {/* Detail Item: No hp */}
                <div className="flex justify-between items-center py-3">
                    <span className="text-gray-700 text-base sm:text-lg font-medium">No hp</span>
                    <span className="text-gray-900 text-base sm:text-lg font-semibold">: 081223304859</span>
                </div>

                {/* Status and Button Section */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-sm sm:text-base mb-3">Mohon Menunggu</p>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Hubungi Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default page;
