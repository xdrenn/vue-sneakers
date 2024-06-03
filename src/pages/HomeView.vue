<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import CardList from '../components/card-list.vue'
import axios from 'axios'
import { inject } from 'vue'

const items = ref([])

const { cart, addToCart, removeFromCart } = inject('cart')

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

const onClickAdd = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://backend-sneakers.onrender.com/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorites) => favorites.parentId === item._id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
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
      console.log(obj)
      item.isFavorite = true
      const { data } = await axios.post(`https://backend-sneakers.onrender.com/favorites/add`, obj)

      item.favoriteId = data._id
    } else {
      item.isFavorite = false

      await axios.delete(`https://backend-sneakers.onrender.com/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
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

    const { data } = await axios.get('https://backend-sneakers.onrender.com/sneakers', { params })

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
watch(filters, fetchItems)

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem._id === item._id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <div class="flex justify-between">
    <h2 class="text-3xl font-bold">All sneakers</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="border rounded-md outline-none focus:border-gray-400">
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
</template>
