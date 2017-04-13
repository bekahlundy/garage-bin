const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Garage Bin'
app.locals.items = [
  {id: 1, item: 'Bike', whyItStays: 'I use it all the time for travel', cleanliness:'sparkling'},
  {id: 2, item: 'RollerBlades', whyItStays: 'I use them when I am happy', cleanliness:'dusty'},
]

app.get('/', (request, response) => {
  response.send('Hello World!')
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
  const { item } = request.body
  const id = Date.now()

  if (!item) {
    return response.status(422).send({
      error: 'No item property provided'
    })
  }

  app.locals.items[id] = item

  response.status(201).json({ id, item })
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
