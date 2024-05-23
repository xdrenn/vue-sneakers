<script setup>
import { inject } from 'vue'
const { closeCart } = inject('cart')
</script>

<template>
  <div class="flex items-center gap-3 mb-5">
    <svg
      @click="closeCart"
      class="cursor-pointer opacity-40 hover:opacity-100 transition hover:-translate-x-1"
      width="35px"
      height="25px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12H4M4 12L10 6M4 12L10 18"
        stroke="black"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <h2 class="text-2xl font-bold">Cart</h2>
  </div>
</template>
