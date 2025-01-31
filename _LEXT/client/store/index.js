export default {
	proxies: {
		auth: JSON.parse(localStorage.getItem('auth'))
	},
	methods: {
		toggleAuth() {
			this.proxy.auth = !this.proxy.auth
			localStorage.setItem('auth', this.proxy.auth)
		}
	}
}