import { mountWidget } from 'lesta'

mountWidget({
	options: {
    template: `
    <button class="prev">-</button>
    <span class="result"></span>
    <button class="next">+</button>`,
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
					disabled: () => this.proxy.count === 5
				}
			}
    }
	},
	target: document.querySelector('#root')
})