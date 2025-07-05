<script setup lang="ts">
import Swal from "sweetalert2";
import type { reserveResponse } from "~/types/user";

const name = ref("");
const phone_number = ref("");
const age = ref("");
const date = ref("");
const doctor = ref("");
const complaint = ref("");
const isSubmitting = ref(false);

const doctorList = ref([
  { id: 1, name: "Bidan istiadah S.Tr.Keb - Kepala Bidan" },
  { id: 2, name: "Dr. Femmy Dzulkarnaen, SpOG - Dokter Spesialis Kandungan" },
  { id: 3, name: "Sulistyowati S.Pd - Kepala Trapis" },
]);

const arrow = ref(false);
const doctorSelect = ref<HTMLSelectElement | null>(null);
const dateInput = ref<HTMLInputElement | null>(null);
const store = useUserStore();

// Form validation
const errors = ref({
  name: "",
  phone_number: "",
  age: "",
  date: "",
  doctor: "",
  complaint: "",
});

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

  if (!phone_number.value.trim()) {
    errors.value.phone_number = "Nomor telepon harus diisi";
    isValid = false;
  } else if (!/^[0-9+\-\s()]+$/.test(phone_number.value)) {
    errors.value.phone_number = "Format nomor telepon tidak valid";
    isValid = false;
  }

  if (!age.value.trim()) {
    errors.value.age = "Umur harus diisi";
    isValid = false;
  } else if (isNaN(Number(age.value)) || Number(age.value) < 1 || Number(age.value) > 120) {
    errors.value.age = "Umur harus berupa angka antara 1-120";
    isValid = false;
  }

  if (!date.value) {
    errors.value.date = "Tanggal periksa harus dipilih";
    isValid = false;
  } else {
    const selectedDate = new Date(date.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.value.date = "Tanggal periksa tidak boleh di masa lalu";
      isValid = false;
    }
  }

  if (!doctor.value) {
    errors.value.doctor = "Dokter harus dipilih";
    isValid = false;
  }

  if (!complaint.value.trim()) {
    errors.value.complaint = "Keluhan harus diisi";
    isValid = false;
  }

  return isValid;
}

function openDatePicker() {
  dateInput.value?.showPicker();
}

function toggleArrow() {
  arrow.value = !arrow.value;
  if (arrow.value) {
    doctorSelect.value?.focus();
  }
}

function selectDoctor(selectedDoctor: string) {
  doctor.value = selectedDoctor;
  arrow.value = false;
  errors.value.doctor = ""; // Clear error when doctor is selected
}

function formatDateToISOString(dateStr: string): string {
  const dateObj = new Date(dateStr);
  return dateObj.toISOString().split(".")[0] + "Z";
}

async function reserve() {
  if (!validateForm()) {
    return;
  }

  try {
    isSubmitting.value = true;
    
    const data = {
      name: name.value.trim(),
      phone_number: phone_number.value.trim(),
      age: age.value.trim(),
      date: formatDateToISOString(date.value),
      doctor: doctor.value,
      complaint: complaint.value.trim(),
    };
    
    const response = (await store.reserve(
      data.name,
      data.phone_number,
      data.age,
      data.date,
      data.doctor,
      data.complaint
    )) as reserveResponse;
    
    console.log("Reservation response: ", response);
    
    await Swal.fire({
      icon: response?.success ? "success" : "error",
      title: response?.success ? "Pendaftaran Berhasil!" : "Pendaftaran Gagal",
      text: response?.success 
        ? "Pendaftaran berhasil! Silahkan datang sesuai tanggal yang telah dipilih" 
        : "Terjadi kesalahan saat mendaftar. Silahkan coba lagi.",
      timer: 5000,
      showConfirmButton: true,
      confirmButtonColor: "#C95792",
      timerProgressBar: true,
    });

    if (response?.success) {
      // Reset form
      name.value = "";
      phone_number.value = "";
      age.value = "";
      date.value = "";
      doctor.value = "";
      complaint.value = "";
      arrow.value = false;
      
      // Reset errors
      Object.keys(errors.value).forEach(key => {
        errors.value[key as keyof typeof errors.value] = "";
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
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

// Close dropdown when clicking outside
function handleClickOutside(event: Event) {
  const dropdown = document.getElementById('doctor-dropdown');
  const trigger = document.getElementById('doctor-trigger');
  
  if (arrow.value && 
      dropdown && 
      !dropdown.contains(event.target as Node) && 
      trigger && 
      !trigger.contains(event.target as Node)) {
    arrow.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-8 lg:py-12">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      
      <!-- Header Section -->
      <div class="text-center mb-8 lg:mb-12">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-4">
          Pendaftaran Pasien
        </h1>
        <p class="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
          Silahkan isi form di bawah ini untuk mendaftar sebagai pasien di Griya Sehat Ummi
        </p>
      </div>

      <!-- Registration Form Card -->
      <div class="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
        <!-- Card Header -->
        <div class="bg-gradient-to-r from-[#C95792] to-[#A64A7A] px-6 sm:px-8 py-6 sm:py-8">
          <h2 class="text-xl sm:text-2xl font-bold text-white text-center">
            Form Pendaftaran
          </h2>
          <p class="text-white/90 text-center mt-2 text-sm sm:text-base">
            Pastikan semua data yang Anda masukkan sudah benar
          </p>
        </div>

        <!-- Form Content -->
        <div class="p-6 sm:p-8 lg:p-10">
          <form @submit.prevent="reserve" class="space-y-6">
            
            <!-- Full Name Field -->
            <div class="space-y-2">
              <label for="fullname" class="block text-sm font-semibold text-gray-700">
                Nama Lengkap <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                v-model="name"
                id="fullname"
                placeholder="Masukan nama lengkap Anda"
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
              <label for="phone_number" class="block text-sm font-semibold text-gray-700">
                Nomor Telepon <span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                v-model="phone_number"
                id="phone_number"
                placeholder="Contoh: 081234567890"
                :class="[
                  'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                  errors.phone_number 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                ]"
                :style="{ fontSize: '16px' }"
              />
              <p v-if="errors.phone_number" class="text-red-500 text-sm font-medium">
                {{ errors.phone_number }}
              </p>
            </div>

            <!-- Age Field -->
            <div class="space-y-2">
              <label for="age" class="block text-sm font-semibold text-gray-700">
                Umur <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                v-model="age"
                id="age"
                placeholder="Masukan umur dalam tahun"
                min="1"
                max="120"
                :class="[
                  'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback',
                  errors.age 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                ]"
                :style="{ fontSize: '16px' }"
              />
              <p v-if="errors.age" class="text-red-500 text-sm font-medium">
                {{ errors.age }}
              </p>
            </div>

            <!-- Date Field -->
            <div class="space-y-2">
              <label for="date" class="block text-sm font-semibold text-gray-700">
                Tanggal Periksa <span class="text-red-500">*</span>
              </label>
              <div @click="openDatePicker" class="cursor-pointer relative">
                <input
                  type="date"
                  ref="dateInput"
                  v-model="date"
                  id="date"
                  :class="[
                    'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base touch-feedback cursor-pointer',
                    errors.date 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                      : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                  ]"
                  :style="{ fontSize: '16px' }"
                />
                <div class="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
              <p v-if="errors.date" class="text-red-500 text-sm font-medium">
                {{ errors.date }}
              </p>
            </div>

            <!-- Doctor Selection -->
            <div class="space-y-2">
              <label for="doctor" class="block text-sm font-semibold text-gray-700">
                Pilih Dokter <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div
                  id="doctor-trigger"
                  :class="[
                    'w-full px-4 py-3 sm:py-4 border-2 rounded-xl cursor-pointer flex justify-between items-center transition-all duration-200 touch-feedback',
                    errors.doctor 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 hover:border-[#C95792]'
                  ]"
                  @click="toggleArrow"
                >
                  <span :class="doctor ? 'text-gray-800' : 'text-gray-500'" class="text-sm sm:text-base">
                    {{ doctor || "Pilih dokter yang tersedia" }}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    :class="[
                      'transition-transform duration-300 text-gray-400',
                      arrow ? 'rotate-180' : 'rotate-0',
                    ]"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>

                <!-- Dropdown Menu -->
                <Transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                >
                  <div
                    v-show="arrow"
                    id="doctor-dropdown"
                    class="absolute z-20 w-full bg-white border-2 border-gray-200 rounded-xl mt-2 shadow-2xl max-h-64 overflow-y-auto"
                  >
                    <div
                      v-for="item in doctorList"
                      :key="item.id"
                      class="px-4 py-3 sm:py-4 hover:bg-[#C95792]/10 cursor-pointer transition-all duration-150 first:rounded-t-xl last:rounded-b-xl touch-feedback"
                      @click="selectDoctor(item.name)"
                    >
                      <p class="text-sm sm:text-base font-medium text-gray-800">
                        {{ item.name }}
                      </p>
                    </div>
                  </div>
                </Transition>
              </div>
              <p v-if="errors.doctor" class="text-red-500 text-sm font-medium">
                {{ errors.doctor }}
              </p>
            </div>

            <!-- Complaint Field -->
            <div class="space-y-2">
              <label for="complaint" class="block text-sm font-semibold text-gray-700">
                Keluhan <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="complaint"
                id="complaint"
                placeholder="Jelaskan keluhan atau gejala yang Anda rasakan"
                rows="4"
                :class="[
                  'w-full px-4 py-3 sm:py-4 border-2 rounded-xl transition-all duration-200 text-sm sm:text-base resize-none touch-feedback',
                  errors.complaint 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                    : 'border-gray-300 focus:border-[#C95792] focus:ring-[#C95792]/20'
                ]"
                :style="{ fontSize: '16px' }"
              ></textarea>
              <p v-if="errors.complaint" class="text-red-500 text-sm font-medium">
                {{ errors.complaint }}
              </p>
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7z"></path>
                  </svg>
                  Daftar Sekarang
                </span>
                <span v-else class="flex items-center justify-center gap-2">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Mendaftar...
                </span>
              </button>
            </div>

            <!-- Info Text -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-blue-600 mt-0.5 flex-shrink-0">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <div class="text-sm text-blue-800">
                  <p class="font-semibold mb-1">Informasi Penting:</p>
                  <ul class="space-y-1 text-xs sm:text-sm">
                    <li>• Harap datang 15 menit sebelum jadwal yang dipilih</li>
                    <li>• Bawa kartu identitas (KTP/SIM/Paspor)</li>
                    <li>• Jika ada perubahan jadwal, hubungi kami di WhatsApp</li>
                  </ul>
                </div>
              </div>
            </div>

          </form>
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

/* Remove default date picker styles and make it more touch-friendly */
input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* Loading animation */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar for dropdown */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Safe area support for mobile */
@media (max-width: 640px) {
  .container {
    padding-left: env(safe-area-inset-left, 1rem);
    padding-right: env(safe-area-inset-right, 1rem);
    padding-bottom: env(safe-area-inset-bottom, 1.5rem);
  }
}

/* Better mobile textarea */
textarea {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 640px) {
  textarea {
    min-height: 80px;
  }
}
</style>
