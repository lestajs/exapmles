import { delayRace } from 'lesta'

export default {
  params: {
    delay: 3000
  },
  proxies: {
    notices: [],
  },
  methods: {
    addNotice({ text }) {
      this.proxy.notices.unshift({ text })
      delayRace(this.param.delay).then(this.proxy.notices.pop)
    },
    removeNotice({ index }) {
      this.proxy.notices.splice(index, 1)
    }
  }
}