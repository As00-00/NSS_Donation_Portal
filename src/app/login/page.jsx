"use client";

import { useState } from "react";
import { loginUser } from "@/actions/login"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, User, Lock, Key, AlertCircle } from "lucide-react"; 

export default function LoginPage() {
  const router = useRouter();
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const result = await loginUser(formData);

    if (result.success) {
      if (result.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      setError(result.message);
      if (result.errorType === "KEY_REQUIRED") {
        setShowSecretKey(true);
      }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
    
      <div className="hidden md:flex w-1/2 bg-[#1a237e] text-white flex-col justify-between p-12 relative overflow-hidden">
        

        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 50 0 50 100 100 0 V 100 H 0 Z" fill="currentColor"/>
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
            Empower. <br/> Serve. <br/> <span className="text-yellow-400">Inspire.</span>
          </h1>
          <p className="text-blue-100 max-w-sm leading-relaxed text-lg">
            Welcome to the centralized volunteer management portal. Your contribution drives national development.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-blue-200 bg-blue-900/30 p-4 rounded-xl backdrop-blur-sm border border-blue-800">
           <ShieldCheck size={24} className="text-yellow-400" />
           <div>
             <p className="font-semibold text-white">Secure Access</p>
             <p className="text-xs">Authorized Personnel Only</p>
           </div>
        </div>
      </div>


      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
        

        <div className="absolute top-6 left-6 md:hidden">
             <Image src="/nss-logo.png" width={40} height={40} alt="NSS Logo" />
        </div>

        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                <p className="text-gray-500 text-sm">Please enter your details to sign in</p>
            </div>


            {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r shadow-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                   <AlertCircle className="text-red-500 mt-0.5" size={18} />
                   <div>
                      <h4 className="text-sm font-bold text-red-800">Authentication Failed</h4>
                      <p className="text-xs text-red-600 mt-1">{error}</p>
                   </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Email Address</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="email" 
                            type="email" 
                            required 
                            placeholder="volunteer@nss.org"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>


                <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                        <label className="text-xs font-bold text-gray-600 uppercase tracking-wide">Password</label>
                        <a href="#" className="text-xs text-[#1a237e] font-semibold hover:underline">Forgot password?</a>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-[#1a237e] transition-colors" size={18} />
                        <input 
                            name="password" 
                            type="password" 
                            required 
                            placeholder="••••••••"
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition duration-200 font-medium"
                        />
                    </div>
                </div>


                <div className="flex justify-end pt-2">
                    <button 
                        type="button" 
                        onClick={() => setShowSecretKey(!showSecretKey)}
                        className={`text-xs font-bold flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 ${showSecretKey ? 'text-red-600' : 'text-[#1a237e]'}`}
                    >
                        {showSecretKey ? (
                           <>✕ Close Admin Login</>
                        ) : (
                           <><Key size={14} /> Admin Login</>
                        )}
                    </button>
                </div>


                {showSecretKey && (
                    <div className="animate-in slide-in-from-top-2 fade-in duration-300">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 shadow-inner">
                            <label className="block text-xs font-bold text-yellow-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Key size={12} /> Administrator Key
                            </label>
                            <input 
                                name="secretKey" 
                                type="password" 
                                className="w-full px-4 py-2 bg-white border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-sm placeholder-yellow-300"
                                placeholder="Enter secure key" 
                            />
                        </div>
                    </div>
                )}


                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-[#1a237e] hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-[0.98] disabled:opacity-70 disabled:transform-none"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                        </span>
                    ) : "Sign In to Portal"}
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-gray-500 text-sm">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-[#1a237e] font-bold hover:underline">
                        Register as Volunteer
                    </Link>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}