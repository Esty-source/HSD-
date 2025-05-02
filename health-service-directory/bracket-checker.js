const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/dashboard/doctor/PrescriptionsSection.jsx');
const content = fs.readFileSync(filePath, 'utf8');

// Split the file into lines
const lines = content.split('\n');

// Track brackets
let openBrackets = 0;
let closeBrackets = 0;
let openParens = 0;
let closeParens = 0;

// Track position of each opening bracket
const bracketPositions = [];

// Process each line
lines.forEach((line, index) => {
  const lineNumber = index + 1;
  
  // Count brackets in this line
  const openBracketsInLine = (line.match(/\{/g) || []).length;
  const closeBracketsInLine = (line.match(/\}/g) || []).length;
  const openParensInLine = (line.match(/\(/g) || []).length;
  const closeParensInLine = (line.match(/\)/g) || []).length;
  
  // Update totals
  openBrackets += openBracketsInLine;
  closeBrackets += closeBracketsInLine;
  openParens += openParensInLine;
  closeParens += closeParensInLine;
  
  // Track positions of opening brackets
  for (let i = 0; i < openBracketsInLine; i++) {
    bracketPositions.push({ line: lineNumber, type: 'open' });
  }
  
  // Track positions of closing brackets
  for (let i = 0; i < closeBracketsInLine; i++) {
    bracketPositions.push({ line: lineNumber, type: 'close' });
  }
  
  // Print running totals
  console.log(`Line ${lineNumber}: Open brackets: ${openBrackets}, Close brackets: ${closeBrackets}, Diff: ${openBrackets - closeBrackets}`);
});

// Final summary
console.log('\nFinal counts:');
console.log(`Open brackets: ${openBrackets}, Close brackets: ${closeBrackets}, Diff: ${openBrackets - closeBrackets}`);
console.log(`Open parentheses: ${openParens}, Close parentheses: ${closeParens}, Diff: ${openParens - closeParens}`);

// Identify where the missing bracket might be needed
if (openBrackets > closeBrackets) {
  console.log('\nMissing closing bracket(s). Check these areas:');
  
  // Find potential locations for missing closing brackets
  const potentialLocations = [];
  let currentOpenBrackets = 0;
  
  bracketPositions.forEach(pos => {
    if (pos.type === 'open') {
      currentOpenBrackets++;
    } else {
      currentOpenBrackets--;
    }
    
    // If we have more open brackets than we should at this point
    if (currentOpenBrackets > openBrackets - closeBrackets) {
      potentialLocations.push(pos.line);
    }
  });
  
  console.log('Potential locations for missing closing brackets near lines:', [...new Set(potentialLocations)]);
}
