'use client';

import { useEffect, useState } from 'react';

interface ImageUploadProps {
  disables?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  disables,
  onChange,
  onRemove,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div>ImageUpload</div>;
};

export default ImageUpload;
