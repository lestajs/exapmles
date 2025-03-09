export default {
  template: `Results: <span class="results">0</span> items`,
  props: {
    proxies: {
      tasks: { store: 'tasks' },
    }
  },
  nodes() {
    return {
      results: {
        _text: () => this.proxy.tasks.length
      }
    }
  }
}