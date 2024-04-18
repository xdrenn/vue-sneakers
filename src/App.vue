<script setup>
import Header from './components/shop-header.vue'
import CardList from './components/card-list.vue'
import Drawer from './components/cart-drawer.vue'
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <div class="p-8">
      <div class="flex justify-between">
        <h2 class="text-3xl font-bold">All sneakers</h2>

        <div class="flex gap-4">
          <select class="border rounded-md outline-none focus:border-gray-400">
            <option>By name</option>
            <option>By price(lower)</option>
            <option>By price(higher)</option>
          </select>

          <div class="relative">
            <img class="absolute left-1 top-1" src="/search.svg" />
            <input
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              placeholder="Search..."
            />
          </div>
        </div>
      </div>
      <CardList />
    </div>
  </div>
</template>
