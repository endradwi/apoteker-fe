<script setup lang="ts">
definePageMeta({
  layout: false,
  name: "RegisterPage",
});
useSeoMeta({
  title: "Register Page",
});

import { ref } from "vue";
import Swal from "sweetalert2";

const email = ref("");
const password = ref("");
const router = useRouter();
const eye = ref(false);
const responseSuccess = ref("");
const responseError = ref("");
const togglePasswordVisibility = () => {
  eye.value = !eye.value;
};

const store = useUserStore();

const onClick = async () => {
  const response = await store.register(email.value, password.value);
  console.log("Registration successful = ", response);
  if ((response as any).success !== false) {
    responseSuccess.value = (response as any).message;
    console.log("Registration response: ", responseSuccess.value);
    Swal.fire({
      icon: "success",
      title: responseSuccess.value,
      text: "You have successfully registered!",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      router.push("/login");
    });
  } else {
    console.error("Registration failed", response);
    responseError.value = (response as any).message;
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: responseError.value,
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  }
};
</script>
<template>
  <div class="min-h-screen w-full flex flex-col lg:flex-row">
    <!-- Image Section (Hidden on Mobile, First on Desktop) -->
    <div class="hidden lg:flex lg:flex-1 relative overflow-hidden">
      <img
        src="@/assets/regisDoc.png"
        alt="Register Doctor"
        class="w-full h-full object-cover"
      />
      
      <!-- Overlay with info -->
      <!-- <div class="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent flex items-end p-8"> -->
        <div class="text-white">
          <h2 class="text-2xl xl:text-3xl font-bold mb-2">
            Bergabunglah Dengan Kami
          </h2>
          <p class="text-lg xl:text-xl opacity-90">
            Daftar untuk mengakses layanan kesehatan terpadu
          </p>
        </div>
      </div>
    <!-- </div> -->

    <!-- Main Content Section -->
    <div class="flex-1 bg-gradient-to-bl from-[#C95792] to-[#A64A7A] lg:rounded-l-[100px] xl:rounded-l-[200px] shadow-2xl">
      <div class="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
        <!-- Logo -->
        <div class="mb-6 lg:mb-8">
          <img
            src="@/assets/Logogsu.png"
            alt="Logo Perusahaan"
            class="w-16 h-16 sm:w-20 sm:h-20 mx-auto"
          />
        </div>

        <!-- Register Form Card -->
        <div class="bg-white w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <h1 class="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 lg:mb-8">
            Daftar Akun
          </h1>
          
          <form @submit.prevent="onClick" class="space-y-5 lg:space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Masukkan email valid Anda"
                v-model="email"
                required
                autocomplete="email"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3D365C] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
              />
              <p class="text-xs text-gray-500">
                Email akan digunakan untuk login dan verifikasi akun
              </p>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <input
                  id="password"
                  :type="eye ? 'text' : 'password'"
                  placeholder="Buat password yang kuat"
                  v-model="password"
                  required
                  autocomplete="new-password"
                  minlength="6"
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
              <div class="text-xs text-gray-500 space-y-1">
                <p>Password harus mengandung minimal:</p>
                <ul class="list-disc list-inside space-y-0.5 ml-2">
                  <li>6 karakter atau lebih</li>
                  <li>1 huruf besar atau 1 angka</li>
                </ul>
              </div>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start space-x-3">
              <input
                id="terms"
                type="checkbox"
                required
                class="mt-1 h-4 w-4 text-[#3D365C] focus:ring-[#3D365C] border-gray-300 rounded"
              />
              <label for="terms" class="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Saya menyetujui 
                <a href="#" class="text-[#3D365C] hover:text-[#2d2548] underline">
                  Syarat dan Ketentuan
                </a> 
                serta 
                <a href="#" class="text-[#3D365C] hover:text-[#2d2548] underline">
                  Kebijakan Privasi
                </a> 
                yang berlaku
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full bg-[#3D365C] text-white py-3 px-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[#2d2548] focus:outline-none focus:ring-2 focus:ring-[#3D365C] focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
            >
              Daftar Sekarang
            </button>
          </form>

          <!-- Login Link -->
          <p class="text-center text-sm sm:text-base text-gray-600 mt-6 lg:mt-8">
            Sudah punya akun?
            <NuxtLink 
              to="/login" 
              class="text-[#3D365C] font-semibold hover:text-[#2d2548] underline underline-offset-2 hover:underline-offset-4 transition-all duration-300"
            >
              Masuk di sini
            </NuxtLink>
          </p>

          <!-- Social Proof -->
          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="flex items-center justify-center space-x-2 text-xs sm:text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4"></path>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path>
                <path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"></path>
              </svg>
              <span>Data Anda aman dan terlindungi</span>
            </div>
          </div>
        </div>

        <!-- Additional Info for Mobile -->
        <div class="mt-6 text-center text-white/90 lg:hidden">
          <p class="text-xs sm:text-sm max-w-sm mx-auto">
            Daftar untuk mengakses layanan kesehatan terpadu dan manajemen farmasi
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom focus styles for better accessibility */
input:focus, input[type="checkbox"]:focus {
  box-shadow: 0 0 0 3px rgba(61, 54, 92, 0.1);
}

/* Custom button hover effects */
button[type="submit"]:hover {
  box-shadow: 0 10px 25px rgba(61, 54, 92, 0.3);
}

/* Custom checkbox styling */
input[type="checkbox"]:checked {
  background-color: #3D365C;
  border-color: #3D365C;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .text-responsive {
    font-size: 14px;
  }
}

/* Link hover effects */
a:hover {
  text-decoration-thickness: 2px;
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

/* Form validation states */
input:invalid:not(:focus):not(:placeholder-shown) {
  border-color: #ef4444;
}

input:valid:not(:focus):not(:placeholder-shown) {
  border-color: #10b981;
}

/* Loading state for submit button */
button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}
</style>
