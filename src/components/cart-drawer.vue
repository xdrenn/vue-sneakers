<script setup>
import HeadDrawer from './cart-header.vue'
import CartItemsList from './cart-items-list.vue'
import InfoBlock from './info-block.vue'

const emit = defineEmits(['createOrder'])

defineProps({
  totalPrice: Number,
  disabledButton: Boolean
})
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-20"></div>
  <div class="fixed right-0 top-0 bg-white w-96 h-full z-20 p-8">
    <HeadDrawer />

    <div v-if="!totalPrice" class="flex h-full items-center">
      <InfoBlock
        title="Cart is empty"
        description="Add at least one sneakers to make order"
        image-url="box.png"
      />
    </div>

    <div v-else>
      <CartItemsList />
      <div class="flex flex-col gap-2 mb-6 my-5">
        <div class="flex gap-2">
          <span>Total:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }}</b>
        </div>

        <button
          @click="() => emit('createOrder')"
          :disabled="disabledButton"
          class="bg-teal-200 rounded-xl w-full py-2 hover:bg-teal-500 active:bg-teal-600 cursor-pointer disabled:bg-slate-400"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>
