
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Copy, Download, Save, Upload } from 'lucide-react';

interface EditorActionButtonsProps {
  generateOutput: () => void;
  resetEditor: () => void;
  copyCode: () => void;
  downloadCode: () => void;
  saveProject: () => void;
  loadProject: () => void;
  isMobile: boolean;
}

const EditorActionButtons: React.FC<EditorActionButtonsProps> = ({
  generateOutput,
  resetEditor,
  copyCode,
  downloadCode,
  saveProject,
  loadProject,
  isMobile
}) => {
  if (isMobile) {
    return (
      <div className="p-4 flex flex-wrap gap-2">
        <Button variant="default" size="sm" onClick={generateOutput} className="flex-1">
          <Play className="h-4 w-4 mr-1" />
          Run
        </Button>
        <Button variant="outline" size="sm" onClick={resetEditor} className="flex-1">
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button variant="outline" size="sm" onClick={copyCode}>
          <Copy className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={downloadCode}>
          <Download className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={saveProject}>
          <Save className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" onClick={loadProject}>
          <Upload className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex space-x-2">
      <Button variant="default" size="sm" onClick={generateOutput} className="flex-1">
        <Play className="h-4 w-4 mr-1" />
        Run
      </Button>
      <Button variant="outline" size="sm" onClick={resetEditor}>
        <RotateCcw className="h-4 w-4 mr-1" />
        Reset
      </Button>
      <Button variant="outline" size="sm" onClick={copyCode}>
        <Copy className="h-4 w-4 mr-1" />
        Copy
      </Button>
      <Button variant="outline" size="sm" onClick={downloadCode}>
        <Download className="h-4 w-4 mr-1" />
        Download
      </Button>
      <Button variant="outline" size="sm" onClick={saveProject}>
        <Save className="h-4 w-4 mr-1" />
        Save
      </Button>
      <Button variant="outline" size="sm" onClick={loadProject}>
        <Upload className="h-4 w-4 mr-1" />
        Load
      </Button>
    </div>
  );
};

export default EditorActionButtons;
