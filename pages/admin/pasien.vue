<script setup lang="ts">
import { ModalEditPasien } from "#components";
import type { dataPasien } from "~/types/user";

definePageMeta({
  layout: "admin",
});
useSeoMeta({
  title: "Kelola Pasien - Admin Dashboard",
});

const users = ref<dataPasien[]>([]);
const totalPage = ref(0);
const currentPage = ref(1);
const modalOpenEditUser = ref(false);
const selectedUser = ref<any | null>(null);
const searchQuery = ref("");
const isLoading = ref(false);
const expandedRecMedic = ref<number | null>(null); // simpan ID pasien yang sedang dibuka

const store = useUserStore();

async function getAllPasien(page = 1, search = "", sort = "DESC") {
  try {
    isLoading.value = true;
    currentPage.value = page;
    const response = (await store.getAllReserve(page, search, sort)) as any;

    if (response && Array.isArray(response.results)) {
      console.log("Pasien data=", response.results);
      users.value = response.results.map((user: dataPasien) => {
        const [year, month, day] = user.date
          .toString()
          .split("T")[0]
          .split("-");
        return {
          ...user,
          date: `${day}-${month}-${year}`,
        };
      });
      console.log("Converted data=", users.value);
      totalPage.value = response.page_info.total_page;
    } else {
      console.error("Failed to fetch pasien data");
      users.value = [];
    }
  } catch (error) {
    console.error("Error fetching patients:", error);
    users.value = [];
  } finally {
    isLoading.value = false;
  }
}

function EditClick(user: dataPasien) {
  selectedUser.value = { ...user };
  modalOpenEditUser.value = true;
  console.log("Selected user for edit:", selectedUser.value);
}

function getStatusColor(status: string) {
  if (status === "pending" || status === "Pending") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  } else if (status === "completed") {
    return "bg-green-100 text-green-800 border-green-200";
  } else {
    return "bg-red-100 text-red-800 border-red-200";
  }
}

function removeListTags(html: string) {
  return html.replace(/<\/?(ul|ol|li)[^>]*>/gi, "");
}

onMounted(() => {
  getAllPasien();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <!-- Header Section -->
      <div class="mb-6 lg:mb-8">
        <!-- Mobile menu spacing -->
        <div class="lg:hidden h-16"></div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div class="flex-1">
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-2"
            >
              Kelola Pasien
            </h1>
            <p class="text-sm sm:text-base text-gray-600">
              Manage patient registrations and medical records
            </p>
          </div>

          <!-- Search Box -->
          <div class="relative w-full sm:w-auto sm:min-w-[300px]">
            <input
              v-model="searchQuery"
              @input="getAllPasien(1, searchQuery)"
              placeholder="Cari nama pasien..."
              class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C95792] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            />
            <div
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="flex items-center gap-3">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C95792]"
          ></div>
          <span class="text-gray-600">Memuat data pasien...</span>
        </div>
      </div>

      <!-- Content Section -->
      <div v-else>
        <!-- Mobile Card Layout (hidden on lg and up) -->
        <div class="lg:hidden space-y-4">
          <div
            v-for="(user, index) in users"
            :key="user.id"
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-200"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 mb-1">
                  {{ user.fullname }}
                </h3>
                <p class="text-sm text-gray-500">
                  Pasien #{{ index + 1 + (currentPage - 1) * 10 }}
                </p>
              </div>
              <span
                :class="getStatusColor(user.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold border"
              >
                {{ user.status }}
              </span>
            </div>

            <!-- Card Content -->
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    No. Telepon
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ user.phone_number }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Umur
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ user.age }} tahun
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Tanggal Periksa
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ user.date }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Dokter
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ user.doctor }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Keluhan
                </p>
                <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {{ user.complaint }}
                </p>
              </div>

              <div v-if="user.rec_medic && user.rec_medic !== '-'">
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Catatan Medis
                </p>
                <div
                  class="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200"
                >
                  <div
                    v-html="user.rec_medic"
                    :class="[
                      expandedRecMedic === user.id
                        ? ''
                        : 'line-clamp-3 overflow-hidden',
                    ]"
                  ></div>

                  <button
                    v-if="user.rec_medic.length > 100"
                    @click="
                      expandedRecMedic =
                        expandedRecMedic === user.id ? null : user.id
                    "
                    class="text-blue-500 text-xs mt-2"
                  >
                    {{
                      expandedRecMedic === user.id
                        ? "Tutup"
                        : "Lihat Selengkapnya"
                    }}
                  </button>
                </div>
              </div>

              <!-- Action Button -->
              <div class="pt-4 border-t border-gray-100">
                <button
                  @click="EditClick(user)"
                  class="w-full flex items-center justify-center gap-2 bg-[#C95792] hover:bg-[#A64A7A] text-white px-4 py-3 rounded-lg font-medium transition-colors touch-feedback"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                    ></path>
                    <path
                      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                    ></path>
                  </svg>
                  <span>Edit Data Pasien</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State for Mobile -->
          <div v-if="users.length === 0" class="text-center py-12">
            <div class="w-24 h-24 mx-auto mb-4 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-800 mb-2">
              Belum ada pendaftaran
            </h3>
            <p class="text-gray-500">
              Data pendaftaran pasien akan muncul di sini
            </p>
          </div>
        </div>

        <!-- Desktop Table Layout (hidden on mobile) -->
        <div
          class="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th
                    class="text-left py-4 pl-6 font-semibold text-gray-800 text-sm"
                  >
                    No
                  </th>
                  <th
                    class="text-left py-4 px-4 font-semibold text-gray-800 text-sm"
                  >
                    Nama Lengkap
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    No. Telepon
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Umur
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Tanggal Periksa
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Dokter
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Keluhan
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Catatan Medis
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Status
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(user, index) in users"
                  :key="user.id"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ index + 1 + (currentPage - 1) * 10 }}
                  </td>
                  <td class="py-4 px-6 text-sm font-medium text-gray-800">
                    {{ user.fullname }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ user.phone_number }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700 text-center">
                    {{ user.age }} Tahun
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ user.date }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700 truncate max-w-60">
                    {{ user.doctor }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    <div class="max-w-xs truncate">
                      {{ user.complaint }}
                    </div>
                  </td>

                  <td class="py-4 px-6 text-sm text-gray-700 max-w-xs">
                    <div
                      v-if="user.rec_medic && user.rec_medic !== '-'"
                      class="max-w-xs"
                    >
                      <div
                        v-html="user.rec_medic"
                        :class="[
                          expandedRecMedic === user.id
                            ? ''
                            : 'line-clamp-3 overflow-hidden',
                        ]"
                      ></div>

                      <button
                        v-if="user.rec_medic.length > 100"
                        @click="
                          expandedRecMedic =
                            expandedRecMedic === user.id ? null : user.id
                        "
                        class="text-blue-500 text-xs mt-1"
                      >
                        {{
                          expandedRecMedic === user.id
                            ? "Tutup"
                            : "Lihat Selengkapnya"
                        }}
                      </button>
                    </div>

                    <span v-else class="text-gray-400">-</span>
                  </td>
                  <td class="py-4 px-6 text-sm">
                    <span
                      :class="getStatusColor(user.status)"
                      class="px-3 py-1 rounded-full text-xs font-semibold border"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm">
                    <button
                      @click="EditClick(user)"
                      class="bg-[#C95792] hover:bg-[#A64A7A] text-white px-3 py-2 rounded-lg text-xs font-medium transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State for Desktop -->
          <div v-if="users.length === 0" class="text-center py-16">
            <div class="w-32 h-32 mx-auto mb-6 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-3">
              Belum ada pendaftaran pasien
            </h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Data pendaftaran pasien akan ditampilkan di sini setelah ada yang
              mendaftar.
            </p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPage > 1"
          class="flex justify-center items-center gap-2 mt-8 flex-wrap"
        >
          <button
            @click="getAllPasien(currentPage - 1, searchQuery)"
            :disabled="currentPage === 1"
            class="px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>

          <template v-for="page in totalPage" :key="page">
            <button
              v-if="
                page === 1 ||
                page === totalPage ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              "
              @click="getAllPasien(page, searchQuery)"
              :class="[
                'px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-[#C95792] text-white shadow-lg'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === currentPage - 2 || page === currentPage + 2"
              class="px-2 py-2 text-gray-400"
            >
              ...
            </span>
          </template>

          <button
            @click="getAllPasien(currentPage + 1, searchQuery)"
            :disabled="currentPage === totalPage"
            class="px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Modal -->
      <ModalEditPasien
        v-if="modalOpenEditUser"
        :user="selectedUser"
        @close="modalOpenEditUser = false"
        @refresh="getAllPasien"
        class="z-50 absolute w-full items-center justify-center"
      />
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
  content: "";
  position: absolute;
  inset: 0;
  background: currentColor;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.touch-feedback:active::before {
  opacity: 0.1;
}

/* Loading animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Medical record content styling */
:deep(ol),
:deep(ul) {
  @apply pl-4 mb-2 text-sm list-disc;
}

:deep(li) {
  @apply mb-1;
}

/* Responsive truncation */
@media (max-width: 1280px) {
  .max-w-xs {
    max-width: 8rem;
  }
}

/* Safe area padding for mobile */
@media (max-width: 1023px) {
  .container {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Button focus states for accessibility */
button:focus {
  outline: 2px solid rgba(201, 87, 146, 0.5);
  outline-offset: 2px;
}
</style>
