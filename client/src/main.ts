import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import LoginPage from './components/LoginPage.vue'
import Home from './components/Home.vue'
import AuthenticatedPage from './components/AuthenticatedPage.vue'
import './axios.js'
import { useUserStore } from './store/user-store'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage },
    {
      path: '/authenticated',
      component: AuthenticatedPage,
      beforeEnter: (to, from, next) => {
        useUserStore().token ? next() : next('/login')
      },
    }
  ]
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
