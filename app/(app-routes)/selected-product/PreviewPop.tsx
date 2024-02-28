import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/_components/ui/dialog';

function PreviewPop({ image }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2  bg-background text-primary-foreground hover:bg-background/90 p-2 border hover:border-[#800000] hover:text-[#800000] border-gray-300 inline-block w-max ">
          Preview
        </a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <img src={image} alt="Frame Preview Image" />
      </DialogContent>
    </Dialog>
  );
}

export default PreviewPop;
