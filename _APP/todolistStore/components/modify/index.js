import { mapProps } from 'lesta'
import button from '../button'

export default {
  template: `
      <template class="remove"></template>
      <template class="edit"></template>`,
  props: {
    proxies: {
      card: {},
    },
    methods: {
      // editTask: { store: 'tasks' },
      // removeTask: { store: 'tasks' }
      ...mapProps(['editTask', 'removeTask'], { store: 'tasks' }),
      addNotice: { store: 'notices' }
    }
  },
  nodes() {
    return {
      remove: {
        component: {
          src: button,
          params: {
            className: 'remove'
          },
          proxies: {
            text: 'remove'
          },
          methods: {
            action: () => {
              this.method.removeTask({ id: this.proxy.card.id })
              this.method.addNotice({ text: `${ this.proxy.card.name }: removed` })
            }
          }
        }
      },
      edit: {
        component: {
          src: button,
          params: {
            className: 'edit'
          },
          proxies: {
            text: 'edit'
          },
          methods: {
            action: () => this.app.rootContainer.action.createForm({ mode: 'edit', data: this.proxy.card })
          }
        }
      }
    }
  }
}
