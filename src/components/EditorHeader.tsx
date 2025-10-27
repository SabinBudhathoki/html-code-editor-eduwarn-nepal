import React, { useState, useEffect } from 'react';
import { Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import EditorSettings from './editor/EditorSettings';

interface EditorHeaderProps {
  projectName: string;
  setProjectName: (name: string) => void;
  darkMode: boolean;
  setDarkMode: (enabled: boolean) => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  projectName,
  setProjectName,
  darkMode,
  setDarkMode
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <header className="border-b px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-gray-800 dark:to-gray-900 text-white shadow-md">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-3">
          <img
            src="/lovable-uploads/db5f63ca-2708-43a8-a1f7-d74fe2c94987.png"
            alt="EduWarn Logo"
            className="h-10 w-10 rounded-lg shadow-sm"
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight">
              Code Editor
            </h1>
            <p className="text-xs opacity-90">
              powered by <span className="font-semibold">EduWarn</span> Nepal
            </p>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 transition-colors"
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
      </div>
    </header>
  );
};

export default EditorHeader;
