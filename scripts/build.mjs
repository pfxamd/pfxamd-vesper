import {mkdir, copyFile, rm, readFile, writeFile} from 'node:fs/promises';
import {resolve, join} from 'node:path';
const root = resolve(import.meta.dirname, '..');
const dist = join(root, 'dist');
const files = ['index.html','styles.css','app.mjs','catalog.mjs','store.mjs','favicon.svg','robots.txt'];
await rm(dist, {recursive:true, force:true});
await mkdir(dist, {recursive:true});
for (const file of files) await copyFile(join(root,file),join(dist,file));
const html=await readFile(join(dist,'index.html'),'utf8');
for(const file of ['styles.css','app.mjs','favicon.svg']) if(!html.includes(`./${file}`)) throw new Error(`Missing ${file} reference in HTML`);
// Use a real entry document for static hosts: no rewrite rules or JS build runtime required.
await writeFile(join(dist,'_redirects'),'/* /index.html 200\n');
console.log(`VESPER: built ${files.length} static files in dist/`);
