const jwt = require('../helps/jwt')
const memberRepo = require('../models/member')

module.exports = checkAuth()

function checkAuth (req, res, next) {
  return async (req, res, next) => {
    if (!req.headers || !req.headers.authorization) {
      res.status(400).json({ message: 'Token is required!' })
      return false
    }
    const token = jwt.verify(req.headers.authorization.split(' ')[1])
    // check valid token
    if (!token) {
      res.status(400).json({ message: 'Token is invalid!' })
      return false
    }
    // check in database
    const { payload } = token
    const mem = await memberRepo.findMemberByAddress(payload.address)
    if (!mem) {
      res.status(403).json({ message: `You don't have permission to access` })
      return false
    }
    res.locals.member = mem
    return next()
  }
}
