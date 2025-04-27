<template>
  <div
    class="w-full h-full flex items-center px-52 py-5 bg-[#EC7FA9] justify-between"
  >
    <div class="flex flex-col">
      <img src="@/assets/myLogo.webp" alt="" class="w-10 h-10" />
      <div class="mt-10">
        <iframe
          src="https://www.google.com/maps?q=-6.200000,106.8166667&z=15&output=embed"
          width="300"
          height="250"
          style="border: 0"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    <div></div>
    <div>
      <ul class="flex flex-wrap gap-5 *:underline">
        <li>
          <nuxt-link to="/">Home</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/about">About</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
