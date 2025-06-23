import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mail, Clock } from 'lucide-react';

type CoverLetterDialogProps = {
  openCoverLetterDialog: boolean,
  setOpenCoverLetterDialog: (open: boolean) => void,
};

function CoverLetterDialog({
  openCoverLetterDialog,
  setOpenCoverLetterDialog,
}: CoverLetterDialogProps) {
  function handleClose() {
    setOpenCoverLetterDialog(false);
  }

  return (
    <Dialog
      open={openCoverLetterDialog}
      onOpenChange={setOpenCoverLetterDialog}
    >
      <DialogContent className="border-[#39194f]/20 max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-[#23003c] text-lg font-bold">
            Cover Letter Generator
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#23003c] mb-2">
                  Coming Soon!
                </h3>
                <p className="text-sm text-[#23003c]/70 text-center">
                  We're working hard to bring you an amazing cover letter
                  generator. Stay tuned for this exciting feature!
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleClose}
            className="w-full bg-[#39194f] hover:bg-[#23003c] text-white"
          >
            <Mail className="w-4 h-4 mr-2" />
            Got it!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverLetterDialog;
