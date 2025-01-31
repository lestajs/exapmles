import comment from '../../components/comment/index.js'
import response from '../../components/response/index.js'

export default {
	props: {
		proxies: {
			auth: {
				type: 'boolean',
				store: 'auth'
			},
			comment: {},
		}
	},
	proxies: {
		showResponse: false
	},
	nodes() {
		return {
			respond: {
				hidden: () => !this.proxy.auth,
				onclick: () => this.proxy.showResponse = !this.proxy.showResponse
			},
			response: {
				component: {
					induced: () => {
						const auth = this.proxy.auth
						const showResponse = this.proxy.showResponse
						return auth && showResponse
					},
					src: response,
					methods: {
						cancel: () => this.proxy.showResponse = false,
						respond: async ({ text }) => {
							const response = await fetch(`/api/comment/${this.app.router.to.params.id}/${this.proxy.comment.id}`, {
								method: 'Post',
								body: JSON.stringify({ text }),
								headers: { 'Content-Type': 'application/json' }
							})
							const { data, content } = await response.json()
							comment.template = content
							this.proxy.comment.replies.push(data)
							this.proxy.showResponse = false
						}
					}
				}
			},
			replies: {
				hidden: () => !this.proxy.comment.replies.length,
				component: {
					src: comment,
					iterate: () => this.proxy.comment.replies,
					proxies: {
						comment: ({ index }) => this.proxy.comment.replies[index]
					}
				}
			}
		}
	}
}