<script setup lang="ts">
import logo from "../assets/Logogsu.png";

const items = ref<any[]>([]);
const { $jsPDF } = useNuxtApp();

const store = useUserStore();
const totalPage = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");
const isLoading = ref(false);

async function fetchHistory(page = 1, search = "") {
  try {
    isLoading.value = true;
    currentPage.value = page;
    const response = (await store.getHistory(page, search)) as any;

    if (response) {
      const results = (response as any).results;
      items.value = results;
      totalPage.value = response.page_info.total_page;
    } else {
      console.error("Failed to fetch history");
      items.value = [];
    }
  } catch (error) {
    console.error("Error fetching history:", error);
    items.value = [];
  } finally {
    isLoading.value = false;
  }
}

function parseHtmlListToText(html: string): string[] {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  const items: string[] = [];

  const ol = tempDiv.querySelector("ol");
  const ul = tempDiv.querySelector("ul");
  const list = ol || ul;

  if (list) {
    list.querySelectorAll("li").forEach((li, index) => {
      const space = "   ";
      const prefix = space + "-";
      items.push(`${prefix} ${li.textContent?.trim()}`);
    });
  } else {
    items.push(html);
  }

  return items;
}

function generateSinglePDF(item: any) {
  if (process.client) {
    const doc = new $jsPDF();
    console.log("docs", doc);
    console.log("item", item);

    doc.setFontSize(12);

    doc.addImage(logo, "PNG", 15, 20, 20, 20);
    let y = 50;
    const tanggal = item.date.split("T")[0].split("-").reverse().join("-");
    doc.setFont("Helvetica", "bold");
    doc.text("Rekam Medis Pasien", 14, y);
    y += 10;
    doc.setFont("Helvetica", "normal");
    doc.text(`Nama: ${item.fullname}`, 14, y);
    y += 7;
    doc.text(`Umur: ${item.age} Tahun`, 14, y);
    y += 7;
    doc.text(`Tanggal Periksa: ${tanggal}`, 14, y);
    y += 7;
    doc.text(`Dengan Dokter: ${item.doctor}`, 14, y);
    y += 7;

    // Label keluhan
    doc.text("Keluhan:", 14, y);
    y += 7;

    // Ubah jadi list kalau ada koma
    let keluhan = item.complaint || "-";
    if (keluhan.includes(",")) {
      const convertedKeluhan = keluhan
        .split(",")
        .map((part: string) => `<li>${part.trim()}</li>`)
        .join("");
      keluhan = `<ol>${convertedKeluhan}</ol>`;
    }

    // Tulis keluhan ke PDF (sudah dalam bentuk list atau teks biasa)
    parseHtmlListToText(keluhan).forEach((line: string) => {
      const wrapped = doc.splitTextToSize(line, 170);
      wrapped.forEach((wrapLine: string) => {
        doc.text(wrapLine, 14, y);
        y += 7;
      });
    });

    doc.text("Catatan Dokter:", 14, y);
    y += 7;
    const parsedLines = parseHtmlListToText(item.rec_medic || "-");

    parsedLines.forEach((line: string) => {
      const wrapped = doc.splitTextToSize(line, 170);
      wrapped.forEach((wrapLine: string) => {
        doc.text(wrapLine, 14, y);
        y += 7;
      });
    });

    doc.save(`Rekam_Medis_${item.fullname.replace(/\s+/g, "_")}.pdf`);
  }
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

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile-first responsive container -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <!-- Header Section -->
      <div class="mb-6 lg:mb-8">
        <!-- Mobile menu spacing for admin pages -->
        <div class="lg:hidden h-16"></div>

        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1
              class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gray-800 mb-2"
            >
              History Pendaftaran
            </h1>
            <p class="text-sm sm:text-base text-gray-600">
              Riwayat pendaftaran dan catatan medis Anda
            </p>
          </div>

          <!-- Search Box -->
          <div class="relative w-full sm:w-auto sm:min-w-[300px]">
            <input
              v-model="searchQuery"
              @input="fetchHistory(1, searchQuery)"
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
          <span class="text-gray-600">Memuat data...</span>
        </div>
      </div>

      <!-- Content Section -->
      <div v-else>
        <!-- Mobile Card Layout (hidden on lg and up) -->
        <div class="lg:hidden space-y-4">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-200"
          >
            <!-- Card Header -->
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800 mb-1">
                  {{ item.fullname }}
                </h3>
                <p class="text-sm text-gray-500">
                  Pendaftaran #{{ index + 1 + (currentPage - 1) * 10 }}
                </p>
              </div>
              <span
                :class="getStatusColor(item.status)"
                class="px-3 py-1 rounded-full text-xs font-semibold border"
              >
                {{ item.status }}
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
                    {{ item.phone_number }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Umur
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ item.age }} Tahun
                  </p>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Tanggal Periksa
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ item.date.split("T")[0].split("-").reverse().join("-") }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500 uppercase tracking-wide">
                    Dokter
                  </p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ item.doctor }}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide mb-2">
                  Keluhan
                </p>
                <p class="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {{ item.complaint }}
                </p>
              </div>

              <!-- Medical Record Button -->
              <div class="pt-3 border-t border-gray-100">
                <button
                  v-if="item.rec_medic !== '-'"
                  @click="generateSinglePDF(item)"
                  class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors touch-feedback"
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Download Catatan Medis</span>
                </button>
                <div v-else class="text-center py-4 text-gray-500 text-sm">
                  Catatan medis belum tersedia
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State for Mobile -->
          <div v-if="items.length === 0" class="text-center py-12">
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
              Belum ada riwayat
            </h3>
            <p class="text-gray-500">
              Riwayat pendaftaran Anda akan muncul di sini
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
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    No
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
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
                    Tanggal
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
                    Rekam Medis
                  </th>
                  <th
                    class="text-left py-4 px-6 font-semibold text-gray-800 text-sm"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="index"
                  class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ index + 1 + (currentPage - 1) * 10 }}
                  </td>
                  <td class="py-4 px-6 text-sm font-medium text-gray-800">
                    {{ item.fullname }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ item.phone_number }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700 text-center">
                    {{ item.age }} Tahun
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ item.date.split("T")[0].split("-").reverse().join("-") }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700">
                    {{ item.doctor }}
                  </td>
                  <td class="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">
                    {{ item.complaint }}
                  </td>
                  <td class="py-4 px-6 text-sm">
                    <button
                      v-if="item.rec_medic !== '-'"
                      @click="generateSinglePDF(item)"
                      class="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors"
                    >
                      Download PDF
                    </button>
                    <span v-else class="text-gray-400">-</span>
                  </td>
                  <td class="py-4 px-6 text-sm">
                    <span
                      :class="getStatusColor(item.status)"
                      class="px-3 py-1 rounded-full text-xs font-semibold border"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State for Desktop -->
          <div v-if="items.length === 0" class="text-center py-16">
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
              Belum ada riwayat pendaftaran
            </h3>
            <p class="text-gray-500 max-w-md mx-auto">
              Riwayat pendaftaran dan catatan medis Anda akan ditampilkan di
              sini setelah Anda melakukan pendaftaran.
            </p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPage > 1"
          class="flex justify-center items-center gap-2 mt-8 flex-wrap"
        >
          <button
            @click="fetchHistory(currentPage - 1, searchQuery)"
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
              @click="fetchHistory(page, searchQuery)"
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
            @click="fetchHistory(currentPage + 1, searchQuery)"
            :disabled="currentPage === totalPage"
            class="px-3 py-2 sm:px-4 sm:py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
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
</style>
