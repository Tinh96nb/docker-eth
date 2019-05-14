const express = require("express");
const router = express.Router();
const logic = require("../../ethereum/logic");
const ipfsClient = require('ipfs-http-client');

const ipfs = ipfsClient('172.22.0.1', '5001', { protocol: 'http' })


router.get("/", async (req,res,next) => {
    logic.newdoc(res);
})


// router.get("/", async (req,res,next) => {
//     let message = 'ds'
//     res.send(message);
// })

router.post("/all", async (req,res,next) => {
    const content = ipfs.Buffer.from('ABC')
    const results = await ipfs.add(content)
    res.send(results);
})


router.get("/all", async (req, res, next) => {
    let message = await logic.getAllBlock();
    res.send(message);
})

module.exports = router;