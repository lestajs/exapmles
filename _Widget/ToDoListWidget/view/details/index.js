import nodeComponent from '../../nodeComponent'

const details = {
	template() {
		return `
	<section>
		<div class="title gap">
			<div class="fx gap">
				<button class="back">←</button>
				<h3>${ this.app.buffer.name }</h3>
			</div>
			<div class="controls">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="2"/><circle cx="12" cy="4.5" r="2"/><circle cx="12" cy="19.5" r="2"/></g></svg>
			</div>
		</div>
	</section>
	<section>
		график
	</section>
	<section>
		<ul class="items"></ul>
	</section>`},
		nodes() {
		return {
			...nodeComponent.next.bind(this)('controls', 'details_controls'),
			...nodeComponent.next.bind(this)('back', 'records'),
			...nodeComponent.items(this.app.buffer.readings, ['temp', 'pressure', 'datetime'])
		}
	}
}
export { details }