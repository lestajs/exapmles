import { mountWidget } from 'lesta'

/* Web Component */
class Button extends HTMLElement {
	static get observedAttributes() {
		return ['disabled']
	}
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.innerHTML = `<button>${this.textContent}</button>`
		this.btn = this.shadowRoot.querySelector('button')
		this.btn.onclick = () => this.dispatchEvent(new CustomEvent('clicked'))
	}
	attributeChangedCallback(name) {
		if (name !== 'disabled') return
		this.btn.disabled = this.hasAttribute('disabled')
	}
}
customElements.define('w-button', Button)

/* Lesta Widget */

const widget = {
	template: `<w-button class="prev">-</w-button>
             <span class="result"></span>
             <w-button class="next">+</w-button>`,
	proxies: {
		count: 0
	},
	nodes() {
		return {
			prev: {
				_attr: {
					disabled: () => this.proxy.count === 0,
				},
				_event: {
					clicked: () => this.proxy.count--
				}
			},
			result: {
				_text: () => this.proxy.count
			},
			next: {
				_attr: {
					disabled: () => this.proxy.count === 5,
				},
				_event: {
					clicked: () => this.proxy.count++
				}
			}
		}
	}
}
mountWidget(widget, document.querySelector('#root'))