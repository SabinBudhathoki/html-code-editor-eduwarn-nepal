
import { EditorView } from '@codemirror/view';

// Light theme extensions
export const lightTheme = EditorView.theme({
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
    color: '#000' // Setting text color to black for light mode
  }
});

// Dark theme extensions
export const darkTheme = EditorView.theme({
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
    backgroundColor: '#1e1e2e',
    color: '#cdd6f4',
    border: 'none',
  },
  '.cm-activeLine': { 
    backgroundColor: '#313244'
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#313244'
  },
  '.cm-content': {
    color: '#cdd6f4' // Setting text color to light for dark mode
  },
  '.cm-line': {
    color: '#cdd6f4 !important'
  },
  '.cm-cursor': {
    borderLeftColor: '#f5f5f5'
  },
  '.cm-comment': {
    color: '#8087a2 !important'
  },
  '.cm-keyword, .cm-tag': {
    color: '#b4befe !important'
  },
  '.cm-string': {
    color: '#a6e3a1 !important'
  },
  '.cm-number': {
    color: '#fab387 !important'
  },
  '.cm-property': {
    color: '#89dceb !important'
  },
  '.cm-punctuation, .cm-bracket': {
    color: '#bac2de !important'
  }
});

// Function to get the appropriate theme based on dark mode state
export const getEditorTheme = (darkMode: boolean) => {
  return darkMode ? darkTheme : lightTheme;
};
