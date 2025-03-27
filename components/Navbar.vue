<template>
    <div class="w-full h-full flex items-center px-52 py-5 bg-[#EC7FA9] justify-between shadow-md shadow-[#BE5985] ">
        <img src="@/assets/myLogo.webp" alt="Logo Perusahaan" class="w-10 h-10">
        <ul class="flex flex-wrap gap-5 *:underline">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/about">About</nuxt-link>
            </li>
        </ul>
    </div>
</template>