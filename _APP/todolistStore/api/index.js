import { delayRace } from 'lesta'

export default {
	DB: [],
	async update() {
		await localStorage.setItem('tasks', JSON.stringify(this.DB))
	},
	async connect() {
		const db = await localStorage.getItem('tasks')
		this.DB = db ? JSON.parse(db) : []
		return this.DB
	},
	async getTasks(signal) {
		await delayRace(2000, signal)
		return this.DB
	},
	async addTask(description, name) {
		const task = { id: Date.now(), completed: false, description, name }
		this.DB.unshift(task)
		await this.update()
		return task
	},
	async editTask(task) {
		const index = this.DB.findIndex(e => e.id === task.id)
		this.DB[index] = task
		await this.update()
		return task
	},
	async removeTask(id) {
		this.DB = this.DB.filter(e => e.id !== id)
		await this.update()
	},
	async completeTask(id) {
		const index = this.DB.findIndex(e => e.id === id)
		this.DB[index].completed = !this.DB[index].completed
		await this.update()
	}
}