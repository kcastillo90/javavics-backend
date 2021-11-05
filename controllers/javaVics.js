const express = require('express')
const router = express.Router()
const Coffee = require('../models/coffee.js')

router.get('/', (req, res) => {
  Coffee.find({}, (err, foundCoffee) => {
    res.json(foundCoffee)
  })
})

router.post('/', (req, res) => {
  Coffee.create(req.body, (err, createdCoffee) => {
    res.json(createdCoffee)
  })
})

router.delete('/:id', (req, res) => {
  Coffee.findByIdAndRemove(req.params.id, (err, deletedCoffee) => {
    res.json(deletedCoffee)
  })
})

router.put('/:id', (req, res) => {
  Coffee.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedCoffee) => {
    res.json(updatedCoffee)
  })
})

module.exports = router
