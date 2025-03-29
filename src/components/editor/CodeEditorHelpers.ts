
// Generate output HTML content
export const generateOutputContent = (htmlCode: string, cssCode: string, jsCode: string) => {
  return `
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
};

// Helper function to create a downloadable blob
export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  
  URL.revokeObjectURL(url);
};
