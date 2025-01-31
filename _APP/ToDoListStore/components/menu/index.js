import './index.css'
import { mapProps } from 'lesta'

export default {
  template:
    `<div class="menu">
      <div class="count"></div>
      <div class="buttons">
        <button class="filter blue"></button>
        <button class="add green"></button>
        <button class="mode"></button>
      </div>
    </div>`,
  props: {
    proxies: {
      ...mapProps(['isCompleted', 'isModify'], { store: 'tasks' })
    },
    methods: {
      ...mapProps(['filterTasks', 'changeMode'], { store: 'tasks' })
    }
  },
  sources: {
    count: () => import('../count'),
  },
  nodes() {
    return {
      count: {
        component: {
          src: this.source.count,
          induced: () => this.proxy.isCompleted
        }
      },
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