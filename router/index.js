const express = require('express')
const router = express.Router()
const quoteController = require('../controllers/quoteController')

router.get('/', (req, res) => {
    res.send('hello')
})

router.get('/fetch', quoteController.fetch)
router.get('/all', quoteController.findAll)
router.post('/quote', quoteController.create)
router.put('/quote/:id', quoteController.editQuote)
router.delete('/quote/:id', quoteController.deleteQuote)

module.exports = router