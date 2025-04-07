import './index.css'
import template from 'bundle-text:./index.html'

export default {
  template,
  spots: ['bottom'],
  props: {
    proxies: {
      card: {}
    }
  },
  nodes() {
    return {
      line: {
        style: () => {
          return {
            backgroundColor: this.proxy.card.completed ? 'var(--yellow)' : ''
          }
        }
      },
      name: {
        _text: () => this.proxy.card.name
      },
      description: {
        _text: () => this.proxy.card.description
      }
    }
  }
}