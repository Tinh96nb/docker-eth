const express = require('express')
const router = express.Router()
const contractApi = require('../smart-contract')

router.post('/account', async (req, res, next) => {
  const { amount = 10 } = req.body
  const addressAdmin = res.locals.member.address
  contractApi.createNewAcc({ addressAdmin, amount }, res)
})

module.exports = router
