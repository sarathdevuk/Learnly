import Course from '../models/courseModel.js' 
import Order from '../models/orderModel.js' ;
import User from '../models/userModel.js' ;
import Stripe from 'stripe';

// Created stripe with secrete key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

export async function doPayment (req , res) {
    const userId = req.userId ;
    const courseId  = req.body.courseId ; 

    try {
// finding the user details
      const user = await User.findById({ _id  : userId}) 
// checking the user status ban or not
      if(user.status) {
        const course = await Course.findById({ _id : courseId}) 
         if(course) { 
          // if Its Free Course directly creating the Order 
           console.log(course.isFree ," free coourse");
             if(course?.isFree){
                const order = await Order.create({
                  total : course.price , 
                  course : courseId,
                  user : userId,
                  tutor : course.tutor,
                  address : {line : req.body.address , pincode : req.body.pincode } ,
                  purchase_date  :Date.now() 
                })
                if(order) {

                  res.status(200).json({status:true , message : 'order placed successfully'})
                }else {
                  res.status(500).json({ status : false ,  message : "Order Failed"})
                }
              
           }else {

// Creating New Order with user , tutor , and course Details
          const newOrder = new Order({ 
            total : course.price , 
            course : courseId,
            user : userId,
            tutor : course.tutor,
            address : {line : req.body.address , pincode : req.body.pincode } ,
            purchase_date  :Date.now() 
    
          })
          newOrder.save().then(async( orderResponse ) =>{  
            console.log("orderResp id",orderResponse._id);
            //Creating stripe checkout session with payment details
             const session = await stripe.checkout.sessions.create({

              line_items: [
                {
                  price_data: {
                    currency: "inr",
                    // providing course details with amount
                    product_data: {
                      name: course.name,
                      // images: [
                      //   "http://localhost:5000/images/course/thumbnail/1687932320627-2776760_f176_10.jpg"
                      // ],
                      images: [`${process.env.BASE_URL + course.image.path.replace(/\\/g, '/')}`],
                    },
                    unit_amount: course.price * 100,
                  },
                  quantity: 1,
                },
              ],
              mode : "payment" ,
              // setting customer email with user email
              customer_email: user.email ,
              // Setting The payment success routes and cancel routes
              success_url: `${process.env.BASE_URL}/verifyPayment/${orderResponse._id}` ,
              cancel_url: `${process.env.BASE_URL}/cancel-payment/${orderResponse._id}` , 
     
          })
          console.log("session created" , session);
          // Passing the session url to the client 
          res.json({ url: session.url , orderId: orderResponse._id })
          }).catch((err) => {
            console.log(err);
            // res.status(500).json({ status: false, message: "Internal server error" });
            res.redirect(`${process.env.CLIENT_URL}/course-payment/${courseId}`)
          })
        }
         } else {
          res.redirect(`${process.env.CLIENT_URL}/course-payment/${courseId}`);
    
         }
    
      }
    } catch (error) {
      console.log(error);
        //  res.status(500).json({ status: false, message: "Internal server error" });
         res.redirect(`${process.env.CLIENT_URL}/course-payment/${courseId}`);

    }


}

// Payment verification 
export async function verifyPayment (req , res ) {
  console.log("orderSucces verify payment");
try {
  // findinf the order  and updating the order status
  const order = await Order.findById({ _id: req.params.orderId})
    if(order) {
      Order.findByIdAndUpdate({ _id: req.params.orderId} , {
        $set: { 
          status: true
        }
      }).then((response)=> {
          // res.status(200).json({ status: true , message:"OrderSucces" })
          res.redirect(`${process.env.CLIENT_URL}/order-success`);
      }).catch((err)=> {
        console.log(err);
      })
    }else{
      res.redirect(`${process.env.CLIENT_URL}/course-payment/${order.courseId}`);

    }
                           
} catch (error) {
  res.redirect(`${process.env.CLIENT_URL}/course-payment/${order.courseId}`);

}

} 

// if Patment cancel 
export async function cancelOrder (req , res) {
   console.log("cancel order @$#@$#@$#@$#@$#@$#@$");
  try {
    // Deleting the Order if the payment is cancelled
    Order.findByIdAndDelete({ _id : req.params.orderId}).then((response)=> {
      console.log(response);
      if(response) {
        // After deleting Order redirect to the payment page
        res.redirect(`${process.env.CLIENT_URL}/order-failed`)
      }else{
        res.redirect(`${process.env.CLIENT_URL}/order-failed`)
      }
    })
  } catch (error) {
    console.log(error);
    res.redirect(`${process.env.CLIENT_URL}/course-payment/${response.course}`);
  }
}
