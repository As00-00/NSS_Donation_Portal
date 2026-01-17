"use server";

import  connectDB  from "@/lib/db";
import Donation from "@/models/donation";
import User from "@/models/user"; // 
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getAdminDashboardData() {
  try {

    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");
    if (!token) return { success: false, message: "Unauthorized" };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    if (payload.role !== "admin") return { success: false, message: "Access Denied" };

    await connectDB();

  
    const donations = await Donation.find().sort({ createdAt: -1 });
    const totalAmount = donations
      .filter(d => d.status === 'success')
      .reduce((acc, curr) => acc + curr.amount, 0);

    const successfulDonations = donations.filter(d => d.status === 'success');
    const uniqueDonors = new Set(successfulDonations.map(d => d.email)).size;


    const users = await User.find({}).sort({ createdAt: -1 });
    

    const plainDonations = donations.map(d => ({
      id: d._id.toString(),
      donorName: d.name || "Anonymous",
      donorEmail: d.email,
      amount: d.amount,
      status: d.status,
      date: d.createdAt.toISOString().split('T')[0],
    }));

    
    const plainUsers = users.map(u => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      contact: u.contact || "N/A",
      role: u.role,
      joined: u.createdAt.toISOString().split('T')[0],
    }));

    return {
      success: true,
      stats: {
        totalAmount,
        totalDonors: uniqueDonors,
        totalRegistrations: users.length, 
      },
      donations: plainDonations,
      users: plainUsers, 
    };

  } catch (error) {
    console.error("Admin Data Error:", error);
    return { success: false, message: "Server Error" };
  }
}