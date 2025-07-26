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


// BOOKING
export const createBooking = async (form: any, callback: any) => {
    await axiosInterceptor.post('/booking', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

// CAPSTER
export const getAllCapster = async () => {
    try {
        const res = await axiosInterceptor.get('/capster');
        return res.data; // ✅ return data
    } catch (err) {
        console.error(err);
        return []; // atau null, tergantung kebutuhan
    }
};

export const getCapsterById = (id: string, callback: any) => {
    axiosInterceptor(`/capster/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const createCapster = async (form: any, callback: any) => {
    await axiosInterceptor.post('/capster', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const updateCapster = async (id: any, form: any, callback: any) => {
    await axiosInterceptor.put(`/capster/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


export const deleteCategory = (id: any, callback: any) => {
    axiosInterceptor.delete(`/category/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}


// PAYMENTS
export const createPayment = async (form: any, callback: any) => {
    await axiosInterceptor.post('/payment-method', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const getAllPayments = async () => {
    try {
        const res = await axiosInterceptor.get('/payment-method/list');
        return res.data; // ✅ return data
    } catch (err) {
        console.error(err);
        return []; // atau null, tergantung kebutuhan
    }
};

export const updatePayment = async (id: any, form: any) => {
    try {
        const response = await axiosInterceptor.put(`/payment-method/${id}`, form);
        return response.data;

    } catch (err) {
        console.log(err);
        throw err; // penting agar bisa ditangkap di catch()
    }
};

export const deletePayment = async (id: any) => {
    try {
        const result = await axiosInterceptor.delete(`/payment-method/${id}`)
        return result.data; // ✅ return data langsung
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// SERVICE
export const createService = async (form: any, callback: any) => {
    await axiosInterceptor.post('/service', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            console.log(err);
        });
}

export const getAllService = async () => {
    try {
        const res = await axiosInterceptor.get('/service');
        return res.data; // ✅ return data
    } catch (err) {
        console.error(err);
        return []; // atau null, tergantung kebutuhan
    }
};
