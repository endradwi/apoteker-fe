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
        const { get } = useHttp(); // asumsi pakai GET, bisa juga POST jika backend-nya seperti itu
  
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
  },
});
