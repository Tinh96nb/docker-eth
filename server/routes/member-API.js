const express = require('express')
const router = express.Router()
const memberRepo = require('../models/member')

router.post('/me', async (req, res, next) => {
  const address = res.locals.member.address
  const user = await memberRepo.findMemberByAddress(address)
  if (!user) {
    res.status(400).json({ message: `You don't have permission to access!` })
    return next()
  }
  res.json({ profile: user })
})

module.exports = router
