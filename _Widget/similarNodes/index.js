import { mountWidget } from 'lesta'

function addToNode(name, change, checkedItems = {}) {
	return {
		[name]: {
			selector: `[name=${name}]`,
			checked: () => checkedItems[name],
			onchange: (event) => change(event.target.checked, name)
		}
	}
}
mountWidget({
	options: {
		template: `
    <label><input type="checkbox" name="all">all</label>
    <label><input type="checkbox" name="first">first</label>
    <label><input type="checkbox" name="second">second</label>`,
		proxies: {
			selectAll: false,
			checkedItems: {
				first: false,
				second: true
			}
		},
		nodes() {
			const { toggleAll, changeItem } = this.method
			const { checkedItems } = this.proxy
			return {
				...addToNode('all', toggleAll),
				...addToNode('first', changeItem, checkedItems),
				...addToNode('second', changeItem, checkedItems)
			}
		},
		methods: {
			changeItem(checked, name) {
				this.proxy.checkedItems[name] = checked
			},
			toggleAll(checked) {
				Object.keys(this.proxy.checkedItems).forEach(key => this.proxy.checkedItems[key] = checked)
				this.proxy.selectAll = checked
			}
		}
	},
	target: document.querySelector('#root')
})