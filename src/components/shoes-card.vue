<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number
})
</script>
<template>
  <div
    class="relative m-10 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      src="/filled-heart.svg"
      height="15"
      width="15"
      alt="favorite"
      class="absolute top-8 left-8"
    />
    <img :src="imageUrl" alt="sneakers" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div>
        <b>{{ price }} $</b>
      </div>
    </div>
  </div>
</template>
