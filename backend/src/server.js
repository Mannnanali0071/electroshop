
import express from "express"
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import authRoutes from './routes/authRoutes.js'
import orderRoutes from './routes/orderRoutes.js'


//Load env variables
dotenv.config()


const app = express()
const PORT = process.env.PORT || 5001


//Middleware
app.use(express.json())
app.use(morgan('dev'))   // use "dave" for colorized logs
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}))
app.use('/uploads', express.static('public/uploads'))



//Routes
app.use('/api/products/', productRoutes)
app.use('/api/categories/', categoryRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/orders/', orderRoutes)



//start server after DBconnect
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server started on port ", PORT)
    })
  })




  