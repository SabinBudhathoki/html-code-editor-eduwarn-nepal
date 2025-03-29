
import { EditorView } from '@codemirror/view';

// Editor theme extensions
export const editorTheme = EditorView.theme({
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
