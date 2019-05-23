const express = require('express')
const router = express.Router()
const contractApi = require('../smart-contract')
const categoryRepo = require('../models/category')

router.post('/account', async (req, res, next) => {
  const { amount = 10 } = req.body
  const addressAdmin = res.locals.member.address
  contractApi.createNewAcc({ addressAdmin, amount }, res)
})

router.post('/categories/', async function createCategory (req, res, next) {
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Name is required!' })
  }
  try {
    const result = await categoryRepo.createCategory({ name })
    const category = await categoryRepo.getCategoryById(result)
    return res.json(category)
  } catch (error) {
    res.status(400).json({ message: 'Can not create category!' })
  }
})

router.delete('/categories/:id', async function deleteCategory (req, res, next) {
  const { id } = req.params
  const category = await categoryRepo.getCategoryById(id)
  if (!category) { res.status(400).json({ message: 'Not found categrory id!' }) }
  const result = await categoryRepo.deleteCategory(id)
  if (!result) { return res.status(400).json({ message: 'Can not delete category!' }) }
  return res.json(id)
})

router.put('/categories/:id', async function updateCategory (req, res, next) {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).json({ message: 'Name is required!' })
  }
  const category = await categoryRepo.getCategoryById(id)
  if (!category) { res.status(400).json({ message: 'Not found categrory id!' }) }
  const result = await categoryRepo.updateCategory(id, { name })
  if (!result) { return res.status(400).json({ message: 'Can not update category!' }) }

  const infoNew = await categoryRepo.getCategoryById(id)
  return res.json(infoNew)
})

module.exports = router
