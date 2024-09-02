import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes"
import taskRouter from "./routes/tasks.routes"
const app = express()
const port = 8080

mongoose.connect('mongodb+srv://manish393:manish393@cluster0.vlwjc.mongodb.net/tasksMangement?retryWrites=true&w=majority&appName=Cluster0')
      .then((res) => {
            console.log(res.connection.host)
      })


app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/tasks", taskRouter)
app.listen(port, () => console.log(`server running on ${port}`))