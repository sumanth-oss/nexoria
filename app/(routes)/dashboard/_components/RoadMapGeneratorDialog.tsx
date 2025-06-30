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
      <DialogContent className="border-gray-800 bg-gray-950 text-gray-100 max-w-md">
        <DialogHeader className="text-center space-y-3">
          <DialogTitle className="text-white text-lg font-bold">
            Generate Career Roadmap
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-900 border border-gray-800">
                <span className="text-sm text-gray-300 mb-4 font-semibold">
                  Enter your target position or skills
                </span>
                <Input
                  placeholder="e.g. Cyber Security Analyst"
                  value={userInput}
                  onChange={handleInputChange}
                  className="border-gray-700 focus:border-amber-500 text-white bg-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="border-gray-700 bg-gray-300 text-gray-900  hover:bg-gray-800 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handleGenerateRoadmap}
            disabled={!userInput.trim() || loading}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-gray-950 font-semibold"
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
