const express = require('express')
//const morgan = require('morgan')

const app = express()

//
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]

///greetings/<username-parameter>
app.get('/greetings/:username', (req, res) => {
  res.send(`What a delight it is to see you once more, ${req.params.username}.`)
})
///roll/<number-parameter>
app.get('/roll/:num', (req, res) => {
  if (parseInt(req.params.num)) {
    let rollNum = Math.floor(Math.random() * req.params.num)
    res.send(`You rolled a ${rollNum}.`)
  } else {
    res.send('You must specify a number.')
  }
})
//collectibles
app.get('/collectibles/:index', (req, res) => {
  if (parseInt(req.params.index) || parseInt(req.params.index) === 0) {
    if (req.params.index < collectibles.length) {
      res.send(
        `So, you want the ${collectibles[req.params.index].name}? For ${
          collectibles[req.params.index].price
        }, it can be yours!`
      )
    } else {
      res.send('This item is not yet in stock. Check back soon!')
    }
    let rollNum = Math.floor(Math.random() * req.params.num)
    res.send(`You rolled a ${rollNum}.`)
  } else {
    res.send('You must specify a number.')
  }
})

//shoes
app.get('/shoes', (req, res) => {
  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice
  const type = req.query.type
  let filteredShoes = shoes

  if (minPrice && !maxPrice) {
    filteredShoes =  filteredShoes.filter((item) => item.price >= minPrice)
  } else if (!minPrice && maxPrice) {
    filteredShoes =  filteredShoes.filter((item) => item.price <= maxPrice)
  } else if (minPrice && maxPrice) {
    filteredShoes =  filteredShoes.filter((item) => item.price <= maxPrice && item.price >= minPrice)
  }

  if (type){
    filteredShoes =  filteredShoes.filter((item) => item.type === type)
  }
  
  //show result
  res.send(filteredShoes)
})

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log('Listening on port 3000')
})
