"use server"; 

import connectDB  from "@/lib/db";
import User from "@/models/user";    
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password") as string;
    const contact = formData.get("contact");

    if (!name || !email || !password || !contact) {
      return { success: false, message: "All fields are required!" };
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: "Email already registered!" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      contact,
    });

    await newUser.save();

    return { success: true, message: "User registered successfully!" };

  } catch (error) {
    console.error("Registration Error:", error);
    return { success: false, message: "Server error. Please try again." };
  }
}