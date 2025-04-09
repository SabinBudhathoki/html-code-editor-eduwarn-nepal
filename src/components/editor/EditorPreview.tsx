
import React from 'react';
import NativeAd from '../ads/NativeAd';

interface EditorPreviewProps {
  output: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({ output }) => {
  return (
    <div className="h-full flex flex-col rounded-md border bg-white overflow-hidden">
      <div className="flex-1 overflow-auto">
        <iframe
          title="Preview"
          srcDoc={output}
          className="w-full h-full"
          sandbox="allow-scripts allow-popups allow-forms"
        />
      </div>
      <div className="w-full">
        <NativeAd className="my-0 rounded-t-none" adSlot="6875697584" />
      </div>
    </div>
  );
};

export default EditorPreview;
