import { mountWidget } from 'lesta'

mountWidget({
	template: `
	<button class="prev">-</button>
	<span class="result"></span>
	<button class="next">+</button>`,
	params: {
		max: 5
	},
	proxies: {
		count: 0
	},
	nodes() {
		return {
			result: {
				textContent: () => this.proxy.count
			},
			prev: {
				onclick: () => this.proxy.count--,
				disabled: () => this.proxy.count === 0
			},
			next: {
				onclick: () => this.proxy.count++,
				disabled: () => this.proxy.count === this.param.max
			}
		}
	}
}, document.querySelector('#root'))