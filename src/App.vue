<script setup>
import Header from './components/shop-header.vue'
import CardList from './components/card-list.vue'
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'
import Cart from './components/cart-drawer.vue'

const items = ref([])

const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const cartOpened = ref(false)

const isCreatingOrder = ref(false)

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty)

const closeCart = () => {
  cartOpened.value = false
}

const openCart = () => {
  cartOpened.value = true
}

const filters = reactive({
  sortBy: 'name',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
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

const onClickAdd = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://backend-sneakers.onrender.com/favorites`)

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
    console.log(items.value)
  } catch (err) {
    console.log(err)
  }
}

const addToFavorites = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item._id
      }

      const { data } = await axios.post(`https://backend-sneakers.onrender.com/favorites/add`, obj)

      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      await axios.delete(`https://backend-sneakers.onrender.com/favorites/${item.favoriteId}`)
      item.isFavorite = false
      item.favoriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sort: filters.sortBy
    }
    if (filters.searchQuery) {
      params.query = filters.searchQuery
    }
    const { data } = await axios.get(`https://backend-sneakers.onrender.com/sneakers`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')

  cart.value = localCart ? JSON.parse(localCart) : []
  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})
watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

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
  <Cart
    v-if="cartOpened"
    :total-price="totalPrice"
    @create-order="createOrder"
    :disabledButton="cartButtonDisabled"
  />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-cart="openCart" />

    <div class="p-8">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold">All sneakers</h2>

        <div class="flex gap-4">
          <select
            @change="onChangeSelect"
            class="border rounded-md outline-none focus:border-gray-400"
          >
            <option value="name">By name</option>
            <option value="price">By price(lower)</option>
            <option value="-price">By price(higher)</option>
          </select>

          <div class="relative">
            <img class="absolute left-1 top-1" src="/search.svg" />
            <input
              @input="onChangeSearchInput"
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" @add-to-favorites="addToFavorites" @add-to-cart="onClickAdd" />
    </div>
  </div>
</template>
