<script setup>
import HeadDrawer from './head-drawer.vue'
import CartItemsList from './cart-items-list.vue'
</script>
<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-20"></div>
  <div class="fixed right-0 top-0 bg-white w-96 h-full z-20 p-8">
    <HeadDrawer />
    <CartItemsList />

    <div>
      <div class="flex gap-2 mb-6 my-5">
        <span>Total:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>300 $</b>
      </div>

      <button
        disabled="true"
        class="bg-teal-200 rounded-xl w-full py-2 hover:bg-teal-500 active:bg-teal-600 cursor-pointer disabled:bg-slate-400"
      >
        Checkout
      </button>
    </div>
  </div>
</template>
