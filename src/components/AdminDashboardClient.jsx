"use client";

import { useState } from "react";
import { 
  LayoutDashboard, Users, Search, 
  ShieldCheck, UserPlus, LogOut, CheckCircle, 
  XCircle, AlertCircle, Phone, Mail 
} from "lucide-react";
import DownloadBtn from "@/components/DownloadBtn";
import { createNewAdmin } from "@/actions/createAdmin";
import  logoutUser  from "@/actions/logout";
import Image from "next/image";

export default function AdminDashboardClient({ stats, donations, users, adminName }) {
  const [activeTab, setActiveTab] = useState("overview"); 
  const [txnSearch, setTxnSearch] = useState("");
  const [txnStatus, setTxnStatus] = useState("all");


  const [userSearch, setUserSearch] = useState("");
  const [userRole, setUserRole] = useState("all");

  
  const filteredDonations = donations.filter(txn => {
    const matchesSearch = txn.donorName.toLowerCase().includes(txnSearch.toLowerCase()) || 
                          txn.donorEmail.toLowerCase().includes(txnSearch.toLowerCase());
    const matchesStatus = txnStatus === "all" || txn.status === txnStatus;
    return matchesSearch && matchesStatus;
  });


  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRole === "all" || u.role === userRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      

      <aside className="w-64 bg-[#1a237e] text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-6 border-b border-blue-900 flex items-center gap-3">
          <div className="bg-white p-1.5 rounded-full">
            <Image src="/nss-logo.png" width={32} height={32} alt="Logo" />
          </div>
          <div>
             <h2 className="font-bold tracking-wide">NSS ADMIN</h2>
             <p className="text-[10px] text-blue-200 uppercase tracking-widest">Govt. of India</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-blue-800 text-white shadow-md' : 'text-blue-200 hover:bg-blue-900'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>

          <button onClick={() => setActiveTab("users")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'users' ? 'bg-blue-800 text-white shadow-md' : 'text-blue-200 hover:bg-blue-900'}`}>
            <Users size={18} /> Volunteers & Users
          </button>
          <button onClick={() => setActiveTab("onboard")} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === 'onboard' ? 'bg-blue-800 text-white shadow-md' : 'text-blue-200 hover:bg-blue-900'}`}>
            <UserPlus size={18} /> Onboard Admin
          </button>
        </nav>

        <div className="p-6 border-t border-blue-900">

           <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold">{adminName?.charAt(0)}</div>
              <div className="overflow-hidden">
                 <p className="text-sm font-medium truncate">{adminName}</p>
                 <p className="text-xs text-green-400 flex items-center gap-1"><ShieldCheck size={10} /> Verified</p>
              </div>
           </div>
           <button onClick={() => logoutUser()} className="w-full flex items-center justify-center gap-2 text-sm text-red-200 hover:text-white hover:bg-red-900/50 py-2 rounded transition"><LogOut size={14} /> Sign Out</button>
        </div>
      </aside>


      <main className="flex-1 ml-64 p-8">
        

        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
               <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
               <div className="text-sm text-gray-500">Real-time Data</div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Total Funds</p>
                    <h3 className="text-3xl font-bold text-[#1a237e] mt-1">₹ {stats.totalAmount.toLocaleString()}</h3>
                 </div>
                 <div className="bg-blue-50 p-3 rounded-lg text-[#1a237e]"><LayoutDashboard size={24} /></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Total Registrations</p>
                    <h3 className="text-3xl font-bold text-gray-800 mt-1">{stats.totalRegistrations}</h3>
                 </div>
                 <div className="bg-purple-50 p-3 rounded-lg text-purple-600"><Users size={24} /></div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                 <div>
                    <p className="text-gray-500 text-xs font-bold uppercase">Active Donors</p>
                    <h3 className="text-3xl font-bold text-green-600 mt-1">{stats.totalDonors}</h3>
                 </div>
                 <div className="bg-green-50 p-3 rounded-lg text-green-600"><ShieldCheck size={24} /></div>
              </div>
            </div>


            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
               <div className="p-5 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4 flex-1">
                     <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input type="text" placeholder="Search donations..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#1a237e] outline-none"
                           value={txnSearch} onChange={(e) => setTxnSearch(e.target.value)} />
                     </div>
                     <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer"
                        value={txnStatus} onChange={(e) => setTxnStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                     </select>
                  </div>
                  <DownloadBtn data={filteredDonations} fileName="NSS_Donations" label="Export Donations" />
               </div>
               
               
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                        <tr><th className="px-6 py-4">Date</th><th className="px-6 py-4">Donor</th><th className="px-6 py-4">Amount</th><th className="px-6 py-4">Status</th></tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredDonations.map((txn, i) => (
                           <tr key={i} className="hover:bg-blue-50/30 transition">
                              <td className="px-6 py-4 text-sm text-gray-600">{txn.date}</td>
                              <td className="px-6 py-4 text-sm font-bold text-gray-800">{txn.donorName}</td>
                              <td className="px-6 py-4 text-sm font-bold text-[#1a237e]">₹ {txn.amount}</td>
                              <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${txn.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{txn.status}</span></td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
          </div>
        )}


        {activeTab === "users" && (
           <div className="space-y-6 animate-in fade-in duration-500">
              <div className="flex justify-between items-center">
                 <div>
                    <h1 className="text-2xl font-bold text-gray-800">Registration Management</h1>
                    <p className="text-sm text-gray-500">View and manage all registered volunteers.</p>
                 </div>
              </div>


              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between gap-4">
                 <div className="flex gap-4 flex-1">
                    <div className="relative flex-1 max-w-sm">
                       <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                       <input 
                          type="text" 
                          placeholder="Search volunteer name or email..." 
                          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#1a237e] outline-none"
                          value={userSearch}
                          onChange={(e) => setUserSearch(e.target.value)}
                       />
                    </div>
                    <select 
                       className="px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer"
                       value={userRole}
                       onChange={(e) => setUserRole(e.target.value)}
                    >
                       <option value="all">All Roles</option>
                       <option value="user">Volunteers</option>
                       <option value="admin">Admins</option>
                    </select>
                 </div>
                 <DownloadBtn data={filteredUsers} fileName="NSS_Volunteers" label="Export Users" />
              </div>

            
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-[#1a237e] text-white text-xs uppercase font-semibold">
                          <tr>
                             <th className="px-6 py-4">Name</th>
                             <th className="px-6 py-4">Contact Info</th>
                             <th className="px-6 py-4">Role</th>
                             <th className="px-6 py-4">Joined Date</th>
                             <th className="px-6 py-4">Status</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {filteredUsers.length === 0 ? (
                             <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400">No users found.</td></tr>
                          ) : (
                             filteredUsers.map((u, i) => (
                                <tr key={i} className="hover:bg-gray-50 transition">
                                   <td className="px-6 py-4">
                                      <div className="flex items-center gap-3">
                                         <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1a237e] flex items-center justify-center font-bold text-xs border border-blue-100">
                                            {u.name.charAt(0)}
                                         </div>
                                         <span className="font-bold text-gray-800 text-sm">{u.name}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <div className="flex flex-col gap-1">
                                         <span className="text-xs text-gray-500 flex items-center gap-1"><Mail size={12}/> {u.email}</span>
                                         <span className="text-xs text-gray-500 flex items-center gap-1"><Phone size={12}/> {u.contact}</span>
                                      </div>
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                         {u.role}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4 text-sm text-gray-600 font-mono">{u.joined}</td>
                                   <td className="px-6 py-4">
                                      <span className="flex items-center gap-1 text-green-600 text-xs font-bold"><CheckCircle size={14} /> Active</span>
                                   </td>
                                </tr>
                             ))
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}


        {activeTab === "onboard" && (
           <div className="max-w-2xl mx-auto mt-10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                 <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#1a237e]"><UserPlus size={32} /></div>
                    <h2 className="text-2xl font-bold text-gray-800">Onboard New Administrator</h2>
                 </div>
                 <AdminOnboardForm />
              </div>
           </div>
        )}
      </main>
    </div>
  );
}

function AdminOnboardForm() {
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState(null);

   async function handleOnboard(e) {
      e.preventDefault();
      setLoading(true);
      setMessage(null);

      const formData = new FormData(e.target);
      const res = await createNewAdmin(formData);
      
      setMessage({ type: res.success ? 'success' : 'error', text: res.message });
      setLoading(false);
      if(res.success) e.target.reset();
   }

   return (
      <form onSubmit={handleOnboard} className="space-y-5">
         {message && (
            <div className={`p-4 rounded-lg text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
               {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
               {message.text}
            </div>
         )}
         
         <div className="grid grid-cols-2 gap-4">
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
               <input name="name" required type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#1a237e] outline-none" placeholder="Admin Name" />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Number</label>
               <input name="contact" required type="tel" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#1a237e] outline-none" placeholder="9876543210" />
            </div>
            <div>
               <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email ID</label>
               <input name="email" required type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#1a237e] outline-none" placeholder="admin@gov.in" />
            </div>
         </div>

         <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Set Password</label>
            <input name="password" required type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#1a237e] outline-none" placeholder="••••••••" />
         </div>

         <div>
            <label className="block text-xs font-bold text-red-500 uppercase mb-1">Master Security Key</label>
            <input name="secretKey" required type="password" className="w-full px-4 py-2 border border-red-200 bg-red-50 rounded-lg focus:border-red-500 outline-none" placeholder="Enter root secret key" />
            <p className="text-[10px] text-gray-400 mt-1">Required to authorize creation of new admins.</p>
         </div>

         <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a237e] hover:bg-blue-900 text-white font-bold py-3 rounded-lg transition shadow-lg disabled:opacity-70"
         >
            {loading ? "Verifying & Creating..." : "Authorize & Create Admin"}
         </button>
      </form>
   );
}