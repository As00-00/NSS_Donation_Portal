"use server";

import  connectDB  from "@/lib/db";
import Donation from "@/models/donation";
import User from "@/models/user";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUserDashboardData() {
  try {
    await connectDB();

    
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");

    if (!token) {
      return { success: false, message: "Not authenticated" };
    }


    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    const userId = payload.userId;

    const user = await User.findById(userId).select("name");

    const donations = await Donation.find({ userId: userId }).sort({ createdAt: -1 });

    const plainDonations = donations.map(doc => ({
      amount: doc.amount,
      currency: doc.currency,
      status: doc.status,
      date: doc.createdAt.toISOString().split('T')[0],
      id: doc._id.toString(),
    }));

    return { 
      success: true, 
      userName: user ? user.name : "User", 
      donations: plainDonations 
    };

  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    return { success: false, donations: [] };
  }
}