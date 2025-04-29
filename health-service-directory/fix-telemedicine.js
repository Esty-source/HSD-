// This is a temporary script to fix the Telemedicine.jsx file
// Run this script with: node fix-telemedicine.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Telemedicine.jsx');

// Read the file content
let content = fs.readFileSync(filePath, 'utf8');

// Find the second handleFileShare function and remove it
const firstFunctionPos = content.indexOf('const handleFileShare = (e) => {');
const secondFunctionPos = content.indexOf('const handleFileShare = (e) => {', firstFunctionPos + 1);

if (secondFunctionPos !== -1) {
  // Find the end of the second function (closing brace)
  let braceCount = 1;
  let endPos = secondFunctionPos + 'const handleFileShare = (e) => {'.length;
  
  while (braceCount > 0 && endPos < content.length) {
    if (content[endPos] === '{') braceCount++;
    if (content[endPos] === '}') braceCount--;
    endPos++;
  }
  
  // Remove the second function
  content = content.substring(0, secondFunctionPos) + content.substring(endPos);
  
  // Write the fixed content back to the file
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log('Fixed duplicate handleFileShare function in Telemedicine.jsx');
} else {
  console.log('No duplicate handleFileShare function found');
}
