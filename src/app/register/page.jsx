"use client";

import { useState } from "react";
import { registerUser } from "@/actions/register"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { User, Mail, Phone, Lock, ShieldCheck, UserPlus, AlertCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const result = await registerUser(formData);

    if (result.success) {
      router.push("/login"); 
    } else {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      

      <div className="hidden md:flex w-1/2 bg-[#1a237e] text-white flex-col justify-between p-12 relative overflow-hidden">
        
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 C 50 100 50 0 100 100 V 0 H 0 Z" fill="currentColor"/>
            </svg>
        </div>


        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
             <div className="bg-white p-2 rounded-full shadow-lg">
                <Image src="/nss-logo.png" width={40} height={40} alt="NSS Logo" className="object-contain" />
             </div>
             <span className="font-bold tracking-widest uppercase text-sm opacity-90">National Service Scheme</span>
          </div>
          <h1 className="text-5xl font-extrabold leading-tight mb-6">
            Join the <br/> Movement. <br/> <span className="text-yellow-400">Be the Change.</span>
          </h1>
          <p className="text-blue-100 max-w-sm leading-relaxed text-lg">
            Register today to become a part of the nation's largest youth volunteer network. Not Me, But You.
          </p>
        </div>


        <div className="relative z-10 flex items-center gap-3 text-sm text-blue-200 bg-blue-900/30 p-4 rounded-xl backdrop-blur-sm border border-blue-800">
           <UserPlus size={24} className="text-yellow-400" />
           <div>
             <p className="font-semibold text-white">New Volunteer Registration</p>
             <p className="text-xs">Open for all students</p>
           </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        

        <div className="absolute top-6 left-6 md:hidden">
             <Image src="/nss-logo.png" width={40} height={40} alt="NSS Logo" />
        </div>

        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                <p className="text-gray-500 text-sm">Join us to start your journey of service</p>
            </div>


            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                   <AlertCircle className="text-red-500 mt-0.5" size={18} />
                   <div>
                      <h4 className="text-sm font-bold text-red-800">Registration Failed</h4>
                      <p className="text-xs text-red-600 mt-1">{error}</p>
                   </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="name" 
                            type="text" 
                            required 
                            placeholder="John Doe"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            placeholder="student@college.edu"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Mobile Number</label>
                    <div className="relative group">
                        <Phone className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="contact" 
                            type="tel" 
                            required 
                            placeholder="98765 43210"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            placeholder="Create a strong password"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>


                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full mt-4 bg-[#1a237e] hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-[0.98] disabled:opacity-70 disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating Account...
                        </span>
                    ) : "Complete Registration"}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-500 text-sm">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#1a237e] font-bold hover:underline">
                        Sign In Here
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}