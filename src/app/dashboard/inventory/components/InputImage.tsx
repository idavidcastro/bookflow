import React, { ChangeEvent } from "react";

interface InputImageProps {
  onImageSelect: (file: File | null) => void;
}

const InputImage = ({ onImageSelect }: InputImageProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageSelect(file);
  };

  return (
    <div className="flex flex-col space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
};

export default InputImage;
