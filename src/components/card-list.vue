<script setup>
import Card from './shoes-card.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorites'])
</script>

<template>
  <div class="grid grid-cols-3">
    <Card
      v-for="item in items"
      :key="item.id"
      :_id="item._id"
      :name="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :onClickFavorite="() => emit('addToFavorites', item)"
    />
  </div>
</template>
