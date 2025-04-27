<template>
  <div class="w-full h-full flex items-center px-32 py-5 justify-between mb-2">
    <img src="@/assets/Logogsu.png" alt="Logo Perusahaan" class="w-10 h-10" />
    <ul class="flex flex-wrap gap-5 *:underline">
      <li>
        <nuxt-link to="/">Home</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
    </ul>
    <div class="flex gap-5">
      <nuxt-link to="/login" class="bg-blue-500 px-5 py-2 rounded-md"
        >Login</nuxt-link
      >
      <nuxt-link to="/register" class="bg--blue-500 px-5 py-2 rounded-md"
        >Register</nuxt-link
      >
    </div>
  </div>
</template>
