const fs = require('fs')

try {
  const content = fs.readFileSync('ex1.js', 'utf8');
  const updatedContent = content.replace('atomic structure is the study of the structure of atoms and the properties of the elements that make up the periodic table.', 'some new text.');
  fs.writeFileSync('ex1.js', updatedContent, 'utf8');
  console.log('done');
} catch (err) {
  console.error('Error:', err);
}
