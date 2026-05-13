"use client";

import { Upload, X, File as FileIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "../../_utils/order.utils";

export function FileUploadZone({ files, submitLater, onFilesChange, onSubmitLaterChange }: { files: File[], submitLater: boolean, onFilesChange: (f: File[]) => void, onSubmitLaterChange: (v: boolean) => void }) {
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (submitLater) return;
    const newFiles = Array.from(e.dataTransfer.files);
    onFilesChange([...files, ...newFiles]);
  };

  const onFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => onFilesChange(files.filter((_, i) => i !== index));

  return (
    <div className="space-y-4">
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-8 transition-all",
          submitLater ? "border-slate-200 bg-slate-50 opacity-50 grayscale" : "border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50 hover:border-emerald-300"
        )}
      >
        <input type="file" multiple className="absolute inset-0 cursor-pointer opacity-0" disabled={submitLater} onChange={onFileInput} title="Upload materials" />
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
          <Upload size={24} />
        </div>
        <p className="text-sm font-bold text-slate-900">Click or drag files to upload</p>
        <p className="text-xs text-slate-500">PDF, DOCX, JPG, PNG up to 25MB each</p>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3 overflow-hidden">
                <FileIcon size={18} className="text-emerald-500 shrink-0" />
                <span className="text-xs font-medium truncate text-slate-700">{file.name}</span>
              </div>
              <button onClick={() => removeFile(i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-1">
        <Checkbox id="submit-later" checked={submitLater} onCheckedChange={(v) => onSubmitLaterChange(v as boolean)} />
        <label htmlFor="submit-later" className="text-sm font-medium text-slate-600 cursor-pointer">I&apos;ll upload materials later from dashboard</label>
      </div>
    </div>
  );
}
