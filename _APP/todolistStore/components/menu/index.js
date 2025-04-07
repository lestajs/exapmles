import './index.css'
import { mapProps } from 'lesta'

export default {
  template:
    `<div class="menu">
      <button class="filter"></button>
      <button class="add"></button>
      <button class="mode"></button>
    </div>`,
  props: {
    proxies: {
      ...mapProps(['isCompleted', 'isModify'], { store: 'tasks' })
    },
    methods: {
      ...mapProps(['filterTasks', 'changeMode'], { store: 'tasks' })
    }
  },
  nodes() {
    return {
      filter: {
        _text: () => this.proxy.isCompleted ? 'Hide completed' : 'Show completed',
        onclick: () => this.method.filterTasks()
      },
      add: {
        _text: 'Add Task',
        onclick: () => this.app.rootContainer.action.createForm({ mode: 'add' })
      },
      mode: {
        _text: () => this.proxy.isModify ? ' Edit Off' : ' Edit On',
        onclick: () => this.method.changeMode()
      }
    }
  }
}