import './index.css'

export default {
  template: `
  <div class="grid-card">
    <div class="card">
      <div class="line">
        <span class="name"></span>
      </div>
      <div class="description"></div>
      <div spot="bottom"></div>
    </div>
  </div>`,
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