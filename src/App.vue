<script setup>
import Header from './components/shop-header.vue'
import CardList from './components/card-list.vue'
import { onMounted, ref, watch, reactive, provide } from 'vue'
import axios from 'axios'

const items = ref([])

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
  await fetchItems()
  await fetchFavorites()
})
watch(filters, fetchItems)

provide('addToFavorites', addToFavorites)
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

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
      <CardList :items="items" @addToFavorites="addToFavorites" />
    </div>
  </div>
</template>
