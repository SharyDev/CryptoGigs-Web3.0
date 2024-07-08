import createError from '../utils/createError.js'
import Order from '../models/order.model.js'
import Gig from '../models/gig.model.js'


// export const intent = async (req, res, next) => {

//   const stripe = new Stripe(process.env.STRIPE);

//   const gig = await Gig.findById(req.params.id);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: gig.price * 100,
//     currency: "inr",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   const newOrder = new Order({
//     gigId: gig._id,
//     img: gig.cover,
//     title: gig.title,
//     buyerId: req.userId,
//     sellerId: gig.userId,
//     price: gig.price,
//     payment_intent: paymentIntent.id,
//   });

//   await newOrder.save();

//   res.status(200).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// }

export const intent = async (req, res, next) => {
  
  try {
    
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
      return res.status(404).send({ message: "Gig not found" });
    }

    const ethTransactionId = req.body.ethTransactionId;  // Make sure this is being sent from the frontend
   
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,  // Ensure this is being set correctly
      sellerId: gig.userId,
      price: gig.price,
      paymentIntent: ethTransactionId,  // Store Ethereum transaction ID as payment intent
    });

    await newOrder.save();
    res.status(201).send({
      message: "Order created successfully",
      order: newOrder
    });

  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}
// export const getOrders = async (req, res, next) => {
//   try {
    
//     const orders = await Order.find({
//       ...(req.sellerId ? { sellerId: req.userId } : { buyerId: req.userId }),
//       isCompleted: true
//     })
//     res.status(200).send(orders);
//   } catch (err) {
//     next(err)
//   }
// }


export const getOrders = async (req, res, next) => {
  try {
    const { role, isCompleted } = req.query; // Get role and isCompleted from query parameters
    const query = {
      [role === 'seller' ? 'sellerId' : 'buyerId']: req.userId,
      isCompleted: isCompleted === 'true' // Convert query string to boolean
    };

    const orders = await Order.find(query);
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};



// export const getOrders = async (req, res, next) => {
//   try {

//     consol.log("--->");
//    // const { userId, sellerId } = req.user;

//    console.log("Fetching orders for user:", req.user);

//    const { userId, sellerId } = req.user;
//     const orders = await Order.find({
//       ...(req.sellerId ? { sellerId: req.userId } : { buyerId: req.userId }),
//       isCompleted: true
//     })
//     res.status(200).send(orders);
//   } catch (err) {
//     next(err)
//   }
// }
export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate({
      payment_intent: req.body.payment_intent,
    },
    {
      $set: {
        isCompleted: true,
      },},
    );
    res.status(200).send('orders has been confirmed');
  } catch (err) {
    next(err)
  }
}