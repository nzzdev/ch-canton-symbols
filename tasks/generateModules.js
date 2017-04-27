const fs = require('fs');
const path = require('path');

const symbolsPath = 'symbols/13x13';

const files = fs.readdirSync(symbolsPath);
const cantonSymbolFileNames = files.filter(file => {
  return fs.statSync(path.join(symbolsPath, file)).isFile();
})
let cantonSymbols = {};
for (let symbolFileName of cantonSymbolFileNames) {
  cantonSymbols[symbolFileName.replace('.svg', '')] = fs.readFileSync(path.join(symbolsPath, symbolFileName), { encoding: 'utf8' });
}


const cityFiles = fs.readdirSync(path.join(symbolsPath, 'cities'));
const citySymbolFileNames = cityFiles.filter(file => {
  return fs.statSync(path.join(symbolsPath, 'cities', file)).isFile();
})
let citySymbols = {};
for (let symbolFileName of citySymbolFileNames) {
  citySymbols[symbolFileName.replace('.svg', '')] = fs.readFileSync(path.join(symbolsPath, 'cities', symbolFileName), { encoding: 'utf8' });
}


let fileContent = `export const cantons = ${JSON.stringify(cantonSymbols, null, 2)}`;
fileContent += '\n\n';
fileContent += `export const cities = ${JSON.stringify(citySymbols, null, 2)}`;
fs.writeFileSync('symbols.js', fileContent);

let cjsFileContent = `module.exports = {
  cantons: ${JSON.stringify(cantonSymbols, null, 4)},
  cities: ${JSON.stringify(citySymbols, null, 4)}
};
`;
fs.writeFileSync('symbols.cjs.js', cjsFileContent);