import React from 'react';

import { Upload } from 'lucide-react';

export default function FileUpload({ handleFile }: { handleFile: (arg0: File) => void }) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFile(event.target.files[0]);
  };

  return (
    <div className="border-dashed border-2 border-primary/50 rounded-md relative hover:border-primary">
      <input type="file" onChange={handleChange} className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50" />

      <div className="h-full flex flex-col items-center justify-center text-center p-10 absolute top-0 right-0 left-0 m-auto">
        <Upload className="h-12 text-gray-400" />
        <h4>
          <span className="text-primary mr-1">Click</span>or <span className="text-primary mr-1">Drop</span> Images
        </h4>
      </div>
    </div>
  );
}
