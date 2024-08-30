import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
const port = 8080
app.use(cors())
app.use(bodyParser.json())
app.listen(port, () => console.log(`server running on ${port}`))