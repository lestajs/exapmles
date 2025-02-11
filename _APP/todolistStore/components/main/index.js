import header from '../header'
import card from '../card'
import search from '../search'
import menu from '../menu'
import notification from '../notification'
import controls from '../controls'
import total from '../total'
import { mapProps } from 'lesta'

export default {
  template: `
    <div class="header"></div>
    <div class="notifications"></div>
    <div class="cards"></div>
    <div class="bottom-panel"></div>`,
  props: {
    proxies: {
      ...mapProps(['tasks', 'loading', 'isModify'], { store: 'tasks' })
    },
    methods: {
      ...mapProps(['addTask', 'searchTasks', 'filterTasks'], { store: 'tasks' })
    }
  },
  sources: {
    modify: () => import('../modify'),
  },
  nodes() {
    return {
      header: {
        component: {
          src: header,
          spots: {
            start: {
              component: {
                src: search,
                methods: {
                  search: ({ value }) => {
                    this.method.searchTasks({ value })
                  }
                }
              }
            },
            end: {
              component: {
                src: menu
              }
            }
          }
        }
      },
      notifications: {
        component: {
          src: notification
        }
      },
      bottom_panel: { // global selector function in createApp
        component: {
          src: total
        }
      },
      cards: {
        _class: {
          loading: () => this.proxy.loading
        },
        component: {
          src: card,
          // async: true,
          // aborted: (v) => {},
          // completed: () => {},
          // portion: 12,
          iterate: () => this.proxy.tasks,
          proxies: {
            card: ({ index }) => this.proxy.tasks[index]
          },
          spots: {
            bottom: {
              // node properties supported
              component: {
                src: controls,
                proxies: {
                  card: ({ parent }) => this.proxy.tasks[parent.index]
                },
                spots: {
                  buttons: {
                    component: {
                      induced: () => this.proxy.isModify,
                      src: this.source.modify,
                      proxies: {
                        card: ({ parent }) => this.proxy.tasks[parent.parent.index]
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
