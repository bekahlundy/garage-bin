const closeGarage = $('.close-btn')
const submitButton = $('.submit-btn')
const garageDoor = $('.garage-door')
const bubble = $('.bubble')
const itemList = $('.item-list')


const fetchItems = () => {
  fetch('http://localhost:3000/api/items')
    .then(response => response.json())
    .then((response) => {
      clear()
      displayItems(response)
    })
  }
fetchItems()

const clear = () => {
  itemList.empty()
}

const displayItems = (response) => {
  console.log(response)
  response.items.map((el) => {
    itemList.prepend(
        `<p>${el.item}<p>`
)})
}


const postItems = (item, whyItStays, cleanliness) => {
  fetch('http://localhost:3000/api/items', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      item,
      whyItStays,
      cleanliness
    })
  })
}


closeGarage.on('click', () => {
  garageDoor.toggle()
})

submitButton.on('click', (e) => {
  e.preventDefault()
  const item = $('.item-input').val()
  const whyItStays = $('.whyItStays-input').val()
  const cleanliness = $('.cleanliness-input').val()
  postItems(item, whyItStays, cleanliness)
  fetchItems()
})
