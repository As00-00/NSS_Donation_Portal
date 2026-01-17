export const dynamic = 'force-dynamic';
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
  let adminName = "Administrator";



  return (
    <AdminDashboardClient 
       stats={data.stats} 
       donations={data.donations} 
       users={data.users} 
       adminName={adminName} 
    />
  );
}