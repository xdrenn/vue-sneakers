<script setup>
import Header from './components/shop-header.vue'
import CardList from './components/card-list.vue'
import { onMounted, ref, watch, reactive } from 'vue'
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

const fetchItems = async () => {
  try {
    const params = {
      sort: filters.sortBy
    }
    if (filters.searchQuery) {
      params.query = filters.searchQuery
    }
    const { data } = await axios.get(`https://backend-sneakers.onrender.com/sneakers`, { params })
    items.value = data
  } catch (err) {
    console.log(err)
  }
}

onMounted(fetchItems)
watch(filters, fetchItems)
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
      <CardList :items="items" />
    </div>
  </div>
</template>
