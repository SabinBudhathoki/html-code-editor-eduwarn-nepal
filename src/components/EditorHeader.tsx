
import React from 'react';
import { Cog, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const EditorHeader: React.FC = () => {
  return (
    <header className="border-b px-4 py-3 bg-nepal-blue text-nepal-white flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-6 w-6 text-nepal-white" />
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-nepal-red">Edu</span>
          <span className="text-nepal-white">Warn</span>
          <span className="text-nepal-white ml-2 text-sm font-normal hidden sm:inline">HTML Code Editor</span>
        </h1>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="text-nepal-white hover:bg-nepal-red/20">
              <Cog className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Settings</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};

export default EditorHeader;
