
import React, { useState, useEffect } from 'react';
import { Cog } from 'lucide-react';
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

  // Apply dark mode class to document body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="border-b px-4 py-3 bg-nepal-blue text-nepal-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/db5f63ca-2708-43a8-a1f7-d74fe2c94987.png" 
          alt="EduWarn Logo" 
          className="h-10 w-10"
        />
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
