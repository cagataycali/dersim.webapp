const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('token var bodyde', req.body.token, req.session.decodedToken)
  const user = req.session.decodedToken
  res.render('index', { title: 'Ders.im | Ana sayfa', user })
})

module.exports = router
