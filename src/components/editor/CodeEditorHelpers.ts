
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

export const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
};

export const validateHTML = (htmlCode: string): string[] => {
  const errors: string[] = [];
  const openTags: string[] = [];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  let match;

  while ((match = tagRegex.exec(htmlCode)) !== null) {
    const tag = match[1].toLowerCase();
    const isClosing = match[0].startsWith('</');

    const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
    if (selfClosingTags.includes(tag)) continue;

    if (isClosing) {
      if (openTags.length === 0 || openTags[openTags.length - 1] !== tag) {
        errors.push(`Unexpected closing tag: </${tag}>`);
      } else {
        openTags.pop();
      }
    } else {
      openTags.push(tag);
    }
  }

  openTags.forEach(tag => {
    errors.push(`Unclosed tag: <${tag}>`);
  });

  return errors;
};
