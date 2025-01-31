import { mountWidget } from 'lesta'
import view from './view'
import api from './api'
import './style.css'

const app = {
	data: {},
	buffer: {},
	widget: null,
	checked: false,
	container: {
		header: document.getElementById('header'),
		main: document.getElementById('main')
	},
	init() {
		if (!navigator.serial) return alert('Ваш браузер или операционная система не по поддерживают Web Serial API!')
		navigator.serial.ondisconnect = async () => await app.disconnect()
		window.onbeforeunload = async () => await app.disconnect()
		window.onunload = async () => await app.disconnect()
		app.view('start')
	},
	async view(name) {
		app.widget?.unmount?.()
		app.widget = await mountWidget({ options: view[name], target: app.container.main }, app)
	},
	async connect() {
		// try {
			app.data = await api.connect(app.checked) // app.checked
			const { battery } = app.data
			const readingsUpdate = async () => {
				const { temp, pressure } = await api.readingsRealtime(app.checked) // app.checked
				app.container.header.innerHTML = `<span>t: ${ temp}</span><span>p: ${ pressure }</span><span>battery: ${ battery }%</span>`
			}
			await readingsUpdate()
			setInterval(readingsUpdate, 1000)
		// } catch(e) {
		// 	alert('Ошибка подключения')
		// 	return true
		// }
	},
	async disconnect() {
		await api.disconnect()
		app.view('start')
		app.data = {}
	}
}
app.init()
