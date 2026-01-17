import { getAdminDashboardData } from "@/actions/getAdminData";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export default async function AdminDashboard() {
  
  const data = await getAdminDashboardData();

  if (!data.success) {
    redirect("/login");
  }


  const cookieStore = await cookies();
  const token = cookieStore.get("session_token");
  let adminName = "Admin";
  
  if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
      } catch (e) {}
  }

  const { stats, donations } = data;

  return (
    <AdminDashboardClient 
       stats={stats} 
       donations={donations} 
       adminName={adminName} 
    />
  );
}