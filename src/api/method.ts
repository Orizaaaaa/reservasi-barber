import { axiosInterceptor } from "./axiosInterceptor";

// services/api.ts
export const getAllReservation = async () => {
    try {
        const res = await axiosInterceptor.get('/booking');
        return res.data; // ✅ return data
    } catch (err) {
        console.error(err);
        return []; // atau null, tergantung kebutuhan
    }
};
