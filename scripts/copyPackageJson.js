const fs = require('fs');

// Read package.json
const packageJsonPath = './package.json';
const packageJsonDistPath = './dist/package.json';

fs.readFile(packageJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading package.json:', err);
    process.exit(1);
  }

  try {
    const packageData = JSON.parse(data);
    
    // Remove the "scripts" section
    delete packageData.scripts;

    // Write the new package.json to dist/
    fs.writeFile(packageJsonDistPath, JSON.stringify(packageData, null, 2), (err) => {
      if (err) {
        console.error('Error writing package.json to dist:', err);
        process.exit(1);
      }
      console.log('package.json copied successfully to dist/ without scripts section!');
    });

  } catch (err) {
    console.error('Error parsing package.json:', err);
    process.exit(1);
  }
});
