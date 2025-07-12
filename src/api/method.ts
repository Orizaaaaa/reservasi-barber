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

export const updateBuilding = (id: any, form: any, callback: any) => {
    axiosInterceptor.put(`/infrastucture/${id}`, form)
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
