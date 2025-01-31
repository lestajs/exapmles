export default {
	props: {
		proxies: {
			auth: {
				type: 'boolean',
				store: 'auth'
			}
		},
		methods: {
			toggleAuth: {
				store: 'auth'
			}
		}
	},
	nodes() {
		return {
			profile: {
				onclick: () => this.method.toggleAuth(),
				_text: () => this.proxy.auth ? 'logout' : 'login'
			}
		}
	}
}