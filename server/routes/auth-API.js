const express = require("express");
const router = express.Router();

const memberRepo = require("../model/member");

router.post("/login", async (req, res, next) => {
  if (!req.body) {
      res.send(400, { message: 'Address is required.' });
      return next();
  }
  const { address } = req.body;
  if (!address) {
      res.send(400, { message: 'Address is required.' });
      return next();
  }
  const user = await memberRepo.findMemberByAddress(address);
  console.log(user);
  
  if (!user) {
      res.send(400, { message: 'Invalid username and password.' });
      return next();
  }
  const payload = {
      id: user.id,
      address: user.address
  };
  const jwtToken = jwt.sign({ payload });
  res.send({ token: jwtToken });
});

module.exports = router;