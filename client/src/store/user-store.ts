import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
  }),
  actions: {
    setUserDetails(data: { access_token: null }) {
      this.$state.token = data.access_token
    },

    clearUser() {
      this.$state.token = null
    }
  },
  persist: true
})
