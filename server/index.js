const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const smartContractAPIRoutes = require("./routes/smart-contract-API");
const authRouters = require("./routes/auth-API");


const checkAuth = require('./middleware/checkAuth');

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit:"50mb",
        extended:false,
        parameterLimit:50000
    })
);

app.use("/", authRouters);
app.use("/documents", checkAuth(), smartContractAPIRoutes);

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
});

app.listen(process.env.DAPP_PORT, function(){
    console.log(`Listening to the port ${process.env.DAPP_PORT}`);
});