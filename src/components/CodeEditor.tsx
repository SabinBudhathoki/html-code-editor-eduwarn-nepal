import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import EditorHeader from './EditorHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import EditorLayout from './editor/EditorLayout';
import { validateHTML } from '@/utils/codeValidation';
import { 
  DEFAULT_HTML, 
  DEFAULT_CSS, 
  DEFAULT_JS 
} from './editor/EditorConstants';
import { getEditorTheme } from './editor/EditorTheme';
import { generateOutputContent, downloadFile } from './editor/CodeEditorHelpers';

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [jsCode, setJsCode] = useState(DEFAULT_JS);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [errors, setErrors] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('My EduWarn Project');
  const [darkMode, setDarkMode] = useState(false);
  
  const isMobile = useIsMobile();

  useEffect(() => {
    const newErrors = validateHTML(htmlCode);
    setErrors(newErrors);
  }, [htmlCode]);

  const generateOutput = () => {
    const outputContent = generateOutputContent(htmlCode, cssCode, jsCode);
    setOutput(outputContent);
    
    toast({
      title: "Code Executed",
      description: errors.length > 0 ? "Warning: Code executed with errors" : "Code executed successfully",
      variant: errors.length > 0 ? "destructive" : "default"
    });
  };

  const resetEditor = () => {
    setHtmlCode(DEFAULT_HTML);
    setCssCode(DEFAULT_CSS);
    setJsCode(DEFAULT_JS);
    toast({
      title: "Editor Reset",
      description: "All code has been reset to default examples.",
    });
  };

  const copyCode = () => {
    let codeToCopy = '';
    
    switch(activeTab) {
      case 'html':
        codeToCopy = htmlCode;
        break;
      case 'css':
        codeToCopy = cssCode;
        break;
      case 'js':
        codeToCopy = jsCode;
        break;
      default:
        return;
    }
    
    navigator.clipboard.writeText(codeToCopy);
    toast({
      title: "Copied to Clipboard",
      description: `${activeTab.toUpperCase()} code has been copied to clipboard.`,
    });
  };

  const downloadCode = () => {
    const fileExtension = activeTab === 'js' ? 'js' : activeTab;
    let content = '';
    let filename = '';
    
    switch(activeTab) {
      case 'html':
        content = htmlCode;
        filename = 'index.html';
        break;
      case 'css':
        content = cssCode;
        filename = 'styles.css';
        break;
      case 'js':
        content = jsCode;
        filename = 'script.js';
        break;
      default:
        return;
    }
    
    downloadFile(content, filename);
    toast({
      title: "Download Started",
      description: `${filename} is being downloaded.`,
    });
  };

  const saveProject = () => {
    const project = {
      projectName,
      htmlCode,
      cssCode,
      jsCode,
      darkMode,
      lastSaved: new Date().toISOString()
    };
    
    localStorage.setItem('eduwarn-project', JSON.stringify(project));
    toast({
      title: "Project Saved",
      description: `${projectName} has been saved locally.`,
    });
  };

  const loadProject = () => {
    const savedProject = localStorage.getItem('eduwarn-project');
    
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setHtmlCode(project.htmlCode);
        setCssCode(project.cssCode);
        setJsCode(project.jsCode);
        if (project.projectName) {
          setProjectName(project.projectName);
        }
        if (project.darkMode !== undefined) {
          setDarkMode(project.darkMode);
        }
        
        toast({
          title: "Project Loaded",
          description: `${project.projectName || 'Project'} has been loaded successfully.`,
        });
      } catch (error) {
        toast({
          title: "Error Loading Project",
          description: "There was an error loading your saved project.",
          variant: "destructive"
        });
      }
    } else {
      toast({
        title: "No Saved Project",
        description: "No saved project was found.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    generateOutput();
  }, []);

  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'dark' : ''}`}>
      <EditorHeader 
        projectName={projectName} 
        setProjectName={setProjectName} 
      />
      <div className="flex-1 overflow-hidden">
        <EditorLayout
          isMobile={isMobile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          htmlCode={htmlCode}
          setHtmlCode={setHtmlCode}
          cssCode={cssCode}
          setCssCode={setCssCode}
          jsCode={jsCode}
          setJsCode={setJsCode}
          editorTheme={getEditorTheme(darkMode)}
          errors={errors}
          output={output}
          generateOutput={generateOutput}
          resetEditor={resetEditor}
          copyCode={copyCode}
          downloadCode={downloadCode}
          saveProject={saveProject}
          loadProject={loadProject}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
