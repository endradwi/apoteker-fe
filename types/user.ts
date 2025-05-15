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
