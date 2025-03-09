import api from '../../api'

export default {
  params: {
    controller: null
  },
  proxies: {
    tasks: [],
    loading: true,
    isCompleted: false,
    isModify: false
  },
  middlewares: {
    async addTask({ task }) {
      const { description, name } = task
      return { task: await api.addTask(description, name) }
    },
    async editTask({ task }) {
      await api.editTask(task)
    },
    async removeTask({ id }) {
      await api.removeTask(id)
    },
    async completeTask({ id }) {
      await api.completeTask(id)
    }
  },
  methods: {
    addTask({ task }) {
      this.proxy.tasks.unshift(task)
    },
    removeTask({ id }) {
      const index = this.proxy.tasks.findIndex(e => e.id === id)
      this.proxy.tasks.splice(index, 1)
    },
    editTask({ task }) {
      const index = this.proxy.tasks.findIndex(e => e.id === task.id)
      this.proxy.tasks[index] = task
    },
    completeTask({ id }) {
      const index = this.proxy.tasks.findIndex(e => e.id === id)
      this.proxy.tasks[index].completed = !this.proxy.tasks[index].completed
    },
    async searchTasks({ value }) {
      this.proxy.loading = true
      this.proxy.isCompleted = false
      this.param.controller.abort()
      this.param.controller = new AbortController()
      api.getTasks(this.param.controller.signal).then(data => {
        this.proxy.tasks = data.filter(task => task.name.toLowerCase().includes(value.toLowerCase()))
        this.proxy.loading = false
      }).catch(_ => {})
    },
    filterTasks() {
      this.proxy.isCompleted = !this.proxy.isCompleted
      this.proxy.loading = true
      this.param.controller.abort()
      this.param.controller = new AbortController()
      api.getTasks(this.param.controller.signal).then(data => {
        this.proxy.tasks = this.proxy.isCompleted ? data.filter(task => task.completed === this.proxy.isCompleted) : data
        this.proxy.loading = false
      }).catch(_ => {})
    },
    changeMode() {
      this.proxy.isModify = !this.proxy.isModify
    }
  },
  async loaded() {
    await api.connect()
    this.options.proxies.tasks = new Array(30).fill({ id: null, completed: false, description: null, name: null})
  },
  created() {
    this.param.controller = new AbortController()
    api.getTasks(this.param.controller.signal).then(tasks => {
      this.proxy.tasks = tasks
      this.proxy.loading = false
    }).catch(_ => {})
  }
}