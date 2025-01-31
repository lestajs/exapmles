import nodeComponent from '../../nodeComponent'

const start = {
	template: `
		<section class="start">
			<img class="logit_mini" src="${require('../../images/logit_mini.svg')}">
			<img class="logit" src="${require('../../images/logit.svg')}">
			<label>
				<input type="checkbox" class="checkbox">температуры и давления реального устройства
			</label>
			<button class="connect btn">Connect</button>
		</section>`,
		nodes() {
		return {
			checkbox: {
				onchange: (e) => this.app.checked = e.target.checked
			},
			...nodeComponent.next.bind(this)('connect', 'records', this.app.connect)
		}
	}
}

export { start }