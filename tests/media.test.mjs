import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {mediaFor,productMedia,discoveryMedia,editorialMedia} from '../media.mjs';
import {fragrances,discovery,journal} from '../catalog.mjs';
test('all fragrances and discovery slots select distinct approved photography',()=>{
 assert.equal(Object.keys(productMedia).length,fragrances.length);
 for(const p of fragrances){const shots=productMedia[p.id];assert.equal(new Set(Object.values(shots)).size,3);assert.equal(mediaFor(p,'tile').src,shots.main);assert.equal(mediaFor(p,'large').src,shots.main);assert.equal(mediaFor(p,'detail','DETAIL IMAGE / RESERVED').src,shots.detail);assert.equal(mediaFor(p,'detail','MATERIAL IMAGE / RESERVED').src,shots.ingredients);}
 assert.equal(mediaFor(discovery,'feature').src,discoveryMedia.main);
 assert.equal(mediaFor(discovery,'detail','BOX DETAIL / RESERVED').src,discoveryMedia.detail);
 assert.equal(mediaFor(discovery,'detail','SIX VIALS / RESERVED').src,discoveryMedia.vials);
 assert.equal(mediaFor({id:'unknown'},'tile'),null);
});
test('28 unique R2 photographs retain intact original archives and editorial mappings',()=>{
 const archive=new URL('../.github/media-originals/completion/',import.meta.url);
 const manifest=JSON.parse(readFileSync(new URL('manifest.json',archive)));
 const urls=[...Object.values(productMedia).flatMap(Object.values),...Object.values(discoveryMedia),...Object.values(editorialMedia).map(x=>x.src)];
 assert.equal(new Set(urls).size,28);
 for(const src of urls){const url=new URL(src);assert.equal(url.origin,'https://media.pfxamd.com');assert.ok(url.pathname.startsWith('/pfxamd/concepts/vesper/'));const entry=manifest.find(x=>x.url===src);if(entry){const bytes=readFileSync(new URL(encodeURIComponent(entry.name),archive));assert.equal(bytes.length,entry.bytes);assert.equal(createHash('sha256').update(bytes).digest('hex'),entry.sha256);}else assert.ok(existsSync(new URL('../assets/'+url.pathname.split('/').pop(),import.meta.url)));}
 for(const key of ['hero','philosophy','finder','about',...journal.map(x=>x.slug)]){assert.ok(editorialMedia[key].src);assert.ok(editorialMedia[key].alt);}
});
