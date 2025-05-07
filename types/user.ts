import type { CartModule } from "~/types/module"

export type SaveLearningPath = {
    session_id: string;
    module_learning_path: Array<ModulePath>
}

export type ModulePath = {
    id: number;
}

export type UserSession = {
    id: number;
    full_name: string;
    dob: string | Date
    email: string;
    provider: string;
    role_id: number;
    cp_is_done: number;
    picture: string;
    role: {
        id: number;
        name: string;
    }[];
    account_active: "student" | "creator" | "admin";
    created_at: string | Date;
    updated_at: string | Date;
};

export interface CartUser {
    total_item: number;
    cart_id: number;
    modules: Array<CartModule> | [];
    cart_total: {
        total_price: number;
        sub_total: number;
        discount: number;
        tax: number;
    };
}