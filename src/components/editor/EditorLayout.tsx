
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import EditorTabs from './EditorTabs';
import EditorActionButtons from './EditorActionButtons';
import EditorPreview from './EditorPreview';
import EditorStatusBar from '../EditorStatusBar';
import { getEditorTheme } from './EditorTheme';

interface EditorLayoutProps {
  isMobile: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  cssCode: string;
  setCssCode: (code: string) => void;
  jsCode: string;
  setJsCode: (code: string) => void;
  editorTheme: any;
  errors: string[];
  output: string;
  generateOutput: () => void;
  resetEditor: () => void;
  copyCode: () => void;
  downloadCode: () => void;
  saveProject: () => void;
  loadProject: () => void;
  darkMode: boolean;
  autoUpdate?: boolean;
  setAutoUpdate?: (auto: boolean) => void;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({
  isMobile,
  activeTab,
  setActiveTab,
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
  jsCode,
  setJsCode,
  editorTheme,
  errors,
  output,
  generateOutput,
  resetEditor,
  copyCode,
  downloadCode,
  saveProject,
  loadProject,
  darkMode,
  autoUpdate = true,
  setAutoUpdate,
}) => {
  if (isMobile) {
    return (
      <div className={`flex flex-col h-full bg-white dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        <EditorTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          htmlCode={htmlCode}
          setHtmlCode={setHtmlCode}
          cssCode={cssCode}
          setCssCode={setCssCode}
          jsCode={jsCode}
          setJsCode={setJsCode}
          editorTheme={getEditorTheme(darkMode)}
          darkMode={darkMode}
        />

        <EditorActionButtons
          generateOutput={generateOutput}
          resetEditor={resetEditor}
          copyCode={copyCode}
          downloadCode={downloadCode}
          saveProject={saveProject}
          loadProject={loadProject}
          isMobile={isMobile}
          autoUpdate={autoUpdate}
          setAutoUpdate={setAutoUpdate}
        />

        <div className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
          <EditorPreview output={output} />
        </div>

        <EditorStatusBar errors={errors} activeTab={activeTab} />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className={`h-full bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col">
        <EditorTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          htmlCode={htmlCode}
          setHtmlCode={setHtmlCode}
          cssCode={cssCode}
          setCssCode={setCssCode}
          jsCode={jsCode}
          setJsCode={setJsCode}
          editorTheme={getEditorTheme(darkMode)}
          darkMode={darkMode}
        />

        <EditorActionButtons
          generateOutput={generateOutput}
          resetEditor={resetEditor}
          copyCode={copyCode}
          downloadCode={downloadCode}
          saveProject={saveProject}
          loadProject={loadProject}
          isMobile={isMobile}
          autoUpdate={autoUpdate}
          setAutoUpdate={setAutoUpdate}
        />

        <EditorStatusBar errors={errors} activeTab={activeTab} />
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors w-1" />

      <ResizablePanel defaultSize={50} minSize={30} className="bg-gray-50 dark:bg-gray-900">
        <div className="h-full p-4">
          <EditorPreview output={output} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default EditorLayout;
