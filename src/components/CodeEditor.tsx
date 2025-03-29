
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { 
  Cog, 
  Play, 
  RotateCcw, 
  Download, 
  Copy, 
  Code2, 
  Palette, 
  FileCode2,
  Save,
  Upload,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import EditorHeader from './EditorHeader';
import { useIsMobile } from '@/hooks/use-mobile';
import EditorStatusBar from './EditorStatusBar';

// Default code examples
const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
  <title>My Web Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Welcome to EduWarn HTML Code Editor!</p>
  <button id="myButton">Click Me</button>
</body>
</html>`;

const DEFAULT_CSS = `body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  color: #333;
  text-align: center;
}

p {
  color: #666;
  line-height: 1.6;
}

button {
  background-color: #C8102E;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
}

button:hover {
  background-color: #003893;
}`;

const DEFAULT_JS = `// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Find the button element
  const button = document.getElementById('myButton');
  
  // Add a click event listener
  button.addEventListener('click', function() {
    alert('Button was clicked!');
    
    // Change the text of the button
    this.textContent = 'Clicked!';
    
    // Change the color of the heading
    const heading = document.querySelector('h1');
    heading.style.color = '#C8102E';
  });
});`;

// Editor theme extensions
const editorTheme = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '14px',
  },
  '.cm-scroller': {
    overflow: 'auto'
  },
  '.cm-content, .cm-gutter': {
    minHeight: '100%',
  },
  '.cm-gutters': {
    backgroundColor: '#f5f5f5',
    color: '#444',
    border: 'none',
  },
  '.cm-activeLine': { 
    backgroundColor: '#e6f0ff70'
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#e6f0ff70'
  },
  '.cm-content': {
    color: '#000' // Setting text color to black
  }
});

// Basic HTML validator
const validateHTML = (code: string) => {
  const errors = [];
  
  // Check for mismatched tags (very basic check)
  const openTags = [];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  let match;
  
  while ((match = tagRegex.exec(code)) !== null) {
    const fullTag = match[0];
    const tagName = match[1];
    
    // Skip self-closing tags
    if (fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
      continue;
    }
    
    if (!fullTag.startsWith('</')) {
      openTags.push(tagName);
    } else {
      const lastOpenTag = openTags.pop();
      if (lastOpenTag !== tagName) {
        errors.push(`Mismatched tag: ${lastOpenTag} is not closed properly`);
      }
    }
  }
  
  if (openTags.length > 0) {
    errors.push(`Unclosed tags: ${openTags.join(', ')}`);
  }
  
  return errors;
};

const CodeEditor = () => {
  const [htmlCode, setHtmlCode] = useState(DEFAULT_HTML);
  const [cssCode, setCssCode] = useState(DEFAULT_CSS);
  const [jsCode, setJsCode] = useState(DEFAULT_JS);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('html');
  const [errors, setErrors] = useState<string[]>([]);
  const [projectName, setProjectName] = useState('My EduWarn Project');
  
  const isMobile = useIsMobile();

  // Validate the HTML code whenever it changes
  useEffect(() => {
    const newErrors = validateHTML(htmlCode);
    setErrors(newErrors);
  }, [htmlCode]);

  // Generate the output
  const generateOutput = () => {
    // Combine HTML, CSS, and JavaScript
    const outputContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode.replace(/<html>|<\/html>|<head>.*<\/head>|<body>|<\/body>|<!DOCTYPE html>/gs, '')}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setOutput(outputContent);
    
    toast({
      title: "Code Executed",
      description: errors.length > 0 ? "Warning: Code executed with errors" : "Code executed successfully",
      variant: errors.length > 0 ? "destructive" : "default"
    });
  };

  // Reset to default code
  const resetEditor = () => {
    setHtmlCode(DEFAULT_HTML);
    setCssCode(DEFAULT_CSS);
    setJsCode(DEFAULT_JS);
    toast({
      title: "Editor Reset",
      description: "All code has been reset to default examples.",
    });
  };

  // Copy code to clipboard
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

  // Download code
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
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    
    toast({
      title: "File Downloaded",
      description: `${filename} has been downloaded.`,
    });
  };

  // Save the project
  const saveProject = () => {
    const project = {
      name: projectName,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('eduwarnProject', JSON.stringify(project));
    
    toast({
      title: "Project Saved",
      description: `Project "${projectName}" has been saved locally.`,
    });
  };

  // Load the project
  const loadProject = () => {
    const savedProject = localStorage.getItem('eduwarnProject');
    
    if (savedProject) {
      try {
        const project = JSON.parse(savedProject);
        setHtmlCode(project.html || DEFAULT_HTML);
        setCssCode(project.css || DEFAULT_CSS);
        setJsCode(project.js || DEFAULT_JS);
        setProjectName(project.name || 'My EduWarn Project');
        
        toast({
          title: "Project Loaded",
          description: `Project "${project.name}" has been loaded.`,
        });
      } catch (error) {
        toast({
          title: "Error Loading Project",
          description: "The saved project could not be loaded.",
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

  // Run the code
  useEffect(() => {
    generateOutput();
  }, []);

  // Layout for mobile and desktop
  return (
    <div className="flex flex-col h-screen bg-background">
      <EditorHeader />
      
      {/* Main Editor Content */}
      <div className="flex-1 overflow-hidden">
        {isMobile ? (
          // Mobile Layout
          <div className="flex flex-col h-full">
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
                    extensions={[html(), editorTheme]}
                    onChange={setHtmlCode}
                    className="code-mirror border"
                  />
                </TabsContent>
                <TabsContent value="css" className="h-full m-0">
                  <CodeMirror
                    value={cssCode}
                    height="100%"
                    extensions={[css(), editorTheme]}
                    onChange={setCssCode}
                    className="code-mirror border"
                  />
                </TabsContent>
                <TabsContent value="js" className="h-full m-0">
                  <CodeMirror
                    value={jsCode}
                    height="100%"
                    extensions={[javascript(), editorTheme]}
                    onChange={setJsCode}
                    className="code-mirror border"
                  />
                </TabsContent>
              </div>
            </Tabs>

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
            </div>

            <div className="flex-1 p-4 pt-0">
              <div className="rounded-md border h-full bg-white overflow-hidden">
                <iframe
                  title="Preview"
                  srcDoc={output}
                  className="w-full h-full"
                  sandbox="allow-scripts allow-popups allow-forms"
                />
              </div>
            </div>
            
            {/* Status Bar */}
            <EditorStatusBar errors={errors} activeTab={activeTab} />
          </div>
        ) : (
          // Desktop Layout
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
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
                      extensions={[html(), editorTheme]}
                      onChange={setHtmlCode}
                      className="code-mirror border"
                    />
                  </TabsContent>
                  <TabsContent value="css" className="h-full m-0">
                    <CodeMirror
                      value={cssCode}
                      height="100%"
                      extensions={[css(), editorTheme]}
                      onChange={setCssCode}
                      className="code-mirror border"
                    />
                  </TabsContent>
                  <TabsContent value="js" className="h-full m-0">
                    <CodeMirror
                      value={jsCode}
                      height="100%"
                      extensions={[javascript(), editorTheme]}
                      onChange={setJsCode}
                      className="code-mirror border"
                    />
                  </TabsContent>
                </div>
                
                <div className="p-4 flex space-x-2">
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
                </div>
                
                {/* Status Bar */}
                <EditorStatusBar errors={errors} activeTab={activeTab} />
              </Tabs>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full p-4">
                <div className="h-full rounded-md border bg-white overflow-hidden">
                  <iframe
                    title="Preview"
                    srcDoc={output}
                    className="w-full h-full"
                    sandbox="allow-scripts allow-popups allow-forms"
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;
