"use client";

import { useState } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Step1Basic } from "./Step1Basic";
import { Step2Content } from "./Step2Content";
import { Step3Preview } from "./Step3Preview";
import type { CreateSampleModalProps } from "../../_props/samples.props";
import type { AdminSampleMutation } from "../../_types/samples.type";

const INITIAL_DATA: AdminSampleMutation = {
  title: "",
  content: "",
  service_id: null,
  excerpt: "",
  word_count: 0,
  featured: false,
  image: "",
  tags: [],
};

export function CreateSampleModal({ isOpen, onClose, onSave, isSaving, services }: CreateSampleModalProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<AdminSampleMutation>(INITIAL_DATA);

  const handleUpdate = (updates: Partial<AdminSampleMutation>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const handleClose = () => {
    setStep(1);
    setData(INITIAL_DATA);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="rounded-2xl border border-white/60 bg-white/95 backdrop-blur-md shadow-lg max-w-lg text-slate-700">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
            <span>Upload New Sample</span>
            <span className="text-[10px] text-slate-400 font-bold bg-slate-100/80 px-2.5 py-0.5 rounded-full">Step {step} of 3</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {step === 1 && (
            <Step1Basic
              data={data}
              onChange={handleUpdate}
              services={services}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2Content
              data={data}
              onChange={handleUpdate}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <Step3Preview
              data={data}
              services={services}
              onBack={() => setStep(2)}
              onSubmit={() => onSave(data)}
              isSaving={isSaving}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
