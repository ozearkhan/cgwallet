const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mainRouter = require ("./routes/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1",mainRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3000,()=>{
    console.log("Listening on port 3000");
});

