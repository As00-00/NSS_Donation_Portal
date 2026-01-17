import Link from "next/link";
import Image from "next/image";
import { Heart, Users, BookOpen, Leaf, ArrowRight, ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <header className="bg-[#1a237e] text-white shadow-lg sticky top-0 z-50 border-b border-blue-900">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-1 shadow-md border-2 border-yellow-400">
              <Image 
                src="/nss-logo.png" 
                width={50} 
                height={50} 
                alt="NSS Logo" 
                className="object-contain"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold tracking-wide leading-tight">NATIONAL SERVICE SCHEME</h1>
              <p className="text-xs text-yellow-300 font-medium tracking-widest uppercase">Government of India</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium hover:text-yellow-300 transition px-4 py-2"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 text-sm font-bold py-2 px-6 rounded-full transition shadow-md flex items-center gap-2"
            >
              Join Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <section className="relative bg-[#1a237e] text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="absolute right-0 top-0 h-full w-1/2 text-white/10" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
           </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-block bg-blue-800 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-700 mb-2">
              NOT ME, BUT YOU
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Empowering Youth <br />
              <span className="text-yellow-400">Building Nation</span>
            </h2>
            <p className="text-lg text-blue-100 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Join the largest student youth volunteer network. Contribute to social welfare, 
              community service, and national development. Your small step creates a big impact.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link 
                href="/register" 
                className="bg-white text-[#1a237e] hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-1"
              >
                Become a Volunteer
              </Link>
              <Link 
                href="/login" 
                className="border border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white font-semibold py-4 px-8 rounded-lg transition"
              >
                Volunteer Login
              </Link>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg">
            <div className="aspect-video bg-blue-800/50 rounded-2xl border-4 border-white/20 shadow-2xl flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-transparent opacity-80 z-10"></div>
               <Image 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop" 
                  alt="NSS Volunteers"
                  fill
                  className="object-cover"
               />
               <div className="absolute bottom-6 left-6 z-20 text-left">
                  <p className="font-bold text-xl">Community Service</p>
                  <p className="text-sm text-blue-200">Village Adoption Program 2025</p>
               </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-blue-900 p-4 rounded-xl shadow-lg font-bold">
               <span className="block text-2xl">50+</span>
               <span className="text-xs uppercase">Years of Service</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-[#1a237e] font-bold uppercase tracking-wider text-sm mb-2">Our Core Areas</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How We Make a Difference</h2>
            <div className="w-20 h-1 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                <Leaf size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Environment Protection</h4>
              <p className="text-gray-600 leading-relaxed">
                Tree plantation drives, cleanliness campaigns (Swachh Bharat), and plastic-free village initiatives.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition">
                <Heart size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Health & Hygiene</h4>
              <p className="text-gray-600 leading-relaxed">
                Organizing blood donation camps, health checkups, and immunization awareness in rural areas.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition">
                <BookOpen size={28} />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-3">Education & Literacy</h4>
              <p className="text-gray-600 leading-relaxed">
                Adult literacy programs, tuition for underprivileged children, and digital literacy workshops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1a237e] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-blue-800">
          <div className="p-4">
            <div className="text-4xl font-bold text-yellow-400 mb-2">1.2k+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wide">Volunteers</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wide">Villages Adopted</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-yellow-400 mb-2">₹15L+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wide">Funds Raised</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-bold text-yellow-400 mb-2">200+</div>
            <div className="text-sm text-blue-200 uppercase tracking-wide">Camps Organized</div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <ShieldCheck className="mx-auto text-[#1a237e] mb-6" size={48} />
          <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 italic leading-relaxed mb-8">
            "The main aim of the National Service Scheme is to provide hands-on experience to young students in delivering community service."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
             <div className="h-px w-12 bg-gray-300"></div>
             <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">NSS Motto: Not Me But You</p>
             <div className="h-px w-12 bg-gray-300"></div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
          
          <div className="space-y-4">
            <h5 className="text-white font-bold text-lg">National Service Scheme</h5>
            <p>Ministry of Youth Affairs & Sports<br/>Government of India</p>
          </div>

          <div>
            <h5 className="text-white font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-white transition">Volunteer Login</Link></li>
              <li><Link href="/register" className="hover:text-white transition">New Registration</Link></li>
              <li><Link href="/admin" className="hover:text-white transition">Admin Portal</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-4">Contact Us</h5>
            <ul className="space-y-2">
              <li>nss@college.edu.in</li>
              <li>+91 abc</li>
              <li>Main Admin Block, IIT Roorkee</li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-4">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          &copy; {new Date().getFullYear()} NSS Donation Portal. Developed for Social Service.
        </div>
      </footer>

    </div>
  );
}