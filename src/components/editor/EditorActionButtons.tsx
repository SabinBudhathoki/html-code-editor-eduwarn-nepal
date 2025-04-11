
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
        {setAutoUpdate && (
          <div className="flex items-center space-x-2 ml-2 mt-2 w-full">
            <Switch
              id="auto-update-mobile"
              checked={autoUpdate}
              onCheckedChange={setAutoUpdate}
              size="sm"
            />
            <Label htmlFor="auto-update-mobile" className="text-xs">Auto-update</Label>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 flex items-center space-x-2">
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
      
      {setAutoUpdate && (
        <div className="flex items-center space-x-2 ml-2">
          <Switch
            id="auto-update"
            checked={autoUpdate}
            onCheckedChange={setAutoUpdate}
            size="sm"
          />
          <Label htmlFor="auto-update" className="text-xs">Auto-update</Label>
        </div>
      )}
    </div>
  );
};

export default EditorActionButtons;
