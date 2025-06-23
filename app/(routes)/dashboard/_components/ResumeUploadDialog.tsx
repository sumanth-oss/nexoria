import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { File, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type ResumeUploadDialogProps = {
  openResumeDialog: boolean;
  setOpenResumeDialog: (open: boolean) => void;
};

function ResumeUploadDialog({
  openResumeDialog,
  setOpenResumeDialog,
}: ResumeUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log('Selected file:', selectedFile.name);
      setFile(selectedFile);
    }
  }

  async function handleUploadAndAnalyze() {
    try {
      setLoading(true);
      const recordId = uuidv4();
      const formData = new FormData();
      formData.append('recordId', recordId);

      if (file) {
        formData.append('resumeFile', file);
      }

      // Send formData to backend server
      const result = await axios.post('/api/resume-analyzer', formData);
      console.log(result);
      setLoading(false);
      router.push('/tools/resume-analyzer' + '/' + recordId);
      setOpenResumeDialog(false);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setLoading(false);
    }
  }

  function handleCancel() {
    setOpenResumeDialog(false);
    setFile(null);
  }

  return (
    <Dialog open={openResumeDialog} onOpenChange={setOpenResumeDialog}>
      <DialogContent className=" border-[#39194f]/20 max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-[#23003c] text-lg font-medium">
            Upload Resume
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <label
                htmlFor="resumeUpload"
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#39194f]/30 rounded-lg cursor-pointer hover:border-[#39194f]/50 transition-colors group"
              >
                <File className="h-8 w-8 text-[#39194f]/60 group-hover:text-[#39194f] transition-colors" />
                <span className="mt-2 text-sm text-[#23003c]/70">
                  {!file ? 'Click to upload PDF' : file.name}
                </span>
              </label>
              <input
                type="file"
                accept="application/pdf"
                id="resumeUpload"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="border-[#39194f]/20 text-[#23003c] hover:bg-[#39194f]/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadAndAnalyze}
            disabled={!file || loading}
            className="bg-[#39194f] hover:bg-[#23003c] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Analyzing
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResumeUploadDialog;
