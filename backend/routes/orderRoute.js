import express from 'express';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js';


const orderRouter = express.Router()

orderRouter.post('/list', adminAuth,allOrders) //router for admin panel
orderRouter.post('/status', adminAuth,updateStatus) //router for admin panel


// payment features
orderRouter.post('/place', authUser,placeOrder)
orderRouter.post('/stripe', authUser,placeOrderStripe)
orderRouter.post('/razorpay', authUser,placeOrderRazorpay)

//User feature
orderRouter.post('/userorders', authUser,userOrders )

//verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)


export default orderRouter
