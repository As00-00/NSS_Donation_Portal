"use server";

import Razorpay from "razorpay";
import  connectDB  from "@/lib/db";
import Donation from "@/models/donation";
import User from "@/models/user"; 
import { cookies } from "next/headers";
import { jwtVerify } from "jose"; 

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createRazorpayOrder(amount) {
  try {
    await connectDB();

    
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");
    
    let donorName = "Anonymous";
    let donorEmail = "anonymous@nss.org";
    let userId = null;

    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
        
      
        const user = await User.findById(payload.userId);
        if (user) {
          donorName = user.name;
          donorEmail = user.email;
          userId = user._id;
        }
      } catch (e) {
        console.log("User not logged in or invalid token");
      }
    }

    
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);

    
    const newDonation = new Donation({
      amount: amount,
      currency: "INR",
      orderId: order.id,
      status: "pending",
      userId: userId,     
      name: donorName,    
      email: donorEmail   
    });

    await newDonation.save();

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      keyId: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    console.error("Razorpay Error:", error);
    return { success: false, message: "Could not create order" };
  }
}

export async function verifyRazorpayPayment(response) {
  const crypto = require("crypto");
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await connectDB();
    

    await Donation.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "success", paymentId: razorpay_payment_id }
    );

    return { success: true };
  } else {
    return { success: false };
  }
}