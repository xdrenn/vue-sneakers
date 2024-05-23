<template>
  <header class="flex justify-between border-b border-slate-300 py-8 px-10">
    <div class="flex items-center gap-5">
      <img src="/sneaker-logo.jpg" alt="logo" width="85" height="45" />
      <div>
        <h1 class="text-xl font-bold">SNEAKERS SHOP</h1>
        <p class="text-gray-500">Vintage sneakers shop</p>
      </div>
    </div>

    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-5 text-gray-500 hover:text-black cursor-pointer">
        <img src="/cart.svg" alt="cart" />
        <b>1200$</b>
      </li>

      <li class="flex items-center gap-5 text-gray-500 hover:text-black cursor-pointer">
        <img src="/heart.svg" alt="favourites" />
        <span>Favorites</span>
      </li>

      <li class="flex items-center gap-5 text-gray-500 hover:text-black cursor-pointer">
        <img src="/profile.svg" alt="profile" />
        <span>Profile</span>
      </li>
    </ul>
  </header>
</template>
