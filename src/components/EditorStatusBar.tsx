
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface EditorStatusBarProps {
  errors: string[];
  activeTab: string;
}

const EditorStatusBar: React.FC<EditorStatusBarProps> = ({ errors, activeTab }) => {
  // Only show errors for HTML tab
  const showErrors = activeTab === 'html' && errors.length > 0;
  
  return (
    <div className="border-t border-border bg-muted px-4 py-2 text-xs flex items-center justify-between">
      <div className="flex items-center">
        {showErrors ? (
          <div className="flex items-center text-nepal-red">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>{errors.length} {errors.length === 1 ? 'error' : 'errors'}</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            <span>{activeTab.toUpperCase()} syntax valid</span>
          </div>
        )}
      </div>
      
      <div>
        <span className="text-muted-foreground">EduWarn Code Editor - {activeTab.toUpperCase()} Mode</span>
      </div>
    </div>
  );
};

export default EditorStatusBar;
