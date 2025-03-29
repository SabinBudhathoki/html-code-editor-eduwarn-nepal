
// Basic HTML validator
export const validateHTML = (code: string) => {
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
