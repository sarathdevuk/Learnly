import Course from '../models/courseModel.js' 
import Order from '../models/orderModel.js' ;
import User from '../models/userModel.js' ;
import Stripe from 'stripe';

const stripe = Stripe("sk_test_51NP0HpSJ1eocLkA8KOoWu4r7r5x1DitO7th92UwQgAEzxNmJIhiaWJagEJlNm3oVBEGRhf3ZRv86FyjY3Cl73k9K00ssw4dvYE")

export async function doPayment (req , res) {
    const userId = req.userId ;
    const courseId  = req.body.courseId ; 

    try {

      const user = await User.findById({ _id  : userId}) 

      if(user.status) {
        const course = await Course.findById({ _id : courseId}) 
         if(course) {
          const newOrder = new Order({ 
            total : course.price , 
            course : courseId,
            user : userId,
            tutor : course.tutor,
            address : {line : req.body.address , pincode : req.body.pincode } ,
            purchase_date  :Date.now() 
    
          })
          newOrder.save().then(async( orderResponse ) =>{  
             const session = await stripe.checkout.sessions.create({
              // line_items : [
              //  {
              //   currency : "inr",
              //   name:course.name ,
              //   images: [`${process.env.BASE_URL+course.image.path}`],
              //   amount: course.price * 100,
              //   quantity: 1,
    
              //  } 
              // ], 
              line_items: [
                {
                  price_data: {
                    currency: "inr",
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
              customer_email: user.email ,
              success_url: `${process.env.BASE_URL}/verifyPayment/${orderResponse._id}` ,
              cancel_url: `${process.env.BASE_URL}/cancel-payment/${orderResponse._id}` , 
     
          })
          console.log("session created" , session);
          res.json({ url: session.url })
          }).catch((err) => {
            console.log(err);
            res.status(500).json({ status: false, message: "Internal server error" });
          })
    
         } else {
          res.redirect(`${process.env.CLIENT_URL}/course-payment/${courseId}`);
    
         }
    
      }
    } catch (error) {
      console.log(error);
         res.status(500).json({ status: false, message: "Internal server error" });
    }


}


export async function verifyPayment (req , res ) {
console.log("veriofyPayment");
try {
  const order = await Order.findById({ _id: req.params.orderId})
    if(order) {
      Order.findByIdAndUpdate({ _id: req.params.orderId} , {
        $set: { 
          status: true
        }
      }).then((response)=> {
          res.status(200).json({ status: true , message:"OrderSucces" })
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


export async function cancelOrder (req , res) {
   console.log("cancel order");
  try {
    Order.findByIdAndDelete({ _id : req.params.orderId}).then((response)=> {
      console.log(response);
      if(response) {
        res.redirect(`${process.env.CLIENT_URL}/course-payment/${response.course}`)
      }else{
        res.redirect(`${process.env.CLIENT_URL}/course-payment/${response.course}`);
      }
    })
  } catch (error) {
    console.log(error);
    res.redirect(`${process.env.CLIENT_URL}/course-payment/${response.course}`);
  }
}
