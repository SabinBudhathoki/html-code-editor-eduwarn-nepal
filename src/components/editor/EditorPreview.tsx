import React from 'react';

interface EditorPreviewProps {
  output: string;
}

const EditorPreview: React.FC<EditorPreviewProps> = ({ output }) => {
  return (
    <div className="h-full flex flex-col rounded-lg border bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h3>
      </div>
      <div className="flex-1 overflow-auto">
        <iframe
          title="Preview"
          srcDoc={output}
          className="w-full h-full"
          sandbox="allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default EditorPreview;
