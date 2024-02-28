// DropzoneUploader.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';

interface DropzoneUploaderProps {
  onFileUpload: (files: File[]) => void;
  onPreviewChange: (previews: string[]) => void; // Callback to pass preview data to the parent
  fileLimit: number;
}

const DropzoneUploader: React.FC<DropzoneUploaderProps> = ({ onFileUpload, onPreviewChange, fileLimit }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // New loading state

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true); // Set loading to true when starting the upload

      try {
        if (previews.length + acceptedFiles.length > fileLimit) {
          alert(`Cannot upload more than ${fileLimit} files.`);
          return;
        }

        const newPreviews = acceptedFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        onPreviewChange([...previews, ...newPreviews]); // Notify the parent about the new preview data

        // Simulate an asynchronous upload process
        await new Promise((resolve) => setTimeout(resolve, 2000));

        onFileUpload(acceptedFiles);
        console.log(acceptedFiles);
      } catch (error) {
        console.error('Error uploading images:', error);
      } finally {
        setLoading(false); // Set loading back to false when the upload is finished
      }
    },
    [onFileUpload, onPreviewChange, previews, fileLimit]
  );

  const removeImage = (index: number) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
    onPreviewChange(newPreviews); // Notify the parent about the updated preview data
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });

  if (loading) {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white`}>
        <div className="bg-transparent rounded p-4 flex flex-col items-center">
          <img width={80} height={80} alt="tasbir's logo" src="/images/TasbirLogo.png" />
          <Loader2 className="h-8 w-8 animate-spin mt-5" />
        </div>
      </div>
    );
  }
  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-gray-300 w-full  rounded p-4 cursor-pointer transition ease-in-out duration-300 ${
        isDragActive ? 'border-blue-500' : ''
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-700 cursor-pointer transition ease-in-out duration-300 ">
        Drag 'n' drop some files here, or click to select files
      </p>

      <div className="flex">
        {previews.map((preview, index) => (
          <div key={index} className="mt-4 relative object-fit overflow-hidden">
            <img src={preview} alt={`Preview ${index}`} className={`h-24 ${index !== 0 && 'ml-4'} rounded`} />

            {loading && <div className="loading-spinner absolute bottom-2 left-2 mt-4"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropzoneUploader;
