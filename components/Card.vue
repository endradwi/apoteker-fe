<script setup lang="ts">
const data = ref([
    {
        title: 'Card 1',
        description: 'Description 1',
        image: '',
    },
    {
        title: 'Card 2',
        description: 'Description 2',
        image: '',
    },
    {
        title: 'Card 3',
        description: 'Description 3',
        image: '',
    },
])
</script>
<template>
    <article class="flex flex-col text-center px-20 py-10 gap-10">
        <span class="text-2xl font-bold">Layanan Kami</span>
        <div class="flex items-center justify-between ">
            
            <div v-for="(item, index) in data" :key="index">
                <div class="bg-red-500 shadow-md rounded-xl px-40 py-60">
                    <h1 class="text-xl font-bold">{{ item.title }}</h1>
                    <p>{{ item.description }}</p>
                </div>
            </div>
        </div>
    </article>
</template>