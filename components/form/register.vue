<script setup lang="ts"></script>
<template>
  <div class="flex flex-col gap-5 mx-96 my-28">
    <h1 class="text-5xl font-bold">Pendaftaran Pasien</h1>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <form action="" class="flex gap-5">
        <div class="flex flex-col gap-5 w-full">
          <div class="flex flex-col">
            <label for="">Full name</label>
            <input
              type="text"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Phone Number</label>
            <input
              type="text"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Age</label>
            <input
              type="text"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Date</label>
            <input
              type="date"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Dokter</label>
            <input
              type="text"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Keluhan</label>
            <input
              type="text"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <button
            class="bg-[#3D365C] text-white font-bold w-full max-w-52 py-3 border-2 border-[#3D365C] rounded-lg hover:bg-white hover:border-2 hover:border-[#3D365C] hover:text-[#3D365C] transition-all duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  </div>
</template>
