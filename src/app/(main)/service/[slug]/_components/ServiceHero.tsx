import Image from "next/image";
import type { ServiceHeroProps } from "@/lib/props/service.props";
import { ServiceQuoteForm } from "./ServiceQuoteForm";

export function ServiceHero({ service, levels }: ServiceHeroProps) {
  const imageUrl = "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1280&auto=format&fit=crop";

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 pb-32 lg:py-28 lg:pb-40">
      <div className="absolute inset-0 z-0">
        <Image 
          src={imageUrl} 
          alt={service.name}
          fill
          priority
          className="object-cover opacity-20 filter grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/95 via-slate-900/80 to-slate-900/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Hero Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left animate-in fade-in slide-in-from-left-4 duration-700">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-400 ring-1 ring-inset ring-emerald-500/20 uppercase tracking-widest mb-4">
                Specialized Academic Support
              </span>
              <h1 className="text-4xl font-black text-white tracking-tight sm:text-6xl lg:text-7xl">
                Expert <span className="text-emerald-500">{service.name}</span>
              </h1>
            </div>
            
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300 mx-auto lg:mx-0">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-200">Experts Available Now</span>
              </div>
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 overflow-hidden bg-slate-800">
                    <Image 
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=64&h=64&fit=crop`} 
                      alt="Specialist"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-tr from-emerald-500 to-cyan-500 opacity-20 blur-2xl" />
            <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl overflow-hidden group">
               <div className="absolute top-0 right-0 h-[200px] w-[200px] bg-emerald-500/10 blur-[100px] -translate-y-1/2 translate-x-1/2" />
               
               <ServiceQuoteForm service={service} levels={levels} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
