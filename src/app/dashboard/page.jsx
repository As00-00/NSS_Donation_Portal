import { getUserDashboardData } from "@/actions/getDonations";
import { redirect } from "next/navigation";
import DashboardClient from "@/components/DashboardClient"; 

export default async function DashboardPage() {
  const data = await getUserDashboardData();

  if (!data.success) {
    redirect("/login");
  }

  const { userName, donations } = data;
  return <DashboardClient userName={userName} donations={donations} />;
}