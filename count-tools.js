const fs = require('fs');
const c = fs.readFileSync('lib/data.ts', 'utf8');
const m = c.match(/\{\s*slug:/g);
console.log('Total tools:', m ? m.length : 0);

// Count categories
const catMatches = c.match(/export const categories: Category\[\] = \[/);
console.log('Categories definition found:', !!catMatches);