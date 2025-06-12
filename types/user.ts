export type UserSession = {
    id: number;
    full_name: string;
    dob: string | Date
    email: string;
    role_id: number;
    cp_is_done: number;
    picture: string;
    role: number;
    created_at: string | Date;
    updated_at: string | Date;
};

export type reserveResponse = {
    success: boolean;
    message: string;
    results: {
        id: number;
        fullname: string;
        phone_number: string;
        age: string;
        date: string | Date;
        doctor: string;
        complaint: string;
    }[];
}

export type createAdmin = {
    fullname: string;
    email: string;
    password: string;
    phone_number: string;
    role_id: number;
}