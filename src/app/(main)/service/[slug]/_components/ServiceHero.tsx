import { ServiceDetailsProps } from "@/lib/props/service.props";
import { ServiceQuoteForm } from "./ServiceQuoteForm";
import { Level } from "@/lib/types/content.type";

export function ServiceHero({ 
  service, 
  levels 
}: { 
  service: ServiceDetailsProps["service"], 
  levels: readonly Level[] 
}) {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-20 pb-32 lg:py-28 lg:pb-40">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-[10%] -right-[5%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -left-[5%] h-[400px] w-[400px] rounded-full bg-emerald-600/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex self-center lg:self-start items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              Professional Service
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
              Expert <span className="text-emerald-500">{service.name}</span> <br className="hidden md:block" />
              Tailored to You
            </h1>

            <p className="max-w-xl self-center lg:self-start text-lg text-slate-300 leading-relaxed">
              {service.description}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-emerald-100/80">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/32?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <span>Trusted by 2k+ students</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mr-0">
            <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-emerald-500 to-emerald-400 opacity-20 blur-lg" aria-hidden="true" />
            <div className="relative rounded-2xl bg-slate-800/50 p-6 backdrop-blur-xl border border-slate-700/50 shadow-2xl">
              <ServiceQuoteForm service={service} levels={levels} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
