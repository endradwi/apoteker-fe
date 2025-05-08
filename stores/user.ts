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
        });

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
  
          return data;
          
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      },
  },
});
