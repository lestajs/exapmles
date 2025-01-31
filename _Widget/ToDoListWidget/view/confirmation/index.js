import nodeComponent from '../../nodeComponent'

const confirmation = {
	template() {
		const { name, depth, start_datetime, end_datetime, survey_method, intervals, N, E } = this.app.buffer
		return `
		<section>
			<div class="fx gap">
				<button class="back">←</button>
				<h3>Проверка данных</h3>
			</div>
		</section>
		<section>
			<p>Внимательно проверьте данные, после отправки их нельзя будет изменить.</p>
		</section>
		<section>
			<div class="fx"><p>Имя записи</p>${ name }</div>
			<div class="fx"><p>Глубина установки М</p>${ depth }</div>
			<div class="fx"><p>Отложенный старт</p>${ start_datetime }</div>
			<div class="fx"><p>Время остановки</p>${ end_datetime }</div>
			<div class="fx"><p>Способ опроса</p>${ survey_method }</div>
			<div class="fx"><p>Временные отрезки</p>${ intervals }</div>
			<div class="fx"><p>Широта N</p>${ N }</div>
			<div class="fx"><p>Долгота E</p>${ E }</div>
			<button class="create btn">${ start_datetime ? 'Создать с отложенным стартом' : 'Начать наблюдения сейчас' }</button>
		</section>`
	},
	nodes() {
		return {
			...nodeComponent.next.bind(this)('back', 'creation'),
			...nodeComponent.next.bind(this)('create', 'records', this.method.create)
		}
	},
	methods: {
		create() {
			const record = this.app.buffer
			record.total = 0
			record.start_datetime = this.app.buffer.start_datetime || new Date()
			record.readings = []
			this.app.data.records.push(record)
		}
	}
}
export { confirmation }