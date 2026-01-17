"use server";

import  connectDB  from "@/lib/db";
import Donation from "@/models/donation";
import User from "@/models/user"; 
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAdminDashboardData() {
  try {
    await connectDB();

    
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");

    if (!token) return { success: false, message: "Unauthorized" };

  
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);

    if (payload.role !== "admin") {
      return { success: false, message: "Access Denied: Admins Only" };
    }


    const donations = await Donation.find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    
    const totalAmount = donations.reduce((sum, doc) =>{
        if(doc.status ==='success'){
            return sum + doc.amount
        }
        return sum;
   }, 0)
    const totalDonors = donations.length;

    const plainDonations = donations.map(doc => ({
      id: doc._id.toString(),
      donorName: doc.userId ? doc.userId.name : "Unknown",
      donorEmail: doc.userId ? doc.userId.email : "Unknown",
      amount: doc.amount,
      status: doc.status,
      date: doc.createdAt.toISOString().split('T')[0],
    }));

    return { 
      success: true, 
      stats: { totalAmount, totalDonors }, 
      donations: plainDonations 
    };

  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return { success: false, message: "Server error" };
  }
}