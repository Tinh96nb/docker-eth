const express = require("express");
const router = express.Router();
const jwt = require("../helps/jwt");
const memberRepo = require("../models/member");

router.post("/login", async (req, res, next) => {
  if (!req.body) {
      res.status(400).json({ message: 'Address is required.' });
      return next();
  }
  const { address } = req.body;
  if (!address) {
      res.status(400).json({ message: 'Address is required.' });
      return next();
  }
  const user = await memberRepo.findMemberByAddress(address);
  if (!user) {
    res.status(400).json({ message: `You don't have permission to access!`});
    return next();
  }
  const payload = {
      id: user.id,
      address: user.address
  };
  const jwtToken = jwt.sign({ payload });
  res.json({ token: jwtToken });
});

module.exports = router;