<script setup>
defineProps({
  _id: String,
  imageUrl: String,
  name: String,
  price: Number
})

const emit = defineEmits(['removeFromCart'])
</script>

<template>
  <div class="flex items-center w-full border border-slate-150 p-4 rounded-xl gap-4">
    <img class="w-24 h-23" :src="imageUrl" alt="sneakers" />

    <div class="flex flex-col flex-1">
      <p>{{ name }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }}$</b>
        <img
          @click="emit('removeFromCart')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition right-5 top-0"
          src="/delete.svg"
        />
      </div>
    </div>
  </div>
</template>
