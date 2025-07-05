// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
      ignore: ["/"]
   }
  },
  vite: {
    optimizeDeps: {
      include: ['jspdf'],
    },
  },
  // jika error tetap muncul di produksi
  build: {
    transpile: ['jspdf'],
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:8889",
      cookieDomain: process.env.COOKIE_DOMAIN ?? "-",
    }
  }, 
  
  // Mobile Optimizations
  app: {
    head: {
      meta: [
        // Essential Mobile Meta Tags
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        
        // Performance & Rendering
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'theme-color', content: '#C95792' },
        { name: 'msapplication-TileColor', content: '#C95792' },
        { name: 'apple-mobile-web-app-title', content: 'Griya Sehat Ummi' },
        
        // SEO & Social
        { name: 'description', content: 'Sistem manajemen farmasi dan layanan kesehatan terpadu - Griya Sehat Ummi' },
        { name: 'keywords', content: 'farmasi, kesehatan, apoteker, bidan, klinik, medical, healthcare' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Griya Sehat Ummi - Layanan Kesehatan Terpadu' },
        { property: 'og:description', content: 'Sistem manajemen farmasi dan layanan kesehatan terpadu untuk keluarga Indonesia' },
        { property: 'og:image', content: '/favicon.ico' },
        
        // Security
        { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
        // Preconnect to external domains for better performance
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'dns-prefetch', href: 'https://www.google.com' },
      ],
      htmlAttrs: {
        lang: 'id',
        dir: 'ltr'
      }
    }
  },

  // CSS Configuration
  css: [
    '~/assets/css/mobile.css'
  ],

  // Tailwind CSS Configuration for Mobile
  tailwindcss: {
    config: {
      theme: {
        extend: {
          screens: {
            'xs': '475px',
            '3xl': '1600px',
          },
          spacing: {
            'safe-top': 'env(safe-area-inset-top)',
            'safe-bottom': 'env(safe-area-inset-bottom)',
            'safe-left': 'env(safe-area-inset-left)',
            'safe-right': 'env(safe-area-inset-right)',
          },
          fontFamily: {
            'sans': ['Poppins', 'system-ui', 'sans-serif'],
          },
          colors: {
            primary: {
              50: '#fdf2f8',
              100: '#fce7f3',
              200: '#fbcfe8',
              300: '#f9a8d4',
              400: '#f472b6',
              500: '#C95792',
              600: '#be185d',
              700: '#9d174d',
              800: '#831843',
              900: '#500724',
            }
          },
          animation: {
            'fade-in': 'fadeIn 0.3s ease-out',
            'slide-up': 'slideUp 0.3s ease-out',
            'scale-in': 'scaleIn 0.2s ease-out',
            'bounce-gentle': 'bounceGentle 2s infinite',
          },
          keyframes: {
            fadeIn: {
              '0%': { opacity: '0' },
              '100%': { opacity: '1' }
            },
            slideUp: {
              '0%': { 
                opacity: '0',
                transform: 'translateY(20px)'
              },
              '100%': { 
                opacity: '1',
                transform: 'translateY(0)'
              }
            },
            scaleIn: {
              '0%': { 
                opacity: '0',
                transform: 'scale(0.95)'
              },
              '100%': { 
                opacity: '1',
                transform: 'scale(1)'
              }
            },
            bounceGentle: {
              '0%, 100%': { 
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
              },
              '50%': { 
                transform: 'translateY(-5px)',
                animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
              }
            }
          }
        }
      }
    }
  },

  // Performance Optimizations
  experimental: {
    payloadExtraction: false,
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/icon', '@pinia/nuxt']
})