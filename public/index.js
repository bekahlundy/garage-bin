let allItems
let sorted = false

const fetchItems = () => {
  fetch('/api/items')
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
  $('.item-list').empty()
  $('.array-list').empty()
}

const clearList = () => {
  $('.item-list').empty()
}

const clearPopUp = () => {
  $('.indv-info-pop-up').empty()
}

const displayItems = (response) => {
  response.map((el) => {
    $('.item-list').prepend(
      `<p class='indv-item' id=${el.id}>${el.item}<p>`
)})
}

const countArrayLengths = (sparklingArr, dustyArr, rancidArr) => {
  let total = sparklingArr.length + dustyArr.length + rancidArr.length
  $('.array-list').append(
    `<p class='lengths'>sparkling: ${sparklingArr.length}</p>
     <p class='lengths'>dusty: ${dustyArr.length}</p>
     <p class='lengths'>rancid: ${rancidArr.length}</p>
     <p class='lengths'>total: ${total}</p>`
  )
}

$('.item-list').on('click', '.indv-item', (e) => {
  console.log(e.target.id)
  allItems.items.map((el) => {
    if (el.id == e.target.id) {
      clearPopUp()
      $('.indv-info-pop-up').append(
        `<p class='indv-item'>${el.item}</p>
        <p class='indv-why'>${el.whyItStays}</p>
        <p class='indv-clean'>${el.cleanliness}</p>`
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

const sortUp = () => {
  let sortedFalse = allItems.items.sort((a, b) => {
    if(a.item.toLowerCase() > b.item.toLowerCase()) return -1;
    if(a.item.toLowerCase() < b.item.toLowerCase()) return 1;
  })
  sorted = true
  clearList()
  displayItems(sortedFalse)
}

const sortDown = () => {
  let sortedTrue = allItems.items.sort((a, b) => {
    if(a.item.toLowerCase() > b.item.toLowerCase()) return 1;
    if(a.item.toLowerCase() < b.item.toLowerCase()) return -1;
  })
  clearList()
  displayItems(sortedTrue)
  sorted = false
}

$('.sort-btn').on('click', () => {
  if (sorted === false) {
    sortUp()
  } else {
    sortDown()
  }
})



const postItems = (item, whyItStays, cleanliness) => {
  fetch('/api/items', {
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


$('.submit-btn').on('click', (e) => {
  e.preventDefault()
  const item = $('.item-input').val()
  const whyItStays = $('.whyItStays-input').val()
  const cleanliness = $('.cleanliness-input').val()
  postItems(item, whyItStays, cleanliness)
  fetchItems()
})

$('.open-btn').on('click', () => {
  $('.garage-cover').toggleClass('open')
})
