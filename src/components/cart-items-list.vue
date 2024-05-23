<script setup>
import { inject } from 'vue'
import CartItem from './cart-item.vue'

const { cart, removeFromCart } = inject('cart')
</script>
<template>
  <div class="grid grid-col gap-4">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :name="item.name"
      :price="item.price"
      :image-url="item.imageUrl"
      @remove-from-cart="() => removeFromCart(item)"
    />
  </div>
</template>
