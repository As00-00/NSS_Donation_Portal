"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");

  redirect("/login");
}