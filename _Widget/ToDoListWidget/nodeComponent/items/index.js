function items(items, keys, callback) {
	return {
		items: {
			innerHTML: () => items?.reduce((a, e, i) => a + `<li class="item" data-index="${i}">${ keys?.reduce((a, k) => a + `<span>${e[k]}</span>`, '') }</li>`, `<li>${keys?.reduce((a, k) => a + `<span>${k}</span>`, '')}</li>`) || 'Пусто',
			onclick: (event) => {
				const target = event.target.closest('.item')
				if (!target) return
				callback?.(items[+target.dataset.index])
			}
		}
	}
}

export { items }