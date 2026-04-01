"use client";

import Link, { type LinkProps } from "next/link";
import { ChevronRight, ExternalLink, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownSkeleton } from "./DropdownSkeleton";
import type { ServicesDropdownProps } from "@/lib/props/service.props";
import type { Service } from "@/lib/types/service.type";

export function ServicesDropdown({ 
  categories, 
  isOpen, 
  onClose,
  isLoading,
  activeCategoryId,
  onCategorySelect,
  services,
  isServicesLoading
}: ServicesDropdownProps) {
  if (!isOpen) return null;

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <div 
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[840px] bg-white rounded-3xl border border-slate-100 shadow-[0_40px_80px_-16px_rgba(0,0,0,0.12)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200 origin-top"
      onMouseLeave={onClose}
    >
      {isLoading ? (
        <DropdownSkeleton />
      ) : (
        <div className="flex divide-x divide-slate-50 min-h-[480px]">
          {/* Column 1: Categories */}
          <div className="w-[300px] bg-slate-50/50 p-6 flex flex-col">
            <div className="flex flex-col gap-1.5 h-full">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 mb-4">
                Service Categories
              </span>
              
              <div className="flex-1 space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => onCategorySelect(category.id)}
                    onMouseEnter={() => onCategorySelect(category.id)}
                    className={cn(
                      "group w-full flex items-center justify-between px-4 py-4 rounded-2xl text-[14px] font-bold transition-all duration-200 text-left",
                      activeCategoryId === category.id
                        ? "bg-white text-emerald-700 shadow-sm ring-1 ring-slate-100 translate-x-1"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/60 hover:translate-x-1"
                    )}
                    aria-current={activeCategoryId === category.id ? "true" : undefined}
                  >
                    <span className="flex items-center gap-3">
                      <div className={cn(
                        "h-1.5 w-1.5 rounded-full transition-all duration-300",
                        activeCategoryId === category.id ? "bg-emerald-500 scale-125" : "bg-slate-300 group-hover:bg-slate-400"
                      )} />
                      {category.name}
                    </span>
                    <ChevronRight 
                      size={14} 
                      className={cn(
                        "transition-all duration-200", 
                        activeCategoryId === category.id 
                          ? "text-emerald-500 translate-x-0" 
                          : "text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                      )} 
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 px-3">
                <Link 
                  href={"/samples" as LinkProps<string>["href"]}
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 text-[12px] font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  View our work gallery
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="flex-1 bg-white min-h-[480px] relative flex flex-col">
            <div className={cn(
              "flex-1 overflow-y-auto custom-scrollbar transition-all duration-300",
              isServicesLoading ? "opacity-40 blur-[1px] pointer-events-none" : "opacity-100"
            )}>
              <div className="p-8 pb-12 flex flex-col gap-8">
                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {activeCategory?.name || "Our Services"}
                  </h3>
                  <p className="text-[14px] text-slate-500 mt-2 leading-relaxed max-w-[420px]">
                    {activeCategory?.description || "Select a category to see how we can assist you with your academic needs."}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {services.map((service: Service, idx: number) => (
                    <Link
                      key={service.id}
                      href={`/service/${service.slug}` as LinkProps<string>["href"]}
                      onClick={onClose}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-emerald-100 hover:bg-emerald-50/20 transition-all duration-300",
                        "hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5",
                        "animate-in fade-in slide-in-from-bottom-2"
                      )}
                      style={{ animationDelay: `${idx * 40}ms` }}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[15px] font-bold text-slate-800 group-hover:text-emerald-800 transition-colors">
                          {service.name}
                        </span>
                        <span className="text-[12px] text-slate-500 line-clamp-1 opacity-80 group-hover:opacity-100">
                          {service.description || "Expert academic support tailored for your needs."}
                        </span>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-all">
                        <ExternalLink size={15} />
                      </div>
                    </Link>
                  ))}

                  {services.length === 0 && !isServicesLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-[13px] font-medium text-slate-400 italic">
                        No services available for this category yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Loading State Overlay */}
            {isServicesLoading && (
              <div className="absolute inset-0 flex flex-col p-8 bg-white/60 backdrop-blur-[1px] z-10 animate-in fade-in duration-300">
                 <div className="flex flex-col gap-6 w-full">
                   <div className="space-y-2">
                     <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse" />
                     <div className="h-4 w-64 bg-slate-50 rounded-lg animate-pulse" />
                   </div>
                   <div className="grid grid-cols-1 gap-3 mt-4">
                     {[1, 2, 3, 4, 5].map(i => (
                       <div key={i} className="h-[76px] w-full bg-slate-50/80 rounded-2xl animate-pulse border border-slate-100" />
                     ))}
                   </div>
                 </div>
              </div>
            )}
            
            {/* Footer */}
            {!isServicesLoading && (
              <div className="mt-auto bg-slate-50/80 border-t border-slate-100/50 p-5 flex items-center justify-between px-8">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  Premium academic assistance
                </p>
                <div className="flex items-center gap-6">
                  <span className="text-[11px] font-bold text-slate-500">Available 24/7</span>
                  <Link 
                    href={"/faqs" as LinkProps<string>["href"]}
                    onClick={onClose}
                    className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
