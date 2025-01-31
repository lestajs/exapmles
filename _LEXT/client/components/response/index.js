export default {
	template: `
			<div class="respondTxt" contenteditable="true" dir="auto" aria-label="Введите ответ"></div>
			<div class="buttons"><button class="cancel">Отмена</button><button class="respond">Ответить</button></div>`,
	props: {
		methods: {
			cancel: true,
			respond: true
		}
	},
	nodes() {
		return {
			respondTxt: {},
			cancel: {
				onclick: () => this.method.cancel()
			},
			respond: {
				onclick: () => {
					const text = this.node.respondTxt.target.textContent.trim()
					text && this.method.respond({ text })
				}
			}
		}
	},
	mounted() {
		this.node.respondTxt.target.focus()
	}
}