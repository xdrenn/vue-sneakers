<script setup>
import Header from './components/shop-header.vue'
import CardList from './components/card-list.vue'
</script>

<template>
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <div class="p-8">
      <div class="text-3xl font-bold">All sneakers</div>
      <CardList />
    </div>
  </div>
</template>
