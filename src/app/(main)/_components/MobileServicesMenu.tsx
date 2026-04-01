"use client";

import Link, { type LinkProps } from "next/link";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobileServices } from "@/lib/hooks/useMobileServices";
import type { MobileServicesMenuProps } from "@/lib/props/service.props";

export function MobileServicesMenu({ 
  categories, 
  onFetchCategory, 
  isCategoryLoading 
}: MobileServicesMenuProps) {
  const { 
    openCategoryId, 
    toggleCategory 
  } = useMobileServices();

  const handleToggle = (id: string, hasServices: boolean) => {
    const isOpening = openCategoryId !== id;
    toggleCategory(id);
    
    if (isOpening && !hasServices) {
      onFetchCategory(id);
    }
  };

  if (categories.length === 0) return null;

  return (
    <div className="flex flex-col gap-1 w-full animate-in fade-in slide-in-from-top-1 duration-300">
      <div className="px-5 py-2">
        <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          Services Menu
        </h2>
      </div>

      <div className="space-y-1.5">
        {categories.map((category) => {
          const isOpen = openCategoryId === category.id;
          const isLoading = isCategoryLoading(category.id);
          const hasServices = !!(category.services && category.services.length > 0);
          
          return (
            <div 
              key={category.id} 
              className={cn(
                "rounded-2xl transition-all duration-300",
                isOpen ? "bg-slate-50/80 ring-1 ring-slate-100/50 shadow-sm" : "bg-transparent"
              )}
            >
              <button
                onClick={() => handleToggle(category.id, hasServices)}
                className={cn(
                  "flex w-full items-center justify-between px-5 py-4 rounded-2xl text-[15px] font-bold transition-all",
                  isOpen ? "text-emerald-700" : "text-slate-700 hover:bg-slate-50"
                )}
                aria-expanded={isOpen}
              >
                <span className="flex items-center gap-3 text-left">
                  <div className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    isOpen ? "bg-emerald-500 scale-125" : "bg-slate-300"
                  )} />
                  {category.name}
                </span>
                <div className={cn(
                  "flex items-center justify-center shrink-0 h-7 w-7 rounded-full bg-white shadow-sm ring-1 ring-slate-100 transition-transform duration-300",
                  isOpen && "rotate-180"
                )}>
                  {isOpen ? (
                    <Minus size={14} className="text-emerald-600" />
                  ) : (
                    <Plus size={14} className="text-slate-400" />
                  )}
                </div>
              </button>

              {/* Accordion Content */}
              <div 
                className={cn(
                  "grid transition-all duration-300 ease-in-out px-4",
                  isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pointer-events-none"
                )}
              >
                <div className="overflow-hidden">
                  {isLoading ? (
                    <div className="px-6 py-4 space-y-3">
                       {[1, 2, 3].map(i => (
                         <div key={i} className="h-10 w-full bg-white rounded-xl animate-pulse ring-1 ring-slate-50" />
                       ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-1 pt-1">
                      {category.services?.map((service) => (
                        <Link
                          key={service.id}
                          href={`/service/${service.slug}` as LinkProps<string>["href"]}
                          className="flex items-center justify-between px-6 py-3.5 rounded-xl text-[14px] font-bold text-slate-600 hover:text-emerald-600 transition-all active:bg-white"
                        >
                          <span className="line-clamp-1">{service.name}</span>
                          <ArrowUpRight size={14} className="shrink-0 text-slate-300 opacity-0 group-hover:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  )}
                  
                  {/* Category Footer Link */}
                  <div className="mt-4 px-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-emerald-600">
                    <span>Expert support 24/7</span>
                    <Link 
                      href={"/samples" as LinkProps<string>["href"]} 
                      className="underline underline-offset-4"
                    >
                      Browse Examples
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
