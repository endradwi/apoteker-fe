import { defineStore } from 'pinia';
import useHttp from '@/composables/useHttp';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,
  }),
  actions: {
    async register(email: string, password: string) {
      const { post } = useHttp();
      try {
        const data = await post('auth/register', {
            email,
            password,
        },
        {credentials: 'include'}
      );

        return data;
        
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    },
    async login(email: string, password: string) {
        const { post } = useHttp();
        try {
          const data = await post('auth/login', {
              email,
              password,
          }, {
            credetials: 'include',
          });
  this.user = data; // simpan ke state jika perlu 
          return data;
          
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      },
      async profile() {
        const { get } = useHttp(); 
  
        try {
          const data = await get('users', {
            credentials: 'include',
          });
  
          this.user = data; // simpan ke state jika perlu
          return data;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
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
          const data = await patch('users', formData, {
            credentials: 'include',
            // ❌ Jangan set Content-Type secara manual! Biarkan browser handle.
          });
      
          this.user = data;
          return data;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
          return null;
        }
      },
      async reserve(fullname: string, phone_number: string, age: string, date: any, doctor: string, complaint: string) {
        const { post } = useHttp();
        try {
          const data = await post('reserve', {
              fullname,
              phone_number,
              age,
              date,
              doctor,
              complaint,
          }, {
            credetials: 'include',
          });
  this.user = data; // simpan ke state jika perlu 
          return data;
          
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      },
      async allUser() {
        const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu
  
        try {
          const data = await get('users/all', {
            credentials: 'include',
          });
  
          this.user = data; // simpan ke state jika perlu
          return data;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
          return null;
        }
      },
      async updateStatus(
        id: number,
        role: number
      ) {
        const { patch } = useHttp();
        const formData = new FormData();
      
        formData.append("role_id", role.toString());
      
        try {
          const data = await patch(`users/${id}`, formData, {
            credentials: 'include',
            // ❌ Jangan set Content-Type secara manual! Biarkan browser handle.
          });
      
          this.user = data;
          return data;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
          return null;
        }
      },
      async getHistory() {
        const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu
  
        try {
          const data = await get('reserve/all/reserve/users', {
            credentials: 'include',
          });
  
          this.user = data; // simpan ke state jika perlu
          return data;
        } catch (error) {
          console.error('❌ Failed to fetch profile:', error);
          return null;
        }
      },      
  },
});
