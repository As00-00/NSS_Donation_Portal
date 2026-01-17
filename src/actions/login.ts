"use server";

import connectDB from "@/lib/db";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers"; 

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const secretKey = formData.get("secretKey"); 

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "Invalid credentials" };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    if (user.requiresSecretKey) {
      if (!secretKey) {
        return { success: false, errorType: "KEY_REQUIRED", message: "Admin access requires a Secret Key" };
      }
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return { success: false, message: "Invalid Secret Key!" };
      }
    }


    const payload = { 
      userId: user._id.toString(), 
      role: user.role 
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key");

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1d') 
      .sign(secret);


    (await cookies()).set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });


    return { 
      success: true, 
      message: "Login Successful!",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        id: user._id.toString() 
      }
    };

  } catch (error) {
    console.error("Login Error:", error);
    return { success: false, message: "Something went wrong." };
  }
}