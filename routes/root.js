const express = require('express')
const router = express.Router()
const path = require('path')


// setting a route
router.get('^/$|index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'clients', 'index.html'))
})
router.get('/newpage(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'clients', 'newpage.html'))
})
router.get('/old-page(.html)?', (req, res) => {
  res.redirect(301, '/newpage.html'); // 302 by default
})

module.exports = router