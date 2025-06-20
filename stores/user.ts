import { defineStore } from "pinia";
import useHttp from "@/composables/useHttp";
import type { createAdmin } from "~/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    token: null as any, // Simpan token jika perlu
  }),
  actions: {
    async register(email: string, password: string) {
      const { post } = useHttp();
      try {
        const data = await post("auth/register", {
          email,
          password,
        });

        return data;
      } catch (error: any) {
        const message = error?.data?.message;
        const success = error?.data?.success;
        return { success, message };
      }
    },
    async login(email: string, password: string) {
      const { post } = useHttp();
      try {
        const data = (await post("auth/login", { email, password })) as any;

        this.user = data;

        const token = data?.results?.token;
        const credentialsStore = useCredentialsStore();
        credentialsStore.setToken(token); // simpan token ke credentials store

        console.log("User token:", credentialsStore.token);

        console.log("User token after login:", token);
        console.log("User data after login:", this.user);
        return data;
      } catch (error: any) {
        const message = error?.data?.message;
        const success = error?.data?.success;
        return { success, message };
      }
    },
    async profile() {
      const { get } = useHttp();

      try {
        const data = await get("users");

        this.user = data; // simpan ke state jika perlu
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async patchprofile(
      fullname: string,
      phone_number: string,
      email: string,
      password: string,
      image?: File | null
    ) {
      const { patch } = useHttp();
      const formData = new FormData();

      formData.append("fullname", fullname);
      formData.append("phone_number", phone_number);
      formData.append("email", email);
      formData.append("password", password);

      if (image) {
        formData.append("image", image);
      }

      try {
        const data = await patch("users", formData, {
          // ❌ Jangan set Content-Type secara manual! Biarkan browser handle.
        });

        this.user = data;
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async reserve(
      fullname: string,
      phone_number: string,
      age: string,
      date: any,
      doctor: string,
      complaint: string
    ) {
      const { post } = useHttp();
      try {
        const data = await post(
          "reserve",
          {
            fullname,
            phone_number,
            age,
            date,
            doctor,
            complaint,
          },
      
        );
        this.user = data; // simpan ke state jika perlu
        return data;
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    },
    async allUser(page = 1) {
      const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu

      try {
        const data = await get("users/all", {
          query: { page },
        });

        this.user = data; // simpan ke state jika perlu
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async updateStatus(id: number, role: number) {
      const { patch } = useHttp();
      const formData = new FormData();

      formData.append("role_id", role.toString());

      try {
        const data = await patch(`users/${id}`, formData, {
          // ❌ Jangan set Content-Type secara manual! Biarkan browser handle.
        });

        this.user = data;
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async getHistory(page = 1) {
      const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu

      try {
        const data = await get("reserve/all/reserve/users",{
          query: {page}
        });

        this.user = data; // simpan ke state jika perlu
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async createAdmin(createAdmin: createAdmin) {
      const { post } = useHttp();
      try {
        const data = await post("users/admin", createAdmin);

        return data;
      } catch (error: any) {
        const message = error?.data?.message;
        const success = error?.data?.success;
        return { success, message };
      }
    },
    async getAllReserve(page = 1) {
      const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu

      try {
        const data = await get("reserve/all/reserve/admin",{
          query: { page },
        });

        this.user = data; // simpan ke state jika perlu
        return data;
      } catch (error) {
        console.error("❌ Failed to fetch profile:", error);
        return null;
      }
    },
    async deleteUser(id: number) {
      const { del } = useHttp(); // gunakan del untuk DELETE request

      try {
        const data = await del(`users/${id}`);

        return data; // bisa mengembalikan data atau status sukses
      } catch (error) {
        console.error("❌ Failed to delete user:", error);
        return null;
      }
    },
  },
});
