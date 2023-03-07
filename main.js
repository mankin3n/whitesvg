const fs = require('fs');
const cheerio = require('cheerio');
const readline = require('readline');

// Create an interface for reading from the console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user for the path to the input SVG file
rl.question('Enter the path to the input SVG file: ', (inputPath) => {
  // Read in the SVG file
  const svgFile = fs.readFileSync(inputPath, 'utf-8');

  // Load the SVG into Cheerio
  const $ = cheerio.load(svgFile, { xmlMode: true });

  // Select all SVG elements
  const svgElements = $('svg *');

  // Set the fill and stroke colors of each element to white
  svgElements.attr({
    fill: '#fff',
    stroke: '#fff'
  });

  // Write out the modified SVG file
  const outputPath = inputPath.replace('.svg', '_white.svg');
  fs.writeFileSync(outputPath, $.html());

  console.log(`Success! The white SVG file has been saved to ${outputPath}`);

  // Close the readline interface
  rl.close();
});
