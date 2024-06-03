<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/card-list.vue'

const favorites = ref([])
onMounted(async () => {
  try {
    const { data } = await axios.get(`https://backend-sneakers.onrender.com/favorites`)

    favorites.value = data.map((obj) => obj.parentId)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <h1>Favorites</h1>

  <CardList :items="favorites" is-favorites />
</template>
