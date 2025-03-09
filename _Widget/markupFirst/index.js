import { mountWidget } from 'lesta'
import './style.css'

mountWidget({
	options: {
    proxies: {
    	opened: false,
			isMobile: false
    },
    nodes() {
			return {
				open: {
					onclick: () => this.proxy.opened = true
				},
				close: {
					onclick: () => this.proxy.opened = false
				},
				navbar: {
					selector: '#navbar',
					_attr: {
						inert: () => !this.proxy.opened && this.proxy.isMobile
					},
					_class: {
						opened: () => this.proxy.opened
					}
				},
				links: {
					onclick: (e) => this.proxy.opened = !e.target?.closest('a')
				},
				overlay: {
					onclick: () => this.proxy.opened = false
				}
			}
    },
		created() {
    	const media = window.matchMedia('(width < 600px)')
			const updateMedia = (event) => this.proxy.isMobile = event.matches
			updateMedia(media)
			media.addEventListener('change', updateMedia)
		}
	},
	target: document.querySelector('#menu')
})
