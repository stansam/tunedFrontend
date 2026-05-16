import { useState, useRef } from "react";
import { Paperclip, X, File, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderFileUpload } from "../_hooks/useOrderFileUpload";

interface ActivityAttachmentUploadProps {
  orderId: string;
  onUploadComplete: (fileIds: string[]) => void;
  disabled?: boolean;
}

export function ActivityAttachmentUpload({ orderId, onUploadComplete, disabled }: ActivityAttachmentUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useOrderFileUpload();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    try {
      const res = await uploadMutation.mutateAsync({ orderId, files: selectedFiles });
      onUploadComplete(res.file_ids);
      setSelectedFiles([]);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        className="text-muted-foreground hover:bg-white/50 rounded-full h-10 w-10 shrink-0"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled || uploadMutation.isPending}
      >
        <Paperclip className="h-5 w-5" />
      </Button>

      {selectedFiles.length > 0 && (
        <div className="absolute bottom-full mb-2 right-0 w-72 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 p-3 rounded-xl shadow-lg z-50">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-medium text-muted-foreground">Selected Files ({selectedFiles.length})</span>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSelectedFiles([])}>
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="max-h-40 overflow-y-auto flex flex-col gap-1.5 mb-3">
            {selectedFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-black/5 p-1.5 rounded-md">
                <div className="flex items-center gap-2 overflow-hidden">
                  {f.type.startsWith("image/") ? <ImageIcon className="h-4 w-4 shrink-0" /> : <File className="h-4 w-4 shrink-0" />}
                  <span className="text-xs truncate">{f.name}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-5 w-5 shrink-0" onClick={() => removeFile(i)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
          <Button 
            className="w-full text-xs h-8 bg-primary/20 hover:bg-primary/30 text-primary shadow-none" 
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
            Upload & Attach
          </Button>
        </div>
      )}
    </div>
  );
}
