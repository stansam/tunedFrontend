import Image from "next/image";
import type { ServiceHeroProps } from "@/lib/props/service.props";
import { ServiceQuoteForm } from "./ServiceQuoteForm";
import { Star, Clock, Users, ShieldCheck } from "lucide-react";

export function ServiceHero({ service, levels }: ServiceHeroProps) {
  // Dynamic Unsplash placeholder based on service name for variety, fallback to high-quality academic image
  const bgImage = `https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1920&auto=format&fit=crop&sig=${service.slug}`;

  return (
    <section className="relative min-h-[700px] lg:min-h-[800px] w-full overflow-hidden bg-slate-950 flex items-center pt-24 pb-32">
      {/* Background with optimized Image component */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bgImage} 
          alt={`${service.name} Background`}
          fill
          priority
          className="object-cover opacity-30 transform scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-950/90 to-emerald-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(16,185,129,0.1),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
          
          {/* Hero Content Side */}
          <div className="flex flex-col gap-8 text-center lg:text-left animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-black text-emerald-400 uppercase tracking-[0.25em] shadow-lg shadow-emerald-500/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Academic Excellence
              </div>
              <h1 className="text-5xl font-black text-white tracking-tight sm:text-7xl lg:text-8xl leading-[0.9] lg:leading-[0.85]">
                Expert <br />
                <span className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">{service.name}</span>
              </h1>
            </div>
            
            <p className="max-w-xl text-lg lg:text-xl leading-relaxed text-slate-300 mx-auto lg:mx-0 font-medium">
              {service.description || "Get professional academic assistance from top-tier experts. Quality, integrity, and punctuality guaranteed for every project."}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex flex-col gap-1 items-center lg:items-start">
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-emerald-500 text-emerald-500" />)}
                  </div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">4.9/5 Scholar Rating</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-800 hidden md:block" />
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                 <ShieldCheck size={20} className="text-emerald-500" />
                 <div className="flex flex-col">
                    <span className="text-[12px] font-black text-white uppercase tracking-wider">SECURE & PRIVATE</span>
                    <span className="text-[10px] font-bold text-slate-400">Encrypted Transactions</span>
                 </div>
              </div>
            </div>

            {/* Social Proof Mini */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 border-t border-white/5">
               <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-xl ring-2 ring-emerald-500/10">
                       <Image 
                        src={`https://images.unsplash.com/photo-${1500648767791 + i * 100}?w=64&h=64&fit=crop`} 
                        alt="Expert Avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                       />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-emerald-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl ring-2 ring-emerald-500/10">
                    +500
                  </div>
               </div>
               <p className="text-xs font-bold text-slate-400">
                 Join <span className="text-white">12,000+</span> successful students using our services
               </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative mx-auto w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            {/* Glow Effect */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-linear-to-tr from-emerald-500/30 to-cyan-500/10 opacity-30 blur-3xl group-hover:opacity-50 transition-opacity" />
            
            <div className="relative bg-[#020617]/90 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-8 lg:p-10 shadow-[0_48px_96px_-24px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/5">
               {/* Decorative Gradient Blob */}
               <div className="absolute top-0 right-0 h-[300px] w-[300px] bg-emerald-500/5 blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               
               <ServiceQuoteForm service={service} levels={levels} />
            </div>

            {/* Quick Stats below form */}
            <div className="mt-8 grid grid-cols-3 gap-2 px-4">
              <div className="flex flex-col items-center gap-1">
                 <Clock size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Instant Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                 <Users size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Top 2% Experts</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                 <ShieldCheck size={16} className="text-emerald-500" />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Full Confidentiality</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
