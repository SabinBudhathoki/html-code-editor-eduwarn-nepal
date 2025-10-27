import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface EditorStatusBarProps {
  errors: string[];
  activeTab: string;
}

const EditorStatusBar: React.FC<EditorStatusBarProps> = ({ errors, activeTab }) => {
  const showErrors = activeTab === 'html' && errors.length > 0;

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-xs flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showErrors ? (
          <div className="flex items-center text-red-600 dark:text-red-400 font-medium">
            <AlertCircle className="h-4 w-4 mr-1.5" />
            <span>{errors.length} {errors.length === 1 ? 'error' : 'errors'} detected</span>
          </div>
        ) : (
          <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            <span>No errors</span>
          </div>
        )}
        <div className="h-4 w-px bg-gray-300 dark:bg-gray-600" />
        <span className="text-gray-600 dark:text-gray-400">
          Editing: <span className="font-medium text-gray-900 dark:text-gray-100">{activeTab.toUpperCase()}</span>
        </span>
      </div>

      <div className="text-gray-500 dark:text-gray-400">
        EduWarn Code Editor
      </div>
    </div>
  );
};

export default EditorStatusBar;
