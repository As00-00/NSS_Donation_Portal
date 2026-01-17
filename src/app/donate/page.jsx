"use client";

import { useState } from "react";
import { createRazorpayOrder, verifyRazorpayPayment } from "@/actions/razorpay";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import { Heart, ShieldCheck, Gift, ArrowLeft, ArrowRight } from "lucide-react";

export default function DonatePage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const presets = [100, 500, 1000, 2000];

  async function handlePayment(e) {
    e.preventDefault();
    setLoading(true);

    if (!amount || amount < 1) {
      alert("Please enter a valid amount");
      setLoading(false);
      return;
    }

    const orderData = await createRazorpayOrder(amount);

    if (!orderData.success) {
      alert("Error creating order. Check console.");
      setLoading(false);
      return;
    }

    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: "INR",
      name: "NSS Donation",
      description: "Social Service Fund",
      order_id: orderData.orderId,
      handler: async function (response) {
        const verification = await verifyRazorpayPayment(response);
        if (verification.success) {
          router.push("/dashboard");
        } else {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "NSS Volunteer",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#1a237e",
      },
    };

    const rzp1 = new window.Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert("Payment Failed: " + response.error.description);
      setLoading(false);
    });

    rzp1.open();
  }

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="hidden md:flex w-1/2 bg-[#1a237e] relative overflow-hidden flex-col justify-between p-12 text-white">
         <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
        </div>

        <div className="relative z-10">
            <Link href="/dashboard" className="inline-flex items-center text-blue-200 hover:text-white transition mb-8 text-sm font-semibold">
                <ArrowLeft size={16} className="mr-2" /> Back to Dashboard
            </Link>
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                    <Heart size={32} className="text-yellow-400" fill="currentColor" />
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight">Support the Mission</h1>
            </div>
            <p className="text-blue-100 text-lg leading-relaxed max-w-md">
                "We make a living by what we get, but we make a life by what we give."
            </p>
        </div>

        <div className="relative z-10 space-y-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Gift size={20} className="text-yellow-400" /> Why Donate?
                </h3>
                <ul className="space-y-3 text-sm text-blue-100">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        Funds go directly to village adoption programs.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        Support education for underprivileged children.
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                        100% transparency with instant digital receipts.
                    </li>
                </ul>
            </div>
            <p className="text-xs text-blue-300 opacity-80">
                Secure Payment Gateway • 256-bit SSL Encryption
            </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 relative">
          <div className="absolute top-6 left-6 md:hidden">
            <Link href="/dashboard" className="flex items-center text-gray-500 hover:text-[#1a237e] text-sm font-bold">
                 <ArrowLeft size={16} className="mr-1" /> Back
            </Link>
          </div>

          <div className="w-full max-w-md">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1a237e] to-blue-600"></div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Make a Contribution</h2>
                    <p className="text-gray-500 text-sm mt-1">Choose an amount to donate</p>
                </div>

                <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Select Amount</label>
                        <div className="grid grid-cols-4 gap-3 mb-4">
                            {presets.map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setAmount(val)}
                                    className={`py-2 px-1 rounded-lg text-sm font-bold transition-all border ${
                                        amount == val
                                        ? "bg-[#1a237e] text-white border-[#1a237e] shadow-md transform scale-105"
                                        : "bg-white text-gray-600 border-gray-200 hover:border-[#1a237e] hover:text-[#1a237e]"
                                    }`}
                                >
                                    ₹{val}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Custom Amount</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-4 text-gray-400 font-bold group-focus-within:text-[#1a237e]">₹</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#1a237e] focus:ring-4 focus:ring-blue-50 outline-none transition font-bold text-lg text-gray-800 placeholder-gray-300"
                                placeholder="Enter other amount"
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#1a237e] hover:bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-[0.98] disabled:opacity-70 disabled:transform-none flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            <>
                                <span>Proceed to Pay</span>
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>Verified Secure Payment by Razorpay</span>
                </div>
            </div>
          </div>
      </div>
    </div>
  );
}