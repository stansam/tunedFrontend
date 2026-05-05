"use client";

import { ProjectTitleInput } from "@/app/order/_components/step2/ProjectTitleInput";
import { WordCountControl } from "@/app/order/_components/step2/WordCountControl";
import { LineSpacingToggle } from "@/app/order/_components/step2/LineSpacingToggle";
import { FormatStyleSelect } from "@/app/order/_components/step2/FormatStyleSelect";
import { SourcesControl } from "@/app/order/_components/step2/SourcesControl";
import { InstructionsTextarea } from "@/app/order/_components/step2/InstructionsTextarea";
import { FileUploadZone } from "@/app/order/_components/step2/FileUploadZone";
import type { StepProps } from "@/app/order/_props/order.props";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Type, Hash, Quote } from "lucide-react";

export function Step2PaperDetails({ state, updateStep2 }: StepProps) {
  return (
    <Card className="border-none bg-white/60 shadow-xl shadow-black/5 rounded-3xl overflow-hidden">
      <CardContent className="p-6 md:p-8 space-y-8">
        <header>
          <h2 className="text-2xl font-bold text-slate-900">Paper Details</h2>
          <p className="text-sm text-slate-500 mt-1">Provide specific instructions and formatting for your project.</p>
        </header>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Type size={14} /> Project Title
          </label>
          <ProjectTitleInput 
            value={state.step2.title} 
            onChange={(v) => updateStep2({ title: v })} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Hash size={14} /> Word Count
            </label>
            <WordCountControl 
              value={state.step2.wordCount} 
              onChange={(v) => updateStep2({ wordCount: v })} 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Type size={14} /> Line Spacing
            </label>
            <LineSpacingToggle 
              value={state.step2.lineSpacing} 
              onChange={(v) => updateStep2({ lineSpacing: v })} 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Quote size={14} /> Format Style
            </label>
            <FormatStyleSelect 
              value={state.step2.formatStyle} 
              onChange={(v) => updateStep2({ formatStyle: v })} 
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
              <Quote size={14} /> Number of Sources
            </label>
            <SourcesControl 
              value={state.step2.sources} 
              onChange={(v) => updateStep2({ sources: v })} 
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <FileText size={14} /> Detailed Instructions
          </label>
          <InstructionsTextarea 
            value={state.step2.instructions} 
            onChange={(v) => updateStep2({ instructions: v })} 
          />
        </div>

        <div className="pt-4 border-t border-black/5">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Upload Materials</label>
          <FileUploadZone 
            files={state.step2.files} 
            submitLater={state.step2.submitLater}
            onFilesChange={(f) => updateStep2({ files: f })} 
            onSubmitLaterChange={(v) => updateStep2({ submitLater: v })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
