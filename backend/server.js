import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
// we will get suport of env file in our project

// app config

const app = express();
const port = process.env.PORT || 4000;
connectDb()
connectCloudinary()

//middlwares

app.use(express.json()); //what request wull be get parsed into json
app.use(cors()); //we cant access backend from any ip

//api end points
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, ()=> {
    console.log("served running at port : " + port);
    
})
