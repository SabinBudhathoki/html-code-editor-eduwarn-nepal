
import React from 'react';

interface EditorPreviewProps {
  output: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({ output }) => {
  return (
    <div className="h-full rounded-md border bg-white overflow-hidden">
      <iframe
        title="Preview"
        srcDoc={output}
        className="w-full h-full"
        sandbox="allow-scripts allow-popups allow-forms"
      />
    </div>
  );
};

export default EditorPreview;
