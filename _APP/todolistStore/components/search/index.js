import './index.css'
import { debounce } from 'lesta'

export default {
  template: `
  <div>
    <input class="search" autofocus>
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>
  </div>`,
  props: {
    methods: {
      search: {}
    }
  },
  params: {
    debouncedSearch: null,
    isPaste: false
  },
  nodes() {
    return {
      search: {
        oninput: (e) => {
          if (this.param.isPaste) {
            this.method.search({value: e.target.value})
            this.param.isPaste = false
          } else {
            this.param.debouncedSearch(e)
          }
        },
        onpaste: () => this.param.isPaste = true
      }
    }
  },
  created() {
    this.param.debouncedSearch = debounce((e) => this.method.search({value: e.target.value}), 250)
  }
}