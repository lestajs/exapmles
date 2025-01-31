import nodeComponent from '../../../nodeComponent'
import api from '../../../api'

const details_controls = {
	template() {
		const { name, total, depth, start_datetime, end_datetime, survey_method, intervals, N, E } = this.app.buffer
		return `
		<section>
			<div class="fx gap">
				<button class="back">←</button>
				<h3>Управление наблюдениями</h3>
			</div>
		</section>
		<section>
			<div class="fx"><p>Имя записи</p>${ name }</div>
			<div class="fx"><p>Глубина в М</p>${ depth }</div>
			<div class="fx"><p>Время старта наблюдений</p>${ start_datetime }</div>
			<div class="fx"><p>Время окончания наблюдений</p> ${ end_datetime }</div>
			<div class="fx"><p>Способы опроса</p> ${ survey_method }</div>
			<div class="fx"><p>Временные отрезки</p> ${ intervals }</div>
			<div class="fx"><p>Широта N</p>${ N }</div>
			<div class="fx"><p>Долгота E</p> ${ E }</div>
			<div class="fx"><p>Количество показаний</p> ${ total }</div>
		</section>
		<section class="fx gap">
			<p>Экспорт в CSV</p>
			<button class="export btn">Экспортировать</button>
		</section>`
	},
	nodes() {
		return {
			...nodeComponent.next.bind(this)('back', 'details'),
			export: {
				onclick: () => alert('Экспорт выполнен')
			}
		}
	}
}
export { details_controls }