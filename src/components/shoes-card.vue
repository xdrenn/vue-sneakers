<script setup>
defineProps({
  _id: String,
  imageUrl: String,
  name: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function
})
</script>

<template>
  <div
    class="relative m-10 border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      class="absolute top-8 left-8"
      height="20"
      width="20"
      :src="isFavorite ? '/filled-heart.svg' : '/heart.svg'"
      alt="favorite"
    />
    <img :src="imageUrl" alt="sneakers" />
    <p class="mt-2">{{ name }}</p>

    <div class="flex justify-between mt-5">
      <div>
        <b>{{ price }} $</b>
      </div>

      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        height="10"
        width="20"
        :src="isAdded ? '/check.svg' : '/plus.svg'"
        alt="plus"
      />
    </div>
  </div>
</template>
