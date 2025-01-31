import db from './db.json' assert { type: "json" }
import express from 'express'
import hbs  from 'hbs'
import path from 'node:path'
import fs from 'node:fs'
const __dirname = path.resolve()

const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname + `/LEXT/client`)))
app.set('views', __dirname +`/LEXT/server/views`)
hbs.registerPartials(__dirname + '/LEXT/server/views/partials')


app.get('/', (req, res) => {
	res.render('index.hbs', { title: 'home', home: true, ...db.post })
})
app.get('/post/:postId', (req, res) => {
	res.render('index.hbs', db.post)
})

// REST API
app.get('/api/post/:postId', (req, res) => {
	res.send(db.post)
})
app.post('/api/comment/:postId/:commentId', (req, res) => {
	const username = 'My NickName'
	const text = req.body.text
	const file = fs.readFileSync(__dirname + '/LEXT/server/views/partials/comment.hbs', 'utf-8')
	const template = hbs.compile(file)
	const content = template({ username, text })
	const data = { username, text, replies: [] }
	res.send({ data, content })
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server started at http://localhost:${ port }`))