"use server";

import Razorpay from "razorpay";
import  connectDB  from "@/lib/db";
import Donation from "@/models/donation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import crypto from "crypto";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createRazorpayOrder(amount) {
  try {
    await connectDB();
    

    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");
    if (!token) return { success: false, message: "Unauthorized" };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const userId = payload.userId;


    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);


    const newDonation = new Donation({
      userId: userId,
      amount: amount,
      currency: "INR",
      status: "pending", 
      paymentMethod: "Razorpay",
      transactionId: order.id 
    });

    await newDonation.save();

    return { 
      success: true, 
      orderId: order.id, 
      amount: order.amount, 
      keyId: process.env.RAZORPAY_KEY_ID 
    };

  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return { success: false, message: "Could not initiate payment" };
  }
}

export async function verifyRazorpayPayment(data) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;


  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  
  if (expectedSignature === razorpay_signature) {
    
    
    await connectDB();
    await Donation.findOneAndUpdate(
      { transactionId: razorpay_order_id },
      { 
        status: "success", 
        paymentMethod: "Razorpay" 
      }
    );
    return { success: true };

  } else {
    await connectToDB();
    await Donation.findOneAndUpdate(
      { transactionId: razorpay_order_id },
      { status: "failed" }
    );
    return { success: false, message: "Payment verification failed" };
  }
}