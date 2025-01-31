function next(name, screen, callback) {
	return {
		[name]: {
			onclick: async () => {
				if (await callback?.()) return
				this.app.view(screen)
			}
		}
	}
}

export { next }