import { mountWidget } from 'lesta'

mountWidget({
	template: `<div class="buttons"></div>`,
	params: {
		buttons: [
			{
				name: 'dark',
				icon: `<svg height="16" width="12"><text x="0" y="16">☽</text></svg>`
			},
			{
				name: 'light',
				icon: `<svg height="16" width="12"><text x="0" y="16">☼</text></svg>`
			}
		]
	},
	nodes() {
		return {
			buttons: {
				innerHTML: this.param.buttons.reduce(
					(acc, b) => acc + `<button name="${b.name}">${b.icon}</button>`, ''
				),
				onclick: (e) => {
					const target  = e.target.closest('.buttons > button')
					if (target ) this.method[target .name]() // this.method.dark() or this.method.light()
				}
			}
		}
	},
	methods: {
		dark() {
			alert('Dark Theme')
		},
		light() {
			alert('Light Theme')
		}
	}
}, document.querySelector('#root'))