// src/components/ImageUploader.tsx
import React, { useState } from 'react';
import { uploadImage } from '../lib/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

/**
 * Simple image uploader component.
 *
 * Props:
 *   onUpload(url: string) – called with the public URL once the upload succeeds.
 */
export const ImageUploader: React.FC<{ onUpload: (url: string) => void }> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      toast.success('Image uploaded');
      onUpload(url);
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? 'Uploading…' : 'Upload Image'}
      </Button>
    </div>
  );
};
