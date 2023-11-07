const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes/routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const app = express()

app.use(cookieParser());

// Allow requests from 'https://onboarder.site'
app.use(cors({
    origin: 'https://localhost:4200',
    methods: 'GET,POST',
    allowedHeaders: 'Access-Control-Allow-Origin',
    credentials: true
}));

app.use(bodyParser.json({limit: '50mb' }));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb', parameterLimit:50000}))
app.use(express.json());
app.use(bodyParser.json());
app.use("/api", routes)


 
mongoose.connect("mongodb+srv://superAdmin:comSuperAdmin@cluster0.2ecyphf.mongodb.net/onboarder?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
 
.then(()=>{
    console.log("connected to db")

    const port = process.env.PORT || 5000;


  //   // Middleware to set the CORS headers
  //   app.use((req, res, next) => {
  //   // Allow requests from 'https://onboarder.site'
  //   res.header('Access-Control-Allow-Origin', 'https://onboarder.site');
  //   // You can also use a wildcard to allow requests from any origin:
  //   // res.header('Access-Control-Allow-Origin', '*');
  
  //   // Define the HTTP methods you want to allow
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
  //   // Define the headers you want to allow
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  //   // Allow credentials, if needed
  //   res.header('Access-Control-Allow-Credentials', 'true');
  
  //   // Handle preflight requests
  //   if (req.method === 'OPTIONS') {
  //     res.sendStatus(204);
  //   } else {
  //     next();
  //   }
  // });
  
    app.listen(port, () => {
        console.log(`App is listening on port ${port}`);
    });
})




