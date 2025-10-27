
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Copy, Download, Save, Upload, RefreshCw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface EditorActionButtonsProps {
  generateOutput: () => void;
  resetEditor: () => void;
  copyCode: () => void;
  downloadCode: () => void;
  saveProject: () => void;
  loadProject: () => void;
  isMobile: boolean;
  autoUpdate?: boolean;
  setAutoUpdate?: (auto: boolean) => void;
}

const EditorActionButtons: React.FC<EditorActionButtonsProps> = ({
  generateOutput,
  resetEditor,
  copyCode,
  downloadCode,
  saveProject,
  loadProject,
  isMobile,
  autoUpdate = true,
  setAutoUpdate
}) => {
  if (isMobile) {
    return (
      <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex flex-wrap gap-2">
          <Button variant="default" size="sm" onClick={generateOutput} className="flex-1 bg-blue-600 hover:bg-blue-700">
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
        {setAutoUpdate && (
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t dark:border-gray-700">
            <Switch
              id="auto-update-mobile"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
            />
            <Label htmlFor="auto-update-mobile" className="text-sm cursor-pointer">Auto-update preview</Label>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Button variant="default" size="sm" onClick={generateOutput} className="bg-blue-600 hover:bg-blue-700">
          <Play className="h-4 w-4 mr-1" />
          Run Code
        </Button>
        <Button variant="outline" size="sm" onClick={resetEditor}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button variant="ghost" size="sm" onClick={copyCode}>
          <Copy className="h-4 w-4 mr-1" />
          Copy
        </Button>
        <Button variant="ghost" size="sm" onClick={downloadCode}>
          <Download className="h-4 w-4 mr-1" />
          Download
        </Button>
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        <Button variant="ghost" size="sm" onClick={saveProject}>
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={loadProject}>
          <Upload className="h-4 w-4 mr-1" />
          Load
        </Button>
      </div>

      {setAutoUpdate && (
        <div className="flex items-center space-x-2">
          <Switch
            id="auto-update"
            checked={autoUpdate}
            onCheckedChange={setAutoUpdate}
          />
          <Label htmlFor="auto-update" className="text-sm cursor-pointer">Auto-update preview</Label>
        </div>
      )}
    </div>
  );
};

export default EditorActionButtons;
