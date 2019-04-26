var fs = require('fs');

var plantuml = require('node-plantuml');
// plantuml.useNailgun(); // Activate the usage of Nailgun

const SOURCE_PATH = './uml/';
const DEST_PATH = './images/';

console.log(`Listing file in ${SOURCE_PATH}`);
fs.readdirSync(SOURCE_PATH, { withFileTypes: true }).forEach(entry => {
  console.log(entry.name);
  if (entry.isFile() && entry.name.endsWith('.puml')) {
    const inname = entry.name
    const outname = inname.replace(/\.puml$/, '.png');
    const infile = `${SOURCE_PATH}${inname}`;
    const outfile = `${DEST_PATH}${outname}`;
    console.log(`Generating: ${infile} ->  ${outfile}`);
    var gen = plantuml.generate(infile);
    gen.out.pipe(fs.createWriteStream(outfile));
  }
})