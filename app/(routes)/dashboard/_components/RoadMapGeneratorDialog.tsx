import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type RoadMapUploadDialogProps = {
  openRoadMapDialog: boolean;
  setOpenRoadMapDialog: (open: boolean) => void;
};

function RoadMapGeneratorDialog({
  openRoadMapDialog,
  setOpenRoadMapDialog,
}: RoadMapUploadDialogProps) {
  const [userInput, setUserInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserInput(e.target.value);
  }

  async function handleGenerateRoadmap() {
    setLoading(true);
    const roadMapId = uuidv4();

    try {
      const result = await axios.post('/api/roadmap-generator', {
        roadMapId,
        userInput: userInput.trim(),
      });

      console.log(result.data);
      setLoading(false);
      router.push(`/tools/roadmap-generator/${roadMapId}`);
      setOpenRoadMapDialog(false);
      setUserInput('');
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setLoading(false);
    }
  }

  function handleCancel() {
    setOpenRoadMapDialog(false);
    setUserInput('');
  }

  return (
    <Dialog open={openRoadMapDialog} onOpenChange={setOpenRoadMapDialog}>
      <DialogContent className="border-[#39194f]/20 max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-[#23003c] text-lg font-bold">
            Generate Career Roadmap
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 rounded-lg">
                <span className="text-sm text-[#23003c] mb-4 font-semibold">
                  Enter your target position or skills
                </span>
                <Input
                  placeholder="e.g. Cyber Security Analyst"
                  value={userInput}
                  onChange={handleInputChange}
                  className="border-[#39194f]/20 focus:border-[#39194f] text-[#23003c]"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-[#39194f]/20 text-[#23003c] hover:bg-[#39194f]/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateRoadmap}
            disabled={!userInput.trim() || loading}
            className="bg-[#39194f] hover:bg-[#23003c] text-white"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Generating
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RoadMapGeneratorDialog;
