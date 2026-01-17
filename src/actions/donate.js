"use server";

import connectDB from "@/lib/db";
import Donation from "@/models/donation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache"; 

export async function createDonation(formData) {
  try {
    const amount = formData.get("amount");
    const paymentMethod = formData.get("paymentMethod");


    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");
    if (!token) return { success: false, message: "Unauthorized" };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const userId = payload.userId;

    await connectDB();

    
    const mockTransactionId = "TXN_" + Date.now() + Math.floor(Math.random() * 1000);

    const newDonation = new Donation({
      userId: userId,
      amount: amount,
      currency: "INR",
      status: "success", 
      paymentMethod: paymentMethod,
      transactionId: mockTransactionId
    });

    await newDonation.save();

    revalidatePath("/dashboard");

    return { success: true, message: "Donation successful!" };

  } catch (error) {
    console.error("Donation Error:", error);
    return { success: false, message: "Failed to process donation." };
  }
}