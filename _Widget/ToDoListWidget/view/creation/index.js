import nodeComponent from '../../nodeComponent'

const creation = {
	template() {
		const {
			name = '',
			depth = 0,
			start_datetime,
			end_datetime,
			survey_method = '',
			intervals = ''
		} = this.app.buffer
		return `
		<section>
			<div class="fx gap">
				<button class="back">←</button>
				<h3>Создание новой записи</h3>
			</div>
		</section>
		<section>
			<div class="fx"><p>Имя записи</p><input value="${ name }" name="name" class="name"></div>
			<div class="fx"><p>Глубина установки в М</p><input value="${ depth }" type="number" name="depth" class="depth"></div>
			<div class="fx"><p>Отложенный старт</p><input value="${ start_datetime }" type="datetime-local" name="start_datetime" min="" max="" class="start_datetime"></div>
			<div class="fx"><p>Время остановки</p><input value="${ end_datetime }" type="datetime-local" name="end_datetime" min="" max="" class="end_datetime"></div>
			<div class="fx"><p>Способ опроса</p><input value="${ survey_method }" name="survey_method" class="survey_method"></div>
			<div class="fx"><p>Временные отрезки</p><input value="${ intervals }" name="intervals" class="intervals"></div>
			<div class="fx"><p>Широта N</p><input type="number" name="N" class="N"></div>
			<div class="fx"><p>Долгота E</p><input type="number" name="E" class="E"></div>
			<button class="next btn">Далее</button>
		</section>`
	},
	proxies: {
		coords: {}
	},
	nodes() {
		return {
			name: {},
			depth: {},
			start_datetime: {},
			end_datetime: {},
			survey_method: {},
			intervals: {},
			N: {
				value: () => this.app.buffer?.N || this.proxy.coords?.latitude
			},
			E: {
				value: () => this.app.buffer?.E || this.proxy.coords?.longitude
			},
			...nodeComponent.next.bind(this)('back', 'records'),
			...nodeComponent.next.bind(this)('next', 'confirmation', this.method.next)
		}
	},
	methods: {
		next() {
			const value = (name) => this.node[name].target.value
			const invalid = false
			this.app.buffer = {
				name: value('name'),
				depth: value('depth'),
				start_datetime: value('start_datetime'),
				end_datetime: value('end_datetime'),
				survey_method: value('survey_method'),
				intervals: value('intervals'),
				N: value('N'),
				E: value('E')
			}
			return invalid
		}
	},
	async created() {
		if (Object.keys(this.app.buffer).length !== 0) return
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => this.proxy.coords = position.coords,
					() => alert('Ошибка получения геолокации, заполните поля местоположения вручную!')
				)
			 // console.log(latitude, longitude) // 53.5021093 49.3933642
		} else {
			alert("Геолокация не поддерживается.")
		}
	}
}
export { creation }