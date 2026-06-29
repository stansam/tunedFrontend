"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import type { Step1Props } from "../../_props/samples.props";

export function Step1Basic({ data, onChange, services, onNext }: Step1Props) {
  const isValid = data.title.trim().length > 0 && !!data.service_id;

  return (
    <div className="space-y-4 text-slate-700">
      <div className="space-y-1.5">
        <Label htmlFor="title" className="text-xs font-bold">Title *</Label>
        <Input
          id="title"
          placeholder="e.g. Argumentative Essay — Climate Change Policy"
          value={data.title}
          onChange={(e) => onChange({ title: e.target.value })}
          className="rounded-xl border border-slate-200 text-xs py-2 shadow-2xs"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="service_id" className="text-xs font-bold">Category (Service) *</Label>
          <Select
            value={data.service_id || ""}
            onValueChange={(val) => onChange({ service_id: val })}
          >
            <SelectTrigger id="service_id" className="rounded-xl border border-slate-200 text-xs shadow-2xs">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl text-xs shadow-md">
              {services.map((svc) => (
                <SelectItem key={svc.id} value={svc.id} className="cursor-pointer">
                  {svc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="word_count" className="text-xs font-bold">Word Count</Label>
          <Input
            id="word_count"
            type="number"
            placeholder="e.g. 2500"
            value={data.word_count || ""}
            onChange={(e) => onChange({ word_count: Number(e.target.value) || 0 })}
            className="rounded-xl border border-slate-200 text-xs py-2 shadow-2xs"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="tags" className="text-xs font-bold">Tags (Comma separated)</Label>
        <Input
          id="tags"
          placeholder="e.g. PhD Level, Essays"
          value={data.tags.join(", ")}
          onChange={(e) => onChange({ tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
          className="rounded-xl border border-slate-200 text-xs py-2 shadow-2xs"
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          disabled={!isValid}
          onClick={onNext}
          className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-xs px-4 py-2 disabled:opacity-50 transition-colors cursor-pointer"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}
