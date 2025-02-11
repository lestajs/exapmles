import './index.css'
import { nextFrame } from 'lesta'

export default {
  template: `
  <div class="notice red">
    <span class="text"></span>
    <span class="close">ok</span>
  </div>`,
  props: {
    params: {
      // mutable: true, // only params
      index: 'number',
    },
    proxies: {
      notice: {
        type: 'object',
        default: {},
        validation(value) {
          return typeof value.text === 'string'
        }
      }
    },
    methods: {
      close: true
    }
  },
  nodes() {
    return {
      notice: {},
      text: {
        _text: () => this.proxy.notice.text
      },
      close: {
        onclick: () => {
          this.method.close({ index: this.param.index })
        }
      }
    }
  },
  async mounted() {
    await nextFrame()
    this.node.notice.target.classList.add('visible')
  }
}