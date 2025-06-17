<script setup lang="ts">
import bidan from "@/assets/bidan.png";
import trapis from "@/assets/trapisbun.png";
import kandungan from "@/assets/kandungan.png";

const data = ref([
  {
    title: "Bidan istiadah S.Tr.Keb - Kepala Bidan dan owner",
    description: [
      "Imunisasi Bayi (HB-0, DPT, IPV, POLIO, PCV, Campak)",
      "Imunisasi Tetanus, Periksa Hamil (ANC)",
      "Periksa Kesehatan, Pengobatan Ibu dan Anak , Periksa darah (Gula, Kolesterol, Asam Urat, GDS)",
      "Periksa darah ibu hamil (HIV, SIFILIS, HBSHG / SIFILIS)",
      "Suntik KB (1 bulan & 3 bulan)",
      "Pasang IUD",
      "Cukur Bayi",
      "Tindik Bayi",
      "Sunat Bayi Perempuan",
      "Suntik Vitamin C Collagen",
      "Infus Vitamin",
      "Ganti perban / luka jahitan",
      "Uap Nebulizer",
    ],
    image: bidan,
    day: "Senin - Minggu",
    time: "08.00 - 20.00",
    time2: "Persalinan 24 Jam",
  },
  {
    title: "Lilis S.Pd - Kepala Trapis",
    description: [
      "Pijat Laktasi",
      "Pijat Nifas (Pijat Setelah Lahiran)",
      "Pijat Ibu Hamil",
      "Totok Punggung",
      "Harashiatsu",
      "Bekam",
      "Fasdhu",
      "Pijat Bayi (di bawah 1 tahun)",
      "Pijat Balita (2-5 tahun)",
      "Pijat Pediatric (Kolik, Flu, Sakit, Jatuh / Keseleo, Susah BAB, Susah Makan, Keterlambatan Perkembangan)",
      "Infrared",
      "Pijat Oksitisin",
      "Pijat Perineum",
      "Akupuntur",
      "Mathai Krekk",
      "Colon Cleansing",
      "Moxatherpy",
      "Pijat Urut Tradisional",
      "Paz Maryam",
      "Totok Wajah",
    ],
    image: trapis,
    day: "Senin - Jumat",
    day2: "Sabtu - Minggu",
    time: "09.00 - 17.00",
    time2: "09.00 - 15.00",
  },
  {
    title: "Dr. Femmy Dzulkarnaen, SpOG - Dokter Spesialis Kandungan",
    description: ["USG", "Konsultasi Kehamilan", "Program Kamil", "Pasang IUD"],
    image: kandungan,
    day: "Jumat",
    day2: "Sabtu",
    time: "13.00 - 17.00",
    time2: "08.00 - 11.00",
  },
]);
</script>

<template>
  <article class="flex flex-col text-center py-10 gap-10">
    <span class="text-5xl font-bold">Layanan Kami</span>
    <div class="flex flex-wrap items-center justify-center gap-5">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="p-1 border-2 border-red-500 rounded-xl shadow-lg"
      >
        <div
          class="flex lg:flex-row flex-col bg-[#C95792] shadow-md rounded-xl px-5 py-5 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 text-white"
          :class="[index === 0 ? 'py-[2rem]' : '']"
        >
          <div class="w-52 h-[300px] overflow-hidden ml-20 lg:ml-0">
            <img
              :src="item.image"
              alt="image_pekerja"
              class="h-[400px] lg:h-96"
            />
          </div>
          <div class="flex-1 text-center lg:text-left space-y-2">
            <h1 class="text-xl font-bold">{{ item.title }}</h1>
            <div class="flex gap-10 items-center">
              <div>
                <h2>{{ item.day }}</h2>
                <h3>{{ item.time }}</h3>
              </div>
              <div>
                <h2>{{ item.day2 }}</h2>
                <h3>{{ item.time2 }}</h3>
              </div>
            </div>
            <hr class="border-white w-[70%]" />
            <ul
              class="list-disc gap-5 max-w-96 columns-2 text-left lg:pl-0 pl-3"
            >
              <li v-for="(desc, idx) in item.description" :key="idx">
                {{ desc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
