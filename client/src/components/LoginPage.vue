<template>
  <div>
    <h1>Login</h1>
    <router-link to="/" id='home-button'> Home </router-link>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div>
        <button type="submit" :disabled="loading">Log In</button>
      </div>
      <div v-if="error">
        <h3>Ошибка авторизации:</h3>
        <pre>{{ error }}</pre>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user-store'

const router = useRouter()
const userStore = useUserStore()

const error = ref(null);
const loading = ref(false);
const username = ref(null);
const password = ref(null);

const login = async () => {
  error.value = null
  loading.value = true

  try {
    const res = await axios.post('auth/login', {
      username: username.value,
      password: password.value,
    })

    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token
    userStore.setUserDetails(res.data)
    router.push('/authenticated')
    loading.value = false
  } catch (err) {
    loading.value = false
    error.value = (error as any).response?.data.detail
  }
}
</script>

