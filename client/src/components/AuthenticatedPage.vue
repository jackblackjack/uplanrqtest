<template>
  <div>
    <div>
      <router-link to="/" id="home-button"> Home </router-link>
      <template v-if="userStore.token">
        <router-link to="/" id="logout-button" @click="logout"> Logout </router-link>
      </template>
    </div>

    <div>
      <h2>Новые данные</h2>
      <textarea v-model="jsonInput" rows="15" cols="50"></textarea>
      <div>
        <button :disabled="isSending" @click="sendData">Отправить</button>
        <div v-if="isSending">
          <span>Отправка...</span>
        </div>
      </div>
      <div v-if="response" class="response-container">
        <h3>Данные успешно добавлены:</h3>
        <pre>{{ response }}</pre>
      </div>
      <div v-if="error">
        <h3>Ошибка:</h3>
        <pre>{{ error }}</pre>
        <div v-if="showHint">
          <div>
            <span v-if="showHint">Пример корректного JSON:</span>
          </div>
          <textarea rows="9" cols="40">
              {
                "id": "id",
                "data": {
                  "prop1": "prop1",
                  "prop2": "prop2"
                }
              }
            </textarea>
        </div>
      </div>
    </div>

    <div>
      <h2>Поиск</h2>
      <label for="search-target">ID для поиска:</label>
      <input id="search-target" v-model="searchTarget" required />
      <div>
        <button :disabled="isSeeking" @click="seekData">Начать поиск</button>
        <div v-if="isSeeking">
          <span>Поиск...</span>
        </div>
      </div>
      <div v-if="found" class="response-container">
        <h3>Данные успешно найдены:</h3>
        <pre>{{ found }}</pre>
      </div>
    </div>
  </div>
</template>

<style>
.response-container {
  border: 1px solid blue;
  background-color: gainsboro;
  color: green;
  padding: 10px;
  font-family: monospace;
  text-align: left;
  margin: 0 auto;
  width: 500px;
}
</style>

<script lang="ts">
import axios from 'axios';
import { useUserStore } from '../store/user-store';

export default {
  data() {
    return {
      jsonInput: '',
      response: null,
      isSending: false,
      showHint: false,
      error: '',
      isSeeking: false,
      found: null,
      searchTarget: '',
    };
  },
  methods: {
    async sendData() {
      this.showHint = false;
      this.error = '';

      try {
        const jsonData = JSON.parse(this.jsonInput);
        const formattedJson = JSON.stringify(jsonData, null, 2);
        this.jsonInput = formattedJson;

        this.isSending = true;
        const response = await axios.post('/plan', jsonData);

        if (response.status !== 201) {
          this.error = `Ошибка сервера. Код статуса: ${response.status}`;
        }

        this.response = response.data;
      } catch (error) {
        if (error instanceof SyntaxError) {
          this.showHint = true;
          this.error = 'Пожалуйста, укажите корректный JSON код';
        } else {
          this.error = (error as any).response?.data.detail ?? error
        }
      }
      finally {
        this.isSending = false;
      }
    },
    async seekData() {
      this.error = '';
      this.isSeeking = true;
      try {
        const response = await axios.get(`/plan/${this.searchTarget}`);
        this.found = response.data;
      } catch (error) {
        this.error = (error as any).response?.data.detail ?? error
      }
      finally {
        this.isSeeking = false;
      }
    },
    logout() {
      const userStore = useUserStore()
      userStore.clearUser();
    }
  },
  computed: {
    userStore() {
      return useUserStore();
    }
  }
};
</script>
