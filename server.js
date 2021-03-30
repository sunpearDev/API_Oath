const express = require('express')
const cors = require("cors")
const connect = require('./connection.js')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connect.connect((err) => {
    if (err) console.log(err)
    else console.log("Database connect successfully.")
})


const userRouter = require('./routers/user.js')
app.use('/users',userRouter)

   
app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
