import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="border-gray-800 bg-gray-950 text-gray-100 max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-white text-lg font-bold">
            Upload Resume
          </DialogTitle>
          <DialogDescription asChild>
            <div>
              <label
                htmlFor="resumeUpload"
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-amber-500 transition-colors group bg-gray-900"
              >
                <File className="h-8 w-8 text-gray-400 group-hover:text-amber-300 transition-colors" />
                <span className="mt-2 text-sm text-gray-300">
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
            className="border-gray-700 bg-gray-300 text-gray-900  hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUploadAndAnalyze}
            disabled={!file || loading}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-gray-950 font-semibold"
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
