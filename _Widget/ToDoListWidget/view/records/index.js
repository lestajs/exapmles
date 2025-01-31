import nodeComponent from '../../nodeComponent'

const records = {
	template: `
		<section>
			<div class="title">
				<h3>Записи</h3>
				<div class="controls">
					<svg viewBox="0 0 24 24" width="24" height="24" fill="white" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="12" r="2"/><circle cx="12" cy="4.5" r="2"/><circle cx="12" cy="19.5" r="2"/></g></svg>
				</div>
			</div>
			<ul class="items"></ul>
			<button class="create btn">Создать новую запись</button>
		</section>`,
	nodes() {
		return {
			...nodeComponent.next.bind(this)('controls', 'records_controls'),
			...nodeComponent.next.bind(this)('create', 'creation'),
			...nodeComponent.items(this.app.data.records, ['name', 'start_datetime', 'total'], this.method.active)
		}
	},
	methods: {
		active(item) {
			this.app.buffer = item
			this.app.view('details')
		}
	},
	created() {
		this.app.buffer = {}
	}
}
export { records }