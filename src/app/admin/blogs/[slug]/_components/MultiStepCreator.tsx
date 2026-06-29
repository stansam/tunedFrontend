import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { CreatorStep1 } from "./CreatorStep1";
import { CreatorStep2 } from "./CreatorStep2";
import { CreatorStep3 } from "./CreatorStep3";
import { CreatorStep4 } from "./CreatorStep4";
import { usePostMutations } from "../../_hooks/usePostMutations";
import type { AdminBlogCategoryResponse } from "../../_types/blogs.types";
import { Route } from "next";

interface MultiStepCreatorProps {
  readonly categories: readonly AdminBlogCategoryResponse[];
}

export function MultiStepCreator({ categories }: MultiStepCreatorProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category_id: "",
    excerpt: "",
    featured_image_id: null as string | null,
    meta_description: "",
    tags: [] as string[],
  });

  const { createPost } = usePostMutations();

  const handleUpdate = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = (publish: boolean) => {
    createPost
      .mutateAsync({ ...formData, is_published: publish, is_featured: false })
      .then((res) => {
        if (res.ok) router.push("/admin/blogs" as Route);
      });
  };

  const steps = ["Details", "Content", "Media", "Preview"];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between bg-white/40 border border-white/50 backdrop-blur-md rounded-2xl p-4">
        {steps.map((label, idx) => {
          const num = idx + 1;
          const isCurrent = step === num;
          const isDone = step > num;
          return (
            <div key={label} className="flex items-center gap-2">
              <span
                className={`size-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCurrent ? "bg-indigo-600 text-white" : isDone ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-500"
                }`}
              >
                {num}
              </span>
              <span className={`text-xs font-bold hidden sm:inline ${isCurrent ? "text-slate-800" : "text-slate-400"}`}>
                {label}
              </span>
              {idx < steps.length - 1 && <span className="text-slate-300 font-normal">/</span>}
            </div>
          );
        })}
      </div>

      <Card className="bg-white/40 backdrop-blur-md border border-white/50 shadow-xs rounded-2xl p-6">
        {step === 1 && (
          <CreatorStep1 data={formData} onChange={handleUpdate} categories={categories} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <CreatorStep2
            content={formData.content}
            onChange={(content) => handleUpdate({ content })}
            onPrev={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && <CreatorStep3 data={formData} onChange={handleUpdate} onPrev={() => setStep(2)} onNext={() => setStep(4)} />}
        {step === 4 && (
          <CreatorStep4
            data={formData}
            categories={categories}
            onPrev={() => setStep(3)}
            onSubmit={handleSubmit}
            isSubmitting={createPost.isPending}
          />
        )}
      </Card>
    </div>
  );
}
