<template>
  <footer class="w-full bg-gradient-to-r from-[#C95792] to-[#A64A7A] text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-8 lg:py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        <!-- Left Section: Logo, Map & Address -->
        <div class="space-y-6">
          <!-- Logo -->
          <div class="flex justify-center lg:justify-start">
            <img 
              src="@/assets/Logogsu.png" 
              alt="Logo Griya Sehat Ummi" 
              class="w-16 h-16 sm:w-20 sm:h-20"
            />
          </div>

          <!-- Address & Map Container -->
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- Address Info -->
            <div class="text-center lg:text-left">
              <h3 class="text-lg sm:text-xl font-bold mb-3 flex items-center justify-center lg:justify-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Alamat Klinik
              </h3>
              <address class="not-italic text-sm sm:text-base leading-relaxed text-white/90">
                Jl. Alam Raya 2 No.5 blok D1<br>
                RT.001/RW.009, Jatimelati<br>
                Kec. Pd. Melati, Kota Bekasi<br>
                Jawa Barat 17415
              </address>
              
              <!-- Contact Info -->
              <div class="mt-4 space-y-2">
                <div class="flex items-center justify-center lg:justify-start gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+62 813-3077-0221</span>
                </div>
                
                <div class="flex items-center justify-center lg:justify-start gap-2 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                  <span>Buka 24 Jam</span>
                </div>
              </div>
            </div>

            <!-- Interactive Map -->
            <div class="order-first xl:order-last">
              <div class="relative rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps?q=-6.200000,106.8166667&z=15&output=embed"
                  class="w-full h-48 sm:h-56 lg:h-64"
                  style="border: 0"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Lokasi Griya Sehat Ummi"
                ></iframe>
                <div class="absolute inset-0 bg-black/20 hover:bg-transparent transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <span class="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Lihat di Google Maps
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Social Media & Quick Links -->
        <div class="space-y-6">
          <div class="text-center lg:text-left">
            <h3 class="text-lg sm:text-xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-2">
              
              Ikuti Kami
            </h3>
            
            <!-- Social Media Links -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              <NuxtLink 
                to="https://www.instagram.com/griyasehatummi"
                class="group flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                external
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  class="text-white group-hover:text-pink-200 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M128 23.064c34.177 0 38.225.13 51.722.745c12.48.57 19.258 2.655 23.769 4.408c5.974 2.322 10.238 5.096 14.717 9.575s7.253 8.743 9.575 14.717c1.753 4.511 3.838 11.289 4.408 23.768c.615 13.498.745 17.546.745 51.723s-.13 38.226-.745 51.723c-.57 12.48-2.655 19.257-4.408 23.768c-2.322 5.974-5.096 10.239-9.575 14.718s-8.743 7.253-14.717 9.574c-4.511 1.753-11.289 3.839-23.769 4.408c-13.495.616-17.543.746-51.722.746s-38.228-.13-51.723-.746c-12.48-.57-19.257-2.655-23.768-4.408c-5.974-2.321-10.239-5.095-14.718-9.574c-4.479-4.48-7.253-8.744-9.574-14.718c-1.753-4.51-3.839-11.288-4.408-23.768c-.616-13.497-.746-17.545-.746-51.723s.13-38.225.746-51.722c.57-12.48 2.655-19.258 4.408-23.769c2.321-5.974 5.095-10.238 9.574-14.717c4.48-4.48 8.744-7.253 14.718-9.575c4.51-1.753 11.288-3.838 23.768-4.408c13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95c-8.418 3.271-15.556 7.648-22.672 14.764S9.991 35.738 6.72 44.155C3.555 52.297 1.392 61.602.77 75.226C.147 88.878 0 93.237 0 128s.147 39.122.77 52.774c.622 13.625 2.785 22.93 5.95 31.071c3.27 8.417 7.647 15.556 14.763 22.672s14.254 11.492 22.672 14.763c8.142 3.165 17.446 5.328 31.07 5.95c13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95c8.418-3.27 15.556-7.647 22.672-14.763s11.493-14.254 14.764-22.672c3.164-8.142 5.328-17.446 5.95-31.07c.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07c-3.271-8.418-7.648-15.556-14.764-22.672S220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0m0 62.27c-36.302 0-65.73 29.43-65.73 65.73s29.428 65.73 65.73 65.73c36.301 0 65.73-29.428 65.73-65.73c0-36.301-29.429-65.73-65.73-65.73m0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667s-19.103 42.667-42.667 42.667m83.686-110.994c0 8.484-6.876 15.36-15.36 15.36s-15.36-6.876-15.36-15.36s6.877-15.36 15.36-15.36s15.36 6.877 15.36 15.36"
                  />
                </svg>
                <span class="text-xs sm:text-sm font-medium">Instagram</span>
              </NuxtLink>

              <NuxtLink 
                to="https://www.tiktok.com/@echiighna"
                class="group flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                external
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 290"
                  class="text-white group-hover:text-pink-200 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"
                  />
                </svg>
                <span class="text-xs sm:text-sm font-medium">TikTok</span>
              </NuxtLink>

              <NuxtLink 
                to="https://wa.me/6281330770221"
                class="group flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                external
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 258"
                  class="text-white group-hover:text-green-200 transition-colors"
                >
                  <defs>
                    <linearGradient
                      id="logosWhatsappIcon0"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#1FAF38" />
                      <stop offset="100%" stop-color="#60D669" />
                    </linearGradient>
                    <linearGradient
                      id="logosWhatsappIcon1"
                      x1="50%"
                      x2="50%"
                      y1="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stop-color="#F9F9F9" />
                      <stop offset="100%" stop-color="#FFF" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#logosWhatsappIcon0)"
                    d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
                  />
                  <path
                    fill="url(#logosWhatsappIcon1)"
                    d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
                  />
                  <path
                    fill="#FFF"
                    d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
                  />
                </svg>
                <span class="text-xs sm:text-sm font-medium">WhatsApp</span>
              </NuxtLink>

              <NuxtLink 
                to="https://www.facebook.com/griyasehatummi"
                class="group flex flex-col items-center gap-2 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                external
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  class="text-white group-hover:text-blue-200 transition-colors"
                >
                  <path
                    fill="currentColor"
                    d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  />
                </svg>
                <span class="text-xs sm:text-sm font-medium">Facebook</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Quick Links / Services -->
          <div class="text-center lg:text-left">
            <h3 class="text-lg sm:text-xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l3-3V8l-3 3z"></path>
                <path d="M22 9v6c0 1.1-.9 2-2 2h-4l-3-3V8l3 3h4c1.1 0 2-.9 2-2z"></path>
              </svg>
              Layanan Kami
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div class="flex items-center justify-center lg:justify-start gap-2 p-2 bg-white/5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
                  <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
                </svg>
                <span>Layanan dan Konsultasi Bidan</span>
              </div>
              <div class="flex items-center justify-center lg:justify-start gap-2 p-2 bg-white/5 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
                <span>Layanan 24 Jam</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Copyright -->
      <div class="mt-8 pt-6 border-t border-white/20">
        <div class="text-center">
          <p class="text-sm sm:text-base text-white/90">
            &copy; {{ new Date().getFullYear() }} Praktek Bidan Istiadah - Griya Sehat Ummi. 
            <span class="block sm:inline">All rights reserved.</span>
          </p>
          <p class="text-xs text-white/70 mt-2">
            Layanan kesehatan terpercaya untuk keluarga Indonesia
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Map hover effects */
.map-container:hover iframe {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

/* Social media link animations */
.social-link {
  transition: all 0.3s ease;
}

.social-link:hover {
  transform: translateY(-2px);
}

/* Responsive map sizing */
@media (max-width: 640px) {
  iframe {
    height: 200px;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  iframe {
    height: 240px;
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Link focus states for accessibility */
a:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Gradient animation for background */
footer {
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
