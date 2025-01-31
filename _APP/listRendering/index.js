import { createApp, delay } from 'lesta'

const app = createApp({})

const item = {
  template: '<button></button>',
  props: {
    params: { index: 'number' },
    proxies: { currentIndex: 'number' },
    methods: { click: { required: true } }
  },
  nodes() {
    return {
      button: {
        selector: 'button',
        style: { width: '25%' },
        textContent: () => `${this.param.index} / ${this.proxy.currentIndex}`,
        onclick: () => this.method.click({ index: this.param.index }),
      }
    }
  },
  async created() {
   // await delay(2000)
  }
}

const list = {
  template: '<div class="list"></div>',
  proxies: {
    arr: [...Array(20000).keys()],
    currentIndex: 0
  },
  nodes() {
    return {
      list: {
        component: {
          src: item,
          portion: 300,
          iterate: () => this.proxy.arr,
          aborted: () => {
            console.log(this)
          },
          params: {
            index: ({ index }) => index
          },
          proxies: {
            currentIndex: () => this.proxy.currentIndex,
          },
          methods: {
            click: ({ index }) => this.proxy.currentIndex = index
          }
        }
      }
    }
  },
  mounted() {
    document.onkeyup = () => {
      this.proxy.arr = [...Array(3).keys()]
    }
  }
}

app.mount({ options: list, target: root })
