<script setup>
import Card from './shoes-card.vue'
</script>
<template>
  <div class="grid grid-cols-3">
    <Card
      title="Saucony Jazz"
      imageUrl="/sneakers/sneakers-1.jpg"
      :price="500"
      :isFavourite="true"
      :isAdded="true"
    />
  </div>
</template>
