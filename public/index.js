const submitButton = $('.submit-btn')
const sortButton = $('.sort-btn')
const garageDoor = $('.garage-door')
const bubble = $('.bubble')
const itemList = $('.item-list')
let allItems
let sorted = false

const fetchItems = () => {
  fetch('http://localhost:3000/api/items')
    .then(response => response.json())
    .then((response) => {
      allItems = response
      clear()
      displayItems(response.items)
      itemCount(response)
    })
  }

fetchItems()

const clear = () => {
  itemList.empty()
  $('.array-list').empty()
}

const clearList = () => {
  itemList.empty()
}

const clearPopUp = () => {
  $('.indv-info-pop-up').empty()
}

const displayItems = (response) => {
  response.map((el) => {
    itemList.prepend(
      `<p class='indv-item' id=${el.id}>${el.item}<p>`
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

itemList.on('click', '.indv-item', (e) => {
  console.log(e.target.id)
  allItems.items.map((el) => {
    if (el.id == e.target.id) {
      clearPopUp()
      $('.indv-info-pop-up').append(
        `<p>${el.item}</p>
        <p>${el.whyItStays}</p>
        <p>${el.cleanliness}</p>`
      )
    }
  })
})


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

sortButton.on('click', () => {
  if (sorted === false) {
    let sortedFalse = allItems.items.sort((a, b) => {
      if(a.item.toLowerCase() > b.item.toLowerCase()) return -1;
      if(a.item.toLowerCase() < b.item.toLowerCase()) return 1;
    })
    sorted = true
    clearList()
    displayItems(sortedFalse)
  } else {
    let sortedTrue = allItems.items.sort((a, b) => {
      if(a.item.toLowerCase() > b.item.toLowerCase()) return 1;
      if(a.item.toLowerCase() < b.item.toLowerCase()) return -1;
    })
    clearList()
    displayItems(sortedTrue)
    sorted = false
  }
})



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


submitButton.on('click', (e) => {
  e.preventDefault()
  const item = $('.item-input').val()
  const whyItStays = $('.whyItStays-input').val()
  const cleanliness = $('.cleanliness-input').val()
  postItems(item, whyItStays, cleanliness)
  fetchItems()
})
