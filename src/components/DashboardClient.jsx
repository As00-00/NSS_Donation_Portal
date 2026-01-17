"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Heart, Trophy, History, TrendingUp, 
  Calendar, ArrowRight, Star
} from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import ReceiptBtn from "@/components/ReceiptBtn";

export default function DashboardClient({ userName, donations }) {
  const [filter, setFilter] = useState("all"); 

  const totalAmount = donations
    .filter(d => d.status === 'success')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const successfulDonations = donations.filter(d => d.status === 'success').length;

  const getBadgeAndGoal = (amount) => {
    if (amount < 1000) {
      return {
        label: "Bronze Volunteer",
        color: "bg-orange-50 text-orange-700 border-orange-200",
        nextTier: "Silver Guardian",
        remaining: 1000 - amount,
        progress: (amount / 1000) * 100
      };
    }
    if (amount < 5000) {
      return {
        label: "Silver Guardian",
        color: "bg-gray-100 text-gray-700 border-gray-300",
        nextTier: "NSS Gold Patron",
        remaining: 5000 - amount,
        progress: (amount / 5000) * 100
      };
    }
    return {
      label: "NSS Gold Patron",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      nextTier: "Legendary",
      remaining: 0,
      progress: 100
    };
  };

  const status = getBadgeAndGoal(totalAmount);

  const getFilteredData = () => {
    let data = [...donations];
    if (filter === "top5") {
      return data.sort((a, b) => b.amount - a.amount).slice(0, 5);
    }
    if (filter === "top10") {
      return data.sort((a, b) => b.amount - a.amount).slice(0, 10);
    }
    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredDonations = getFilteredData();

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans pb-12">
      
      <div className="bg-[#1a237e] h-64 w-full absolute top-0 left-0 z-0">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 pt-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 text-white">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-2xl border-2 border-white/20 shadow-xl">
                👋
             </div>
             <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}</h1>
                <div className="flex items-center gap-3 mt-1 text-blue-200 text-sm font-medium">
                   <span className={`px-2 py-0.5 rounded text-xs border ${status.color} bg-opacity-90`}>
                      {status.label}
                   </span>
                   <span>•</span>
                   <span>Member since 2026</span>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-3 mt-6 md:mt-0">
             <LogoutButton />
             <Link
                href="/donate"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-6 py-2.5 rounded-full font-bold shadow-lg transition transform hover:-translate-y-1 flex items-center gap-2"
              >
                <Heart size={18} fill="currentColor" /> Donate Now
              </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           
           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between group hover:border-[#1a237e] transition">
              <div>
                 <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Contribution</p>
                 <h3 className="text-3xl font-extrabold text-[#1a237e] mt-1">₹ {totalAmount.toLocaleString()}</h3>
                 <p className="text-xs text-green-600 font-medium mt-2 flex items-center gap-1">
                    <TrendingUp size={14} /> You're making a difference!
                 </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 text-[#1a237e] rounded-full flex items-center justify-center group-hover:bg-[#1a237e] group-hover:text-white transition">
                 <Star size={24} />
              </div>
           </div>

           <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between group hover:border-green-600 transition">
              <div>
                 <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Donations Made</p>
                 <h3 className="text-3xl font-extrabold text-gray-800 mt-1">{successfulDonations}</h3>
                 <p className="text-xs text-gray-400 font-medium mt-2">Thank you for your support</p>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition">
                 <Heart size={24} />
              </div>
           </div>

           <div className="bg-gradient-to-br from-[#1a237e] to-blue-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10">
                 <Trophy size={100} />
              </div>
              <p className="text-blue-200 text-sm font-medium mb-1">Current Status</p>
              <h3 className="text-xl font-bold">{status.label}</h3>
              
              <div className="w-full bg-blue-800 h-1.5 rounded-full mt-4 overflow-hidden">
                 <div 
                    className="bg-yellow-400 h-full transition-all duration-1000 ease-out" 
                    style={{ width: `${status.progress}%` }}
                 ></div>
              </div>
              
              <p className="text-xs text-blue-300 mt-2 font-medium">
                {status.remaining > 0 
                  ? `Donate ₹${status.remaining} more to unlock ${status.nextTier}!`
                  : "You have reached the highest tier!"
                }
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                 
                 <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                       <History size={20} className="text-[#1a237e]" /> Donation History
                    </h2>
                    
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                       {['all', 'top5', 'top10'].map((f) => (
                          <button
                             key={f}
                             onClick={() => setFilter(f)}
                             className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                                filter === f 
                                ? 'bg-white text-[#1a237e] shadow-sm' 
                                : 'text-gray-500 hover:text-gray-700'
                             }`}
                          >
                             {f === 'all' ? 'All History' : f === 'top5' ? 'Top 5' : 'Top 10'}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="overflow-x-auto">
                    {filteredDonations.length === 0 ? (
                       <div className="p-12 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                             <Heart size={30} />
                          </div>
                          <p className="text-gray-500 font-medium">No donations found yet.</p>
                          <Link href="/donate" className="text-[#1a237e] text-sm font-bold hover:underline mt-2 inline-block">Start your journey</Link>
                       </div>
                    ) : (
                       <table className="w-full text-left">
                          <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase tracking-wider font-semibold">
                             <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Receipt</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                             {filteredDonations.map((d, i) => (
                                <tr key={i} className="hover:bg-blue-50/30 transition group">
                                   <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                      {d.date}
                                   </td>
                                   <td className="px-6 py-4 text-sm font-bold text-[#1a237e]">
                                      ₹ {d.amount}
                                   </td>
                                   <td className="px-6 py-4">
                                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                                         ${d.status === 'success' ? 'bg-green-100 text-green-700' : d.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}
                                      `}>
                                         {d.status}
                                      </span>
                                   </td>
                                   <td className="px-6 py-4">
                                      {d.status === 'success' && (
                                         <div className="opacity-60 group-hover:opacity-100 transition">
                                            <ReceiptBtn donation={d} donorName={userName} />
                                         </div>
                                      )}
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    )}
                 </div>
              </div>
           </div>

           <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                 <h3 className="text-gray-800 font-bold mb-4 flex items-center gap-2">
                    <Calendar size={18} className="text-yellow-500" /> Recent Activity
                 </h3>
                 <div className="space-y-4">
                    {donations.slice(0, 4).map((d, i) => (
                       <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                          <div className={`w-2 h-2 mt-2 rounded-full ${d.status === 'success' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                          <div>
                             <p className="text-sm font-medium text-gray-800">
                                Donated <span className="text-[#1a237e] font-bold">₹{d.amount}</span>
                             </p>
                             <p className="text-xs text-gray-400">{d.date}</p>
                          </div>
                       </div>
                    ))}
                    {donations.length === 0 && <p className="text-xs text-gray-400 italic">No recent activity.</p>}
                 </div>
              </div>

              <div className="bg-[#1a237e] rounded-2xl shadow-lg p-6 text-white text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-transparent"></div>
                  <h4 className="font-serif text-xl italic leading-relaxed opacity-90">
                     "Service to others is the rent you pay for your room here on earth."
                  </h4>
                  <p className="text-xs text-blue-300 mt-3 uppercase tracking-widest font-bold">- Muhammad Ali</p>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}