
import React, { useState } from 'react';
import { Cog, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import EditorSettings from './editor/EditorSettings';

interface EditorHeaderProps {
  projectName: string;
  setProjectName: (name: string) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({ projectName, setProjectName }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="border-b px-4 py-3 bg-nepal-blue text-nepal-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-6 w-6 text-nepal-white" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-nepal-white">Code Editor</span>
          </h1>
          <p className="text-xs text-nepal-white">
            powered by <span className="text-nepal-red font-semibold">EduWarn</span> Nepal
          </p>
        </div>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-nepal-white hover:bg-nepal-red/20"
              onClick={() => setSettingsOpen(true)}
            >
              <Cog className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <EditorSettings 
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        projectName={projectName}
        setProjectName={setProjectName}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </header>
  );
};

export default EditorHeader;
