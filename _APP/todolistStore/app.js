import './styles/index.css'
import main from './components/main'
import dialog from './components/dialog'

export default {
  template: `
    <div class="wrapper">
      <div class="popup"></div>
      <main></main>
    </div>`,
  directives: { // local directives
    _teleport: {
      create: (node, value) => value.append(node.target)
    }
  },
  props: {
    methods: {
      addTask: { store: 'tasks' },
      editTask: { store: 'tasks' }
    }
  },
  actions: ['createForm'],
  sources: {
    addForm: () => import('./components/form'),
    editForm: () => import('./components/form'),
  },
  nodes() {
    return {
      popup: {
        _teleport: document.body,
        component: {
          src: dialog,
          methods: {
            onclose: () => {
              // return true // stop closing
            }
          },
          spots: {
            content: {
              component: {} // for later mounting
            }
          }
        }
      },
      main: {
        selector: 'main',
        component: {
          src: main
        }
      }
    }
  },
  methods: {
    createForm({ mode, data }) {
      this.node.popup.spot.content.mount({ // this.proxy.uncompleted = false
        src: this.source[mode + 'Form'],
        params: { data },
        methods: {
          save: (task) => {
            if (mode === 'edit') {
              this.method.editTask({ task })
            } else {
              this.method.addTask({ task })
            }
            this.node.popup.action.close()
          }
        }
      })
      // this.node.popup.spot.content.unmount() // if necessary
      // this.node.popup.action.show()
    }
  },
  loaded() {
    this.app.rootContainer = this.container
  },
  created() {},
  rendered() {},
  mounted() {},
  unmounted() {},
  refreshed() {}
}