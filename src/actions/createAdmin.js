"use server";

import  connectDB  from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function createNewAdmin(formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const contact = formData.get("contact");
    const secretKey = formData.get("secretKey");


    const cookieStore = await cookies();
    const token = cookieStore.get("session_token");
    if (!token) return { success: false, message: "Unauthorized" };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token.value, secret);
    if (payload.role !== "admin") return { success: false, message: "Access Denied" };

    
    if (secretKey !== process.env.CREATE_ADMIN_SECRET_KEY) {
      return { success: false, message: "Invalid Security Key" };
    }

    await connectDB();


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new User({
      name,
      email,
      contact,
      password: hashedPassword,
      role: "admin", 
      requiresSecretKey: true 
    });

    await newAdmin.save();

    return { success: true, message: "New Administrator Onboarded" };

  } catch (error) {
    console.error("Admin Creation Error:", error);
    return { success: false, message: "Server Error" };
  }
}