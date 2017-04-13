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
      itemCount(response)
    })
  }
fetchItems()

const clear = () => {
  itemList.empty()
  $('.array-list').empty()
}

const displayItems = (response) => {
  response.items.map((el) => {
    itemList.prepend(
        `<p>${el.item}<p>`
)})
}

const countArrayLengths = (sparklingArr, dustyArr, rancidArr) => {
  let total = sparklingArr.length + dustyArr.length + rancidArr.length
  $('.array-list').append(
    `<p>sparkling: ${sparklingArr.length}</p>
     <p>dusty: ${dustyArr.length}</p>
     <p>rancid: ${rancidArr.length}</p>
     <p>total: ${total}</p>`
  )
}


const itemCount = (response) => {
  let sparklingArr = []
  let dustyArr = []
  let rancidArr = []
  response.items.map((el) => {
    if(el.cleanliness == 'sparkling') {
      sparklingArr.push(el.cleanliness)
    } else if (el.cleanliness == 'dusty') {
      dustyArr.push(el.cleanliness)
    } else {
      rancidArr.push(el.cleanliness)
    }
  })
  countArrayLengths(sparklingArr, dustyArr, rancidArr)
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
