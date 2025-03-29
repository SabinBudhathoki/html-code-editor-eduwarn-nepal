
// Default code examples
export const DEFAULT_HTML = `<!DOCTYPE html>
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

export const DEFAULT_CSS = `body {
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

export const DEFAULT_JS = `// Wait for the DOM to be fully loaded
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
