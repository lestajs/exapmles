import component from './app'
import tasks from './stores/tasks'
import notices from './stores/notices'
import { createApp, createStores } from 'lesta'

const app = createApp({
  selectors: (name) => '.' + name.replace('_', '-'),
  rootContainer: {},
  // directives: {} global directives
})

createStores(app, { tasks, notices })

// const stores = createStores(app, { tasks, notices })
// stores.init('tasks').then(() => {
// app.mount(component, root)
// })

app.mount(component, document.querySelector('#root'))

