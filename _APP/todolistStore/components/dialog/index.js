import styles from './index.module.css'

console.log(styles)
export default {
  template: `
    <dialog class="dialog">
      <div class="close"></div>
      <div spot="content"></slot>
    </dialog>`,
  styles: styles,
  props: {
    proxies: {
      opened: {
        default: false
      }
    },
    methods: {
      onclose: {}
    }
  },
  spots: ['content'],
  actions: ['show', 'close'],
  setters: {
    opened(v) {
      return typeof v === 'boolean' ? v : false
    }
  },
  handlers: {
    opened(v) {
      v ? this.node.dialog.target.showModal() : this.node.dialog.target.close()
    }
  },
  nodes() {
    return {
      dialog: {},
      close: {
        onclick: () => {
          console.log(this.unrelatedProxy('opened'))
          if (this.unrelatedProxy('opened') && !this.method.onclose?.()) this.proxy.opened = false
        }
      }
    }
  },
  methods: {
    show() {
      if (this.unrelatedProxy('opened')) this.proxy.opened = true
    },
    close() {
      if (this.unrelatedProxy('opened')) this.proxy.opened = false
    }
  },
  refreshed({ cause, data }) {
    // cause = 'spotMounted'
    if (data.spotname === 'content') this.proxy.opened = true
  }
}