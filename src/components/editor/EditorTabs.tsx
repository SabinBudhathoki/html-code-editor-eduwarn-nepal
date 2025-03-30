
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Palette, FileCode2 } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';

interface EditorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  cssCode: string;
  setCssCode: (code: string) => void;
  jsCode: string;
  setJsCode: (code: string) => void;
  editorTheme: any;
  darkMode: boolean;
}

const EditorTabs: React.FC<EditorTabsProps> = ({
  activeTab,
  setActiveTab,
  htmlCode,
  setHtmlCode,
  cssCode,
  setCssCode,
  jsCode,
  setJsCode,
  editorTheme,
  darkMode
}) => {
  return (
    <Tabs 
      defaultValue="html" 
      className="w-full h-full flex flex-col" 
      value={activeTab} 
      onValueChange={setActiveTab}
    >
      <div className="px-4 pt-2">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="html" className="flex items-center gap-1">
            <Code2 className="h-4 w-4" />
            <span>HTML</span>
          </TabsTrigger>
          <TabsTrigger value="css" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>CSS</span>
          </TabsTrigger>
          <TabsTrigger value="js" className="flex items-center gap-1">
            <FileCode2 className="h-4 w-4" />
            <span>JS</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <TabsContent value="html" className="h-full m-0">
          <CodeMirror
            value={htmlCode}
            height="100%"
            theme={darkMode ? 'dark' : 'light'}
            extensions={[html(), editorTheme]}
            onChange={setHtmlCode}
            className={`code-mirror border ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          />
        </TabsContent>
        <TabsContent value="css" className="h-full m-0">
          <CodeMirror
            value={cssCode}
            height="100%"
            theme={darkMode ? 'dark' : 'light'}
            extensions={[css(), editorTheme]}
            onChange={setCssCode}
            className={`code-mirror border ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          />
        </TabsContent>
        <TabsContent value="js" className="h-full m-0">
          <CodeMirror
            value={jsCode}
            height="100%"
            theme={darkMode ? 'dark' : 'light'}
            extensions={[javascript(), editorTheme]}
            onChange={setJsCode}
            className={`code-mirror border ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default EditorTabs;
