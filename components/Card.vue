<script setup lang="ts">
import bidan from "@/assets/bidan.png";
import trapis from "@/assets/trapis.png";
import kandungan from "@/assets/kandungan.png";

const data = ref([
  {
    title: "Bidan",
    description: "Description 1",
    image: bidan,
    available: "Senin - Jumat",
  },
  {
    title: "Trapis",
    description: "Description 2",
    image: trapis,
    available: "Senin - Jumat",
  },
  {
    title: "Dokter Kandungan",
    description: "Description 3",
    image: kandungan,
    available: "Senin - Jumat",
  },
]);
</script>

<template>
  <article class="flex flex-col text-center px-20 py-10 gap-10">
    <span class="text-2xl font-bold">Layanan Kami</span>
    <div class="flex items-center justify-between gap-5">
      <div v-for="(item, index) in data" :key="index">
        <div
          class="flex bg-blue-200 shadow-md rounded-xl px-5 py-5 items-center"
        >
          <div>
            <img :src="item.image" alt="" class="w-96 h-72" />
          </div>
          <div>
            <h1 class="text-xl font-bold">{{ item.title }}</h1>
            <h3>{{ item.available }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
