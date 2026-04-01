"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { ArrowUpRight, BookOpen, Layers, Sparkles } from "lucide-react";
import { fetchRelatedContent } from "@/lib/services/service.service";
import { RelatedContentSkeleton } from "./ServiceSkeletons";
import type { RelatedContentProps } from "@/lib/props/service.props";
import type { Service } from "@/lib/types/service.type";
import type { Sample } from "@/lib/types/content.type";
import { cn } from "@/lib/utils";

export function RelatedContentSection({ serviceId }: RelatedContentProps) {
  const [data, setData] = useState<{ samples: readonly Sample[], services: readonly Service[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchRelatedContent(serviceId).then(res => {
      if (mounted && res.ok) setData(res.data);
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [serviceId]);

  if (loading) return <RelatedContentSkeleton />;
  if (!data || (data.samples.length === 0 && data.services.length === 0)) return null;

  return (
    <section className="bg-slate-50/50 py-24 lg:py-32 border-t border-slate-100/60 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-20">
          
          {/* Related Samples Section */}
          {data.samples.length > 0 && (
            <div className="flex flex-col gap-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em]">
                      <Sparkles size={14} />
                      Proven Quality
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Case <span className="text-emerald-600">Studies</span> & Samples
                  </h2>
                  <p className="text-slate-500 text-sm max-w-md font-medium leading-relaxed">
                    Explore our recent works to see the level of research and dedication we bring to every task.
                  </p>
                </div>
                <Link 
                  href={"/samples" as LinkProps<string>["href"]} 
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-sm font-black text-slate-700 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-500/5 transition-all"
                >
                  View All Samples
                  <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {data.samples.slice(0, 3).map((sample, idx) => (
                  <Link
                    key={sample.id}
                    href={`/samples/${sample.slug}` as LinkProps<string>["href"]}
                    className="group flex flex-col gap-5 p-4 pb-6 rounded-[2rem] bg-white border border-slate-100 hover:border-emerald-100 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-100 shadow-inner">
                      <Image 
                        src={sample.image || `https://images.unsplash.com/photo-${1500000000000 + idx}?w=640&h=480&fit=crop`} 
                        alt={sample.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <ArrowUpRight size={18} className="text-emerald-600" />
                      </div>
                    </div>
                    <div className="px-2 flex flex-col gap-2.5">
                      <div className="flex items-center gap-2">
                         <span className="px-2.5 py-0.5 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                            Research Paper
                         </span>
                      </div>
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1 tracking-tight">
                        {sample.title}
                      </h3>
                      <p className="text-[14px] text-slate-500 line-clamp-2 leading-relaxed">
                        {sample.excerpt || "Detailed analysis and comprehensive coverage of the subject matter."}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Services Section */}
          {data.services.length > 0 && (
            <div className="flex flex-col gap-10 pt-16 border-t border-slate-100">
               <div className="flex flex-col gap-3">
                   <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
                      <Layers size={14} />
                      Explore More
                   </div>
                   <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Discovery <span className="text-emerald-600">Specialized</span> Categories
                  </h2>
                </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.services.slice(0, 8).map((service, idx) => (
                  <Link
                    key={service.id}
                    href={`/service/${service.slug}` as LinkProps<string>["href"]}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-white border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/20 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 animate-in fade-in zoom-in-95"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                       <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
                       <span className="text-[15px] font-bold text-slate-700 tracking-tight group-hover:text-emerald-800">{service.name}</span>
                    </div>
                    <ArrowUpRight size={16} className="text-slate-300 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                 <Link 
                   href={"/" as LinkProps<string>["href"]}
                   className="text-xs font-black text-slate-400 hover:text-emerald-600 uppercase tracking-widest flex items-center gap-2 group transition-colors"
                 >
                   Discover all expertise areas
                   <div className="h-px w-8 bg-slate-200 group-hover:bg-emerald-500 transition-all" />
                 </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
