<script setup>
import Card from './shoes-card.vue'

defineProps({
  items: Array,
  isFavorite: Boolean
})

const emit = defineEmits(['addToFavorites', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-3" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :_id="item._id"
      :name="item.name"
      :imageUrl="item.imageUrl"
      :price="item.price"
      :isFavorite="item.isFavorite"
      :isAdded="item.isAdded"
      :onClickFavorite="isFavorite ? null : () => emit('addToFavorites', item)"
      :onClickAdd="isFavorite ? null : () => emit('addToCart', item)"
    />
  </div>
</template>
