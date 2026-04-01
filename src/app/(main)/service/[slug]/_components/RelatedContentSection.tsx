"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { ArrowUpRight, BookOpen, Layers } from "lucide-react";
import { fetchRelatedContent } from "@/lib/services/service.service";
import { RelatedContentSkeleton } from "./ServiceSkeletons";
import type { RelatedContentProps } from "@/lib/props/service.props";
import type { Service } from "@/lib/types/service.type";
import type { Sample } from "@/lib/types/content.type";

export function RelatedContentSection({ serviceId }: RelatedContentProps) {
  const [data, setData] = useState<{ samples: readonly Sample[], services: readonly Service[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRelatedContent(serviceId).then(res => {
      if (res.ok) setData(res.data);
      setLoading(false);
    });
  }, [serviceId]);

  if (loading) return <RelatedContentSkeleton />;
  if (!data || (data.samples.length === 0 && data.services.length === 0)) return null;

  return (
    <section className="bg-slate-50 py-16 lg:py-24 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col gap-12">
          {/* Related Samples */}
          {data.samples.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Related <span className="text-emerald-600">Samples</span>
                  </h2>
                </div>
                <Link 
                  href={"/samples" as LinkProps<string>["href"]} 
                  className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1 group"
                >
                  View all
                  <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.samples.slice(0, 3).map((sample) => (
                  <Link
                    key={sample.id}
                    href={`/samples/${sample.slug}` as LinkProps<string>["href"]}
                    className="group flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100">
                      <Image 
                        src={sample.image || "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=640&auto=format&fit=crop"} 
                        alt={sample.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                        {sample.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {sample.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Related Services */}
          {data.services.length > 0 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center">
                    <Layers size={20} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Other <span className="text-emerald-600">Services</span>
                  </h2>
                </div>
                <Link 
                  href={"/" as LinkProps<string>["href"]} 
                  className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-1 group"
                >
                  Explore more
                  <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.services.slice(0, 4).map((service) => (
                  <Link
                    key={service.id}
                    href={`/service/${service.slug}` as LinkProps<string>["href"]}
                    className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all duration-300"
                  >
                    <span className="text-[14px] font-bold text-slate-700">{service.name}</span>
                    <ArrowUpRight size={14} className="text-slate-300 group-hover:text-emerald-500" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
