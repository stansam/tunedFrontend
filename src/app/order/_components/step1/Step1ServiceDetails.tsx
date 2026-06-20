"use client";

import { ServiceTypeSelect } from "@/app/order/_components/step1/ServiceTypeSelect";
import { ProjectLevelSelect } from "@/app/order/_components/step1/ProjectLevelSelect";
import { DeadlineDatePicker } from "@/app/order/_components/step1/DeadlineDatePicker";
import { DeadlineTimePicker } from "@/app/order/_components/step1/DeadlineTimePicker";
import { ReportTypeToggle } from "@/app/order/_components/step1/ReportTypeToggle";
import type { StepProps } from "@/app/order/_props/order.props";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, GraduationCap, Clock } from "lucide-react";

export function Step1ServiceDetails({ state, options, updateStep1 }: StepProps) {
  return (
    <Card className="border-none bg-white/60 shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
      <CardContent className="p-6 md:p-8 space-y-8">
        <header>
          <h2 className="text-2xl font-bold text-slate-900">Complete Your Order</h2>
          <p className="text-sm text-slate-500 mt-1">Select your service details to get started.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <LayoutGrid size={14} /> Type of Service
            </label>
            <ServiceTypeSelect 
              services={options.services} 
              value={state.step1.serviceId} 
              onChange={(id) => updateStep1({ serviceId: id })} 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <GraduationCap size={14} /> Project Level
            </label>
            <ProjectLevelSelect 
              levels={options.levels} 
              value={state.step1.levelId} 
              onChange={(id) => updateStep1({ levelId: id })} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Clock size={14} /> Deadline Date
            </label>
            <DeadlineDatePicker 
              value={state.step1.deadlineDate} 
              onChange={(d) => updateStep1({ deadlineDate: d })} 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Clock size={14} /> Deadline Time
            </label>
            <DeadlineTimePicker 
              value={state.step1.deadlineTime} 
              onChange={(t) => updateStep1({ deadlineTime: t })} 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-black/5">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Enhance Your Submission</label>
          <ReportTypeToggle 
            value={state.step1.reportType} 
            onChange={(type) => updateStep1({ reportType: type })} 
          />
        </div>
      </CardContent>
    </Card>
  );
}
