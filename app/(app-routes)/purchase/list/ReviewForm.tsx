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
import { Input } from '@/_components/ui/input';
import { Label } from '@/_components/ui/label';
import { Button } from '@/_components/ui/button';
import { toast } from '@/_components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/_components/ui/form';

const ReviewFormSchema = z.object({
  comment: z.string().max(160).min(4).optional(),
  rating: z.number({
    required_error: 'Rating is mandatory',
  }),
  profilePicture: z
    .array(
      z.string().refine(
        (value) => {
          if (typeof value === 'string') {
            const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'gif'];
            const fileFormat = value.split('.').pop()?.toLowerCase();
            console.log('File Format:', fileFormat);
            return fileFormat && allowedFormats.includes(fileFormat);
          }
          return false;
        },
        {
          message: 'File must be one of the following formats: jpeg, jpg, png, webp, gif.',
        }
      )
    )
    .optional(),
});

type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

const defaultValues: Partial<ReviewFormValues> = {};
function ReviewForm({ id, getPurchase }) {
  const [rating, setRating] = useState(0);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const onRate = (selectedRating: any) => {
    // Handle the review submission or store the rating as needed
    console.log('User rated:', selectedRating);
  };

  // const handleRate = (selectedRating: any) => {
  //   setRating(selectedRating);
  //   onRate(selectedRating);
  // };
  const handleRate = (selectedRating, event) => {
    event.preventDefault();
    setRating(selectedRating);
    form.setValue('rating', selectedRating);
    // ... other logic ...
  };
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const removePreviewImage = () => {
    setFile(undefined);
    setPreviewImage(null);
  };
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  });
  const addReview = async (formData: any) => {
    try {
      const res = await fetch(`/api/profile/review`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data) {
        toast({
          title: 'Sucessful!',
          description: 'Review has been successfully added.',
        });
        getPurchase();
      }
      console.log(data);
    } catch (error) {
    } finally {
    }
  };
  function onSubmit(data: ReviewFormValues) {
    const formData = new FormData();
    file && formData.append('image[0]', file || '');

    formData.append('rating', data.rating || '');
    formData.append('comment', data.comment || '');
    formData.append('orderItemId', id || '');
    addReview(formData);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <a className="cursor-pointer font-semibold hover:text-red-500 text-gray-500 ">Review Product</a>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Review</DialogTitle>
          <DialogDescription>Please review the product.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="hidden" placeholder="Comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  className={`text-2xl cursor-pointer focus:outline-none ${
                    index <= rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  onClick={(event) => handleRate(index, event)}
                  value={index}
                >
                  ★
                </button>
              ))}
            </div>
            <div className="grid gap-2 py-2">
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Comment" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-md">Images</FormLabel>

                  <FormControl>
                    <div>
                      <div {...getRootProps()} className="dropzone">
                        <Input type="file" {...getInputProps()} {...field} />
                        <p className="border-2 border-dashed border-gray-300 w-full  rounded p-4 cursor-pointer transition ease-in-out duration-300">
                          Drag 'n' drop some files here, or click to select files
                        </p>
                      </div>

                      {previewImage && (
                        <div>
                          <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                          />
                          <span className="cursor-pointer text-red-500" onClick={removePreviewImage}>
                            Remove
                          </span>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full h-10 p-2 mr-4 bg-[#800000] dark:text-gray-200 text-gray-50 hover:bg-[#AD3523]"
              type="submit"
            >
              Review
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewForm;
