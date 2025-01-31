import comment from '../../components/comment/index.js'

export default {
	params: {
		post: {}
	},
	nodes() {
		return {
			comments: {
				component: {
					src: comment,
					iterate: () => this.param.post.comments,
					proxies: {
						comment: ({ index }) => this.param.post.comments[index]
					}
				}
			}
		}
	},
	async created() {
		const response = await fetch(`/api/post/${this.app.router.to.params.id}`)
		this.param.post = await response.json()
	}
}