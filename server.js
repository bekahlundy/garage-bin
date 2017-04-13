const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const md5 = require('md5')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Garage Bin'
app.locals.counter = 3
app.locals.items = [
  {id: 1, item: 'Bike', whyItStays: 'I use it all the time for travel', cleanliness:'sparkling'},
  {id: 2, item: 'RollerBlades', whyItStays: 'I use them when I am happy', cleanliness:'dusty'},
]

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/items', (request, response) => {
  const items = app.locals.items
  response.json({ items })
})


app.get('/api/items/:id', (request, response) => {
  const { id } = request.params
  const item = app.locals.items.map((el) => {
    if(el.id == id) {
       response.json(el)
    }
  })
  if (!item) {
    return response.status(404).send({
      error: 'item id does not exist'
    })
  }

  response.json({ id, item })
})

app.post('/api/items', (request, response) => {
  const id = app.locals.counter++
  const { item, whyItStays, cleanliness } = request.body
  const newItem = { id, item, whyItStays, cleanliness }
  console.log(newItem)

  app.locals.items.push(newItem)
  if(!item) {
    response.status(422).send('Did not receive correct body params')
  } else {
    response.json(newItem)
  }
  })


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
