<script setup lang="ts">
const name = ref("");
const hp = ref("");
const email = ref("");
const password = ref("");
const store = useUserStore();
const image = ref<File | null>(null);

const previewUrl = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    image.value = target.files[0];
    previewUrl.value = URL.createObjectURL(target.files[0]);
  }
}

async function editProfile() {
  const response = await store.patchprofile(
    name.value,
    hp.value,
    email.value,
    password.value,
    image.value
  );
  console.log("Profile data = ", response);
}

async function profile() {
  const response = await store.profile();
  console.log("Profile data = ", response);
  if (response) {
    name.value = (response as any).results.fullname;
    hp.value = (response as any).results.phone_number;
    email.value = (response as any).results.email;
  } else {
    // Handle profile retrieval error
    console.error("Failed to retrieve profile");
  }
}

watch(image, (newImage) => {
  if (newImage) {
    previewUrl.value = URL.createObjectURL(newImage);
    console.log("Image updated:", previewUrl.value);
  }
});
onMounted(() => {
  profile();
});
</script>
<template>
  <div class="flex flex-col gap-5 mx-2 my-10 lg:mx-96 lg:my-28">
    <h1 class="text-4xl lg:text-5xl font-bold">Hello, {{ name }}</h1>
    <section
      class="px-5 py-10 rounded-2xl border-2 border-[#C95792] shadow-xl shadow-[#3D365C]"
    >
      <form @submit.prevent="editProfile" class="flex gap-5">
        <!-- Avatar Upload with Hover Camera Icon -->
        <div
          class="group border border-black relative overflow-hidden w-28 h-20 lg:w-44 lg:h-36 rounded-full text-center flex items-center justify-center hover:bg-black/50 transition-all duration-300 ease-in-out cursor-pointer"
          @click="triggerFileInput"
        >
          <!-- Profile Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 32 32"
            class="text-black group-hover:opacity-30 transition-opacity duration-300"
            v-if="image === null && previewUrl === null"
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
          <img
            class="object-cover rounded-full w-full h-full bg-no-repeat bg-center ml-[-78px] lg:ml-[-148px]"
            v-else
            :src="`{$NUXT_PUBLIC_API_URL}/profile/image/${image?.name}`"
          />
          <!-- Preview Image -->
          <img
            v-if="previewUrl"
            :src="previewUrl"
            alt="Preview"
            class="w-full h-full object-cover rounded-full"
          />
          <!-- Camera Icon on Hover -->
          <div
            class="absolute inset-0 flex items-center text-white justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="52"
              viewBox="0 0 24 24"
            >
              <!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE -->
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <path
                fill="currentColor"
                d="M20 4h-3.17l-1.24-1.35A2 2 0 0 0 14.12 2H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5"
              />
            </svg>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />
        </div>

        <div class="flex flex-col gap-5 w-full">
          <div class="flex flex-col">
            <label for="">Nama Lengkap</label>
            <input
              type="text"
              v-model="name"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">No.Telpon</label>
            <input
              type="text"
              v-model="hp"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Email</label>
            <input
              type="text"
              v-model="email"
              class="border border-black rounded-md py-3 px-5"
            />
          </div>
          <div class="flex flex-col">
            <label for="">Password</label>
            <input
              type="text"
              v-model="password"
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
