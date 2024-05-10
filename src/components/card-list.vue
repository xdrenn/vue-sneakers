<script setup>
import Card from './shoes-card.vue'

defineProps({
  items: Array
})
</script>
<template>
  <div class="grid grid-cols-3">
    <Card
      v-for="item in items"
      :key="item.id"
      :name="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
    />
  </div>
</template>
