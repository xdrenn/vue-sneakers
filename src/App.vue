<script setup>
import Header from './components/shop-header.vue'

import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'
import Cart from './components/cart-drawer.vue'

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const cartOpened = ref(false)

const isCreatingOrder = ref(false)

const closeCart = () => {
  cartOpened.value = false
}

const openCart = () => {
  cartOpened.value = true
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://backend-sneakers.onrender.com/cart/add`, {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', { cart, closeCart, openCart, addToCart, removeFromCart })
</script>

<template>
  <Cart v-if="cartOpened" :total-price="totalPrice" @create-order="createOrder" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-cart="openCart" />

    <div class="p-8"><RouterView /></div>
  </div>
</template>
