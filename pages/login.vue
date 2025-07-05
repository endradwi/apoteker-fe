<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "LoginPage",
});
useSeoMeta({
  title: "Login Page",
});
import Swal from "sweetalert2";
import { ref } from "vue";

const email = ref("");
const password = ref("");
const router = useRouter();

const store = useUserStore();
const eye = ref(false);
const togglePasswordVisibility = () => {
  eye.value = !eye.value;
};

const onClick = async () => {
  const response = await store.login(email.value, password.value);
  if ((response as any).success !== false) {
    if ((response as any).results.role_id === 1) {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda berhasil login sebagai Admin!",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.push("/admin");
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Berhasil",
        text: "Anda akan diarahkan ke halaman utama!",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      }).then(() => {
        router.push("/");
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: (response as any).message,
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
<template>
  <div class="min-h-screen w-full flex flex-col lg:flex-row">
    <!-- Main Content Section -->
    <div class="flex-1 bg-gradient-to-br from-[#C95792] to-[#A64A7A] lg:rounded-r-[100px] xl:rounded-r-[200px] shadow-2xl">
      <div class="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <!-- Logo -->
        <div class="mb-6 lg:mb-8">
          <img
            src="@/assets/Logogsu.png"
            alt="Logo Perusahaan"
            class="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
          />
        </div>

        <!-- Login Form Card -->
        <div class="bg-white w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <h1 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 lg:mb-8">
            Login
          </h1>
          
          <form @submit.prevent="onClick" class="space-y-5 lg:space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                v-model="email"
                required
                autocomplete="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D365C] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  :type="eye ? 'text' : 'password'"
                  placeholder="Masukkan password Anda"
                  v-model="password"
                  required
                  autocomplete="current-password"
                  class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D365C] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                />
                <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
                >
                  <!-- Eye Open Icon -->
                  <svg
                    v-if="eye"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  
                  <!-- Eye Closed Icon -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-[#3D365C] text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#2d2548] focus:outline-none focus:ring-2 focus:ring-[#3D365C] focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Masuk
            </button>
          </form>

          <!-- Register Link -->
          <p class="text-center text-sm sm:text-base text-gray-600 mt-6 lg:mt-8">
            Belum punya akun?
            <nuxt-link 
              to="/register" 
              class="text-[#3D365C] font-semibold hover:text-[#2d2548] underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
            >
              Daftar di sini
            </nuxt-link>
          </p>
        </div>

        <!-- Additional Info for Mobile -->
        <div class="mt-6 text-center text-white/90 lg:hidden">
          <p class="text-xs sm:text-sm max-w-sm mx-auto">
            Sistem manajemen farmasi dan layanan kesehatan terpadu
          </p>
        </div>
      </div>
    </div>

    <!-- Image Section (Hidden on Mobile) -->
    <div class="hidden lg:flex lg:flex-1 relative overflow-hidden">
      <img
        src="@/assets/loginDoc.png"
        alt="Login Doctor"
        class="w-full h-full object-cover transform scale-x-[-1]"
      />
    </div>
  </div>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
input:focus {
  box-shadow: 0 0 0 3px rgba(61, 54, 92, 0.1);
}

/* Custom button hover effects */
button[type="submit"]:hover {
  box-shadow: 0 10px 25px rgba(61, 54, 92, 0.3);
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .text-responsive {
    font-size: 14px;
  }
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
