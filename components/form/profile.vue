<script setup lang="ts">
import Swal from "sweetalert2";

const name = ref("");
const hp = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const isSubmitting = ref(false);
const isLoadingProfile = ref(true);

const store = useUserStore();
const image = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Form validation
const errors = ref({
  name: "",
  hp: "",
  email: "",
  password: "",
  confirmPassword: "",
  image: "",
});

// Password visibility toggle
const showPassword = ref(false);
const showConfirmPassword = ref(false);

function validateForm() {
  // Reset errors
  Object.keys(errors.value).forEach(key => {
    errors.value[key as keyof typeof errors.value] = "";
  });

  let isValid = true;

  if (!name.value.trim()) {
    errors.value.name = "Nama lengkap harus diisi";
    isValid = false;
  }

  if (!hp.value.trim()) {
    errors.value.hp = "Nomor telepon harus diisi";
    isValid = false;
  } else if (!/^[0-9+\-\s()]+$/.test(hp.value)) {
    errors.value.hp = "Format nomor telepon tidak valid";
    isValid = false;
  }

  if (!email.value.trim()) {
    errors.value.email = "Email harus diisi";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = "Format email tidak valid";
    isValid = false;
  }

  if (password.value && password.value.length < 6) {
    errors.value.password = "Password minimal 6 karakter";
    isValid = false;
  }

  if (password.value && password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Konfirmasi password tidak cocok";
    isValid = false;
  }

  return isValid;
}

function triggerFileInput() {
  fileInput.value?.click();
}

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      errors.value.image = "File harus berupa gambar";
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      errors.value.image = "Ukuran file maksimal 5MB";
      return;
    }
    
    errors.value.image = "";
    image.value = file;
    previewUrl.value = URL.createObjectURL(file);
  }
}

function removeImage() {
  image.value = null;
  previewUrl.value = null;
  errors.value.image = "";
  if (fileInput.value) {
    fileInput.value.value = '';
  }
}

async function editProfile() {
  if (!validateForm()) {
    return;
  }

  try {
    isSubmitting.value = true;
    
    const response = await store.patchprofile(
      name.value.trim(),
      hp.value.trim(),
      email.value.trim(),
      password.value || "",
      image.value
    ) as any;
    
    console.log("Profile update response: ", response);

    // Check if response is successful - handle different response formats
    const isSuccess = response && (
      response.success === true || 
      response.status === 'success' ||
      response.message === 'success' ||
      (response.code && response.code === 200)
    );

    await Swal.fire({
      icon: isSuccess ? "success" : "error",
      title: isSuccess ? "Profil Berhasil Diperbarui!" : "Gagal Memperbarui Profil",
      text: isSuccess 
        ? "Profil Anda telah berhasil diperbarui" 
        : response?.message || "Terjadi kesalahan saat memperbarui profil. Silahkan coba lagi.",
      timer: 3000,
      showConfirmButton: true,
      confirmButtonColor: "#C95792",
      timerProgressBar: true,
    });

    if (isSuccess) {
      // Clear password fields after successful update
      password.value = "";
      confirmPassword.value = "";
      
      // Reset validation errors
      Object.keys(errors.value).forEach(key => {
        errors.value[key as keyof typeof errors.value] = "";
      });
    }
  } catch (error) {
    console.error("Profile update error:", error);
    await Swal.fire({
      icon: "error",
      title: "Terjadi Kesalahan",
      text: "Silahkan coba lagi atau hubungi admin",
      confirmButtonColor: "#C95792",
    });
  } finally {
    isSubmitting.value = false;
  }
}

async function profile() {
  try {
    isLoadingProfile.value = true;
    const response = await store.profile();
    console.log("Profile data = ", response);
    
    if (response) {
      name.value = (response as any).results.fullname || "";
      hp.value = (response as any).results.phone_number || "";
      email.value = (response as any).results.email || "";
      
      // Load existing profile picture if available
      const existingPicture = (response as any).results.picture;
      if (existingPicture) {
        // Set preview URL for existing picture
        previewUrl.value = `${useRuntimeConfig().public.apiUrl}/profile/image/${existingPicture}`;
      }
    } else {
      console.error("Failed to retrieve profile");
      await Swal.fire({
        icon: "warning",
        title: "Gagal Memuat Profil",
        text: "Silahkan refresh halaman atau login ulang",
        confirmButtonColor: "#C95792",
      });
    }
  } catch (error) {
    console.error("Error loading profile:", error);
  } finally {
    isLoadingProfile.value = false;
  }
}

watch(image, (newImage) => {
  if (newImage) {
    previewUrl.value = URL.createObjectURL(newImage);
    console.log("Image updated:", previewUrl.value);
  }
});

onMounted(() => {
  profile();
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-6 sm:py-8 lg:py-12">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      
      <!-- Loading State -->
      <div v-if="isLoadingProfile" class="flex items-center justify-center py-20">
        <div class="flex items-center gap-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C95792]"></div>
          <span class="text-gray-600">Memuat profil...</span>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else>
        <!-- Header Section -->
        <div class="text-center mb-8 lg:mb-12">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-4">
            Halo, {{ name || 'User' }}! 👋
          </h1>
          <p class="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
            Kelola informasi profil Anda dengan mudah dan aman
          </p>
        </div>

        <!-- Profile Form Card -->
        <div class="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <!-- Card Header -->
          <div class="bg-gradient-to-r from-[#C95792] to-[#A64A7A] px-6 sm:px-8 py-6 sm:py-8">
            <h2 class="text-xl sm:text-2xl font-bold text-white text-center">
              Edit Profil
            </h2>
            <p class="text-white/90 text-center mt-2 text-sm sm:text-base">
              Perbarui informasi personal Anda
            </p>
          </div>

          <!-- Form Content -->
          <div class="p-6 sm:p-8 lg:p-10">
            <form @submit.prevent="editProfile" class="space-y-8">
              
              <!-- Profile Picture Section -->
              <div class="text-center">
                <label class="block text-sm font-semibold text-gray-700 mb-4">
                  Foto Profil
                </label>
                
                <!-- Image Upload Area -->
                <div class="relative inline-block">
                  <div
                    class="relative group border-2 border-dashed border-gray-300 hover:border-[#C95792] rounded-2xl w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-300 bg-gray-50 hover:bg-[#C95792]/5 touch-feedback"
                    @click="triggerFileInput"
                  >
                    <!-- Default Avatar Icon -->
                    <div v-if="!previewUrl" class="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 32 32"
                        class="text-gray-400 group-hover:text-[#C95792] transition-colors mx-auto mb-2"
                      >
                        <path
                          fill="currentColor"
                          d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
                        />
                        <path
                          fill="currentColor"
                          d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.9 11.9 0 0 1-12 0m13.993-1.451A5 5 0 0 0 19 20h-6a5 5 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                        />
                      </svg>
                      <p class="text-xs text-gray-500 group-hover:text-[#C95792] transition-colors">
                        Klik untuk upload
                      </p>
                    </div>

                    <!-- Preview Image -->
                    <img
                      v-if="previewUrl"
                      :src="previewUrl"
                      alt="Profile Preview"
                      class="w-full h-full object-cover rounded-2xl"
                    />

                    <!-- Overlay -->
                    <div
                      class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M20 4h-3.17l-1.24-1.35A2 2 0 0 0 14.12 2H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5" />
                      </svg>
                    </div>
                  </div>

                  <!-- Remove Image Button -->
                  <button
                    v-if="previewUrl"
                    type="button"
                    @click.stop="removeImage"
                    class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors touch-feedback"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>

                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="handleImageUpload"
                  />
                </div>

                <p class="text-xs text-gray-500 mt-3">
                  Format: JPG, PNG, GIF (Max: 1MB)
                </p>
                <p v-if="errors.image" class="text-red-500 text-sm font-medium mt-2">
                  {{ errors.image }}
                </p>
              </div>

              <!-- Form Fields Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                <!-- Full Name Field -->
                <div class="space-y-2">
                  <label for="name" class="block text-sm font-semibold text-gray-700">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    v-model="name"
                    id="name"
                    placeholder="Masukan nama lengkap"
                    :class="[
                      'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                      errors.name 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                    ]"
                    :style="{ fontSize: '16px' }"
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm font-medium">
                    {{ errors.name }}
                  </p>
                </div>

                <!-- Phone Number Field -->
                <div class="space-y-2">
                  <label for="hp" class="block text-sm font-semibold text-gray-700">
                    Nomor Telepon <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    v-model="hp"
                    id="hp"
                    placeholder="Contoh: 081234567890"
                    :class="[
                      'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                      errors.hp 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                    ]"
                    :style="{ fontSize: '16px' }"
                  />
                  <p v-if="errors.hp" class="text-red-500 text-sm font-medium">
                    {{ errors.hp }}
                  </p>
                </div>

                <!-- Email Field -->
                <div class="space-y-2 lg:col-span-2">
                  <label for="email" class="block text-sm font-semibold text-gray-700">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    v-model="email"
                    id="email"
                    placeholder="Contoh: user@email.com"
                    :class="[
                      'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                    ]"
                    :style="{ fontSize: '16px' }"
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm font-medium">
                    {{ errors.email }}
                  </p>
                </div>

                <!-- Password Field -->
                <div class="space-y-2">
                  <label for="password" class="block text-sm font-semibold text-gray-700">
                    Password Baru
                  </label>
                  <div class="relative">
                    <input
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      id="password"
                      placeholder="Kosongkan jika tidak ingin mengubah"
                      :class="[
                        'w-full px-4 py-3 sm:py-4 pr-12 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                        errors.password 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                      ]"
                      :style="{ fontSize: '16px' }"
                    />
                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.password" class="text-red-500 text-sm font-medium">
                    {{ errors.password }}
                  </p>
                </div>

                <!-- Confirm Password Field -->
                <div class="space-y-2" v-if="password">
                  <label for="confirmPassword" class="block text-sm font-semibold text-gray-700">
                    Konfirmasi Password <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      :type="showConfirmPassword ? 'text' : 'password'"
                      v-model="confirmPassword"
                      id="confirmPassword"
                      placeholder="Ulangi password baru"
                      :class="[
                        'w-full px-4 py-3 sm:py-4 pr-12 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                        errors.confirmPassword 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                      ]"
                      :style="{ fontSize: '16px' }"
                    />
                    <button
                      type="button"
                      @click="showConfirmPassword = !showConfirmPassword"
                      class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg v-if="showConfirmPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                      <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                  <p v-if="errors.confirmPassword" class="text-red-500 text-sm font-medium">
                    {{ errors.confirmPassword }}
                  </p>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-6">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full bg-gradient-to-r from-[#C95792] to-[#A64A7A] hover:from-[#A64A7A] hover:to-[#8B3A6B] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl touch-feedback text-sm sm:text-base"
                >
                  <span v-if="!isSubmitting" class="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17,21 17,13 7,13 7,21"></polyline>
                      <polyline points="7,3 7,8 15,8"></polyline>
                    </svg>
                    Simpan Perubahan
                  </span>
                  <span v-else class="flex items-center justify-center gap-2">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </span>
                </button>
              </div>

              <!-- Info Text -->
              <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-6">
                <div class="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-yellow-600 mt-0.5 flex-shrink-0">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <div class="text-sm text-yellow-800">
                    <p class="font-semibold mb-1">Perhatian:</p>
                    <ul class="space-y-1 text-xs sm:text-sm">
                      <li>• Pastikan data yang dimasukkan sudah benar</li>
                      <li>• Password baru akan menggantikan password lama</li>
                    </ul>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Touch feedback effect */
.touch-feedback {
  position: relative;
  overflow: hidden;
}

.touch-feedback::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.touch-feedback:active::before {
  opacity: 0.05;
}

/* Custom focus styles */
input:focus,
textarea:focus,
select:focus {
  outline: none;
  ring: 2px;
  ring-opacity: 20;
}

/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Safe area support for mobile */
@media (max-width: 640px) {
  .container {
    padding-left: env(safe-area-inset-left, 1rem);
    padding-right: env(safe-area-inset-right, 1rem);
    padding-bottom: env(safe-area-inset-bottom, 1.5rem);
  }
}

/* Better file input styling */
input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Profile image transitions */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Password toggle button */
button[type="button"]:focus {
  outline: 2px solid rgba(201, 87, 146, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
