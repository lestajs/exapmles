import './index.css'

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
        // style: {
        //   backgroundColor: this.proxy.card.completed ? 'var(--yellow)' : '' // '#fff485'
        // }
      },
      name: {
        _text: () => this.proxy.card.name
      },
      description: {
        _text: () => this.proxy.card.description
      }
    }
  },
  async created() {
    const ms = getRandomNumber(0, 5000)
    console.log(ms)
    // await delay(1000) // imitate error
  }
}