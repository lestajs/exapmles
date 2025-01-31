const { createApp, createRouter, createStores } = window.lesta
import routes from './routes/index.js'
import general from './layouts/general/index.js'
import auth from './store/index.js'

const app = createApp()

createStores(app, { auth })

const router = createRouter(app, {
	routes,
	layouts: {
		general
	}
})

router.init(document.querySelector('#root'))



