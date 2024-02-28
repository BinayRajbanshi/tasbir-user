import React, { MouseEventHandler } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/_components/ui/alert-dialog';
import { Button } from '@/_components/ui/button';

export function ConfirmDialog({ children, type }: { children: React.ReactNode }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {type === 'remove' ? (
          <a className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
        ) : (
          <Button variant="ghost">
            <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
            </svg>
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your cart item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button asChild>{children}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
