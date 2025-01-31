import { delay } from 'lesta'

export default {
  proxies: {
    notices: [],
  },
  methods: {
    async addNotice({ text }) {
      this.proxy.notices.unshift({ text })
      await delay(3000)
      this.proxy.notices.pop()
    },
    removeNotice({ index }) {
      this.proxy.notices.splice(index, 1)
    }
  }
}