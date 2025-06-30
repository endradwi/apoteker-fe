<script setup lang="ts">
// import { jsPDF } from "jspdf";
import logo from "../assets/Logogsu.png";

const items = ref<any[]>([]);
const { $jsPDF } = useNuxtApp();

const store = useUserStore();
const totalPage = ref(0);
const currentPage = ref(1);
const searchQuery = ref("");

async function fetchHistory(page = 1, search = "") {
  currentPage.value = page;
  const response = (await store.getHistory(page, search)) as any;
  if (response) {
    const results = (response as any).results;
    items.value = results;
  } else {
    console.error("Failed to fetch history");
  }
  totalPage.value = response.page_info.total_page;
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
    // Fallback jika bukan list
    items.push(html);
  }

  return items;
}

function generateSinglePDF(item: any) {
  if (process.client) {
    const doc = new $jsPDF();

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
    doc.text(`Tanggal Periksa: ${tanggal}`, 14, y);
    y += 7;
    doc.text(`Dengan Dokter: ${item.doctor}`, 14, y);
    y += 7;
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

onMounted(() => {
  fetchHistory();
});
</script>

<template>
  <div class="h-screen w-screen py-16 px-20 flex flex-col gap-5">
    <div class="flex justify-between items-center">
      <h1 class="text-5xl font-bold">History Pendaftaran</h1>
      <div
        class="flex focus-within:border-2 focus-within:border-black border border-black rounded-lg items-center pr-2 overflow-hidden"
      >
        <input
          placeholder="Search name"
          class="outline-none rounded-md pl-5 py-2"
          v-model="searchQuery"
          @input="fetchHistory(1, searchQuery)"
        />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
            <path
              fill="currentColor"
              d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
            />
          </svg>
        </div>
      </div>
    </div>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <table class="w-full">
        <thead>
          <tr>
            <th class="border border-black px-4 py-2">No</th>
            <th class="border border-black px-4 py-2">Full Name</th>
            <th class="border border-black px-4 py-2">Phone Number</th>
            <th class="border border-black px-4 py-2">Age</th>
            <th class="border border-black px-4 py-2">Date</th>
            <th class="border border-black px-4 py-2">Dokter</th>
            <th class="border border-black px-4 py-2">Keluhan</th>
            <th class="border border-black px-4 py-2">Rekam Medis</th>
            <th class="border border-black px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="text-center">
            <td class="border border-black py-2">{{ index + 1 }}</td>
            <td class="border border-black py-2">{{ item.fullname }}</td>
            <td class="border border-black py-2">
              {{ item.phone_number }}
            </td>
            <td class="border border-black py-2">{{ item.age }}</td>
            <td class="border border-black py-2">
              {{ item.date.split("T")[0].split("-").reverse().join("-") }}
            </td>
            <td class="border border-black py-2">{{ item.doctor }}</td>
            <td class="border border-black py-2">{{ item.complaint }}</td>
            <td class="border border-black py-2">
              <span
                v-if="item.rec_medic !== '-'"
                class="cursor-pointer text-blue-600 hover:underline hover:font-bold"
                @click="generateSinglePDF(item)"
              >
                Catatan Medis
              </span>
              <span v-else>-</span>
            </td>
            <td class="border border-black py-2">
              <span
                class="rounded-xl px-2 py-1 font-bold"
                :class="{
                  'bg-yellow-200 text-yellow-800':
                    item.status === 'pending' || item.status === 'Pending',
                  'bg-green-200 text-green-800': item.status === 'completed',
                  'bg-red-200 text-red-800':
                    item.status !== 'pending' &&
                    item.status !== 'Pending' &&
                    item.status !== 'completed',
                }"
                >{{ item.status }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </section>
    <div class="w-full flex justify-center gap-2 mt-4">
      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === 1"
        @click="fetchHistory(currentPage - 1)"
      >
        Prev
      </button>

      <button
        v-for="page in totalPage"
        :key="page"
        @click="fetchHistory(page)"
        class="p-2 px-4 rounded"
        :class="{
          'bg-[#C95792] text-white': page === currentPage,
          'bg-gray-200': page !== currentPage,
        }"
      >
        {{ page }}
      </button>

      <button
        class="p-2 px-4 bg-gray-200 rounded"
        :disabled="currentPage === totalPage"
        @click="fetchHistory(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
