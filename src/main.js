import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import HomeView from './pages/HomeView.vue'
import FavoritesView from './pages/FavoritesView.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/favorites', name: 'Favorites', component: FavoritesView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
