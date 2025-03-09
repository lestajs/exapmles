import './index.css'

export default {
  template() {
    const idName = this.id()
    const idDesc = this.id()
    return `
      <div>
        <label for="${idName}">Name</label>
        <input id="${idName}" class="name" placeholder="Name" type="text">
      </div>
      <div>
        <label for="${idDesc}">Description</label>
        <input id="${idDesc}" class="desc" placeholder="Description" type="text">
      </div>
      <button class="save green">Save</button>`
  },
  props: {
    params: {
      data: {}
    },
    methods: {
      save: {}
    },
  },
  nodes() {
    return {
      name: {
        value: this.param.data?.name ?? ''
      },
      desc: {
        value: this.param.data?.description ?? ''
      },
      save: {
        onclick: () => {
          const { name, desc } = this.node
          this.method.save({
            completed: this.param.data?.completed,
            description: desc.target.value,
            id: this.param.data?.id,
            name: name.target.value
          })
        }
      }
    }
  },
  mounted() {
    this.node.name.target.focus()
  }
}