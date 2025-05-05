<script setup lang="ts">
import { ref } from "vue";

const showDropdown = ref(false);

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
</script>
<template>
  <div
    class="w-full h-full flex items-center px-32 py-2 justify-between mb-2 shadow-xl"
  >
    <nuxt-link to="/">
      <img
        src="../assets/Logogsu.png"
        alt="Logo Perusahaan"
        class="w-14 h-14"
      />
    </nuxt-link>
    <div class="flex items-center gap-2">
      <div>Hello, People</div>
      <div class="flex items-center">
        <NuxtLink to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 32 32"
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
        </NuxtLink>
        <div @click="toggleDropdown">
          <svg
            v-if="showDropdown"
            class="rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m7 10l5 5l5-5z" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m7 10l5 5l5-5z" />
          </svg>
        </div>
      </div>
      <div
        v-if="showDropdown"
        class="absolute bg-white shadow-lg rounded-md top-20 w-44 text-right border border-gray-300"
      >
        <ul class="flex flex-col gap-2 p-2">
          <NuxtLink to="/profile">
            <li
              class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
            >
              Profile
            </li>
          </NuxtLink>
          <NuxtLink to="/">
            <li
              class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
            >
              Settings
            </li>
          </NuxtLink>
          <NuxtLink to="/">
            <li
              class="px-4 py-2 hover:bg-gray-200 cursor-pointer hover:bg-slate-200"
            >
              Logout
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
    <div class="flex gap-5">
      <nuxt-link
        to="/login"
        class="bg-[#3D365C] px-5 py-2 rounded-md text-white"
        >Login</nuxt-link
      >
      <nuxt-link
        to="/register"
        class="px-5 py-2 rounded-md border border-[#3D365C] text-[#3D365C]"
      >
        Register</nuxt-link
      >
    </div>
  </div>
</template>
