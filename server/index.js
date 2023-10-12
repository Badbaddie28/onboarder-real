const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const app = express()

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200'],
}))
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", routes)


 
mongoose.connect("mongodb+srv://superAdmin:comSuperAdmin@cluster0.2ecyphf.mongodb.net/onboarder?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
 
.then(()=>{
    console.log("connected to db")

    app.listen(5000, ()=> {
        console.log("app is listening on port 5000")
    })
})




