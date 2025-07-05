<script setup lang="ts">
definePageMeta({
  layout: "admin",
  name: "AdminPage",
});
useSeoMeta({
  title: "Admin Dashboard - Griya Sehat Ummi",
});

const store = useUserStore();
const totalUser = ref(0);
const totalPendaftaran = ref(0);
const isLoading = ref(true);

async function getAllUser() {
  try {
    isLoading.value = true;
    const responsePageAllUser = (await store.allUser()) as any;
    totalUser.value = responsePageAllUser.page_info.total_data;
    
    const responsePageReverse = (await store.getAllReserve()) as any;
    totalPendaftaran.value = responsePageReverse.page_info.total_data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getAllUser();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      
      <!-- Header Section -->
      <div class="mb-8 lg:mb-12">
        <!-- Mobile menu spacing -->
        <div class="lg:hidden h-16"></div>
        
        <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-2">
          Dashboard Admin
        </h1>
        <p class="text-sm sm:text-base text-gray-600">
          Selamat datang di panel administrasi Griya Sehat Ummi
        </p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
        
        <!-- Users Statistics Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div class="p-6 sm:p-8">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-blue-100 rounded-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2"
                      class="text-blue-600"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg sm:text-xl font-bold text-gray-800">Total Users</h2>
                    <p class="text-sm text-gray-500">Akun terdaftar</p>
                  </div>
                </div>
                
                <div class="flex items-end gap-4">
                  <div v-if="isLoading" class="animate-pulse">
                    <div class="h-12 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div v-else class="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600">
                    {{ totalUser.toLocaleString() }}
                  </div>
                  <div class="mb-2">
                    <span class="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                      Aktif
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="hidden sm:block">
                <img 
                  src="@/assets/Logogsu.png" 
                  alt="Logo" 
                  class="w-16 h-16 lg:w-20 lg:h-20 opacity-20"
                />
              </div>
            </div>
          </div>
          
          <!-- Action Footer -->
          <div class="bg-blue-50 px-6 sm:px-8 py-4">
            <NuxtLink 
              to="/admin/user"
              class="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <span>Kelola Users</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Patient Registration Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <div class="p-6 sm:p-8">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-4">
                  <div class="p-3 bg-green-100 rounded-lg">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2"
                      class="text-green-600"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-lg sm:text-xl font-bold text-gray-800">Pendaftaran</h2>
                    <p class="text-sm text-gray-500">Pasien terdaftar</p>
                  </div>
                </div>
                
                <div class="flex items-end gap-4">
                  <div v-if="isLoading" class="animate-pulse">
                    <div class="h-12 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div v-else class="text-3xl sm:text-4xl lg:text-5xl font-black text-green-600">
                    {{ totalPendaftaran.toLocaleString() }}
                  </div>
                  <div class="mb-2">
                    <span class="text-xs sm:text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                      Total
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="hidden sm:block">
                <img 
                  src="@/assets/Logogsu.png" 
                  alt="Logo" 
                  class="w-16 h-16 lg:w-20 lg:h-20 opacity-20"
                />
              </div>
            </div>
          </div>
          
          <!-- Action Footer -->
          <div class="bg-green-50 px-6 sm:px-8 py-4">
            <NuxtLink 
              to="/admin/pasien"
              class="text-green-600 hover:text-green-800 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <span>Kelola Pasien</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </NuxtLink>
          </div>
        </div>

      </div>

      <!-- Quick Actions Section -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
        <h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          Aksi Cepat
        </h3>
        
        <div class="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <NuxtLink 
            to="/admin/user"
            class="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Kelola Users</h4>
                <p class="text-sm text-gray-500">Tambah & edit users</p>
              </div>
            </div>
          </NuxtLink>

          <NuxtLink 
            to="/admin/pasien"
            class="p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-green-600">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">Data Pasien</h4>
                <p class="text-sm text-gray-500">Lihat pendaftaran</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- System Status -->
      <div class="mt-8 bg-gradient-to-r from-[#C95792] to-[#A64A7A] text-white rounded-2xl p-6 sm:p-8">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg sm:text-xl font-bold mb-2">Status Sistem</h3>
            <p class="text-white/80 text-sm sm:text-base">Semua layanan berjalan normal</p>
          </div>
          <div class="hidden sm:flex items-center gap-2">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span class="text-sm font-medium">Online</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive font adjustments */
@media (max-width: 640px) {
  .text-responsive {
    font-size: 14px;
  }
}

/* Custom hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Loading skeleton */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
