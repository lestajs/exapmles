import nodeComponent from '../../../nodeComponent'
import api from '../../../api'

const records_controls = {
	template() {
		const { series_number, version, uts, total, memory } = this.app.data
		return `
		<section>
			<div class="fx gap">
				<button class="back">←</button>
				<h3>Управление записями</h3>
			</div>
		</section>
		<section>
			<div class="fx"><p>Серийный номер</p>${ series_number }</div>
			<div class="fx"><p>Версия прошивки</p>${ version }</div>
			<div class="fx"><p>Часовой пояс</p> ${ uts }</div>
			<div class="fx"><p>Количество записей</p> ${ total }</div>
			<div class="fx"><p>Память</p> ${ memory }%</div>
		</section>
		<section class="fx gap">
			<p>Остановка наблюдений</p>
			<button class="stop btn">Стоп</button>
		</section>
		<section class="fx gap">
			<p>Отчистить список записей</p>
			<button class="clear btn">Отчистить</button>
		</section>`
	},
	nodes() {
		return {
			...nodeComponent.next.bind(this)('back', 'records'),
			...nodeComponent.next.bind(this)('clear', 'records', this.method.clear),
			stop: {
				onclick: () => alert('Успешно остановлено')
			},
		}
	},
	methods: {
		clear() {
			const res = prompt('Для подтверждения удаления всех записей введите количество записей?')
			if (res && Number(res) === Number(this.app.data.total)) {
				api.clearRecords()
			} else {
				if (res !== null) alert('Не верный ввод!')
				return true
			}
		}
	}
}
export { records_controls }