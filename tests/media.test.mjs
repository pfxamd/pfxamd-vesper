import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {mediaFor, productMedia} from '../media.mjs';
import {fragrances,discovery} from '../catalog.mjs';
test('every approved asset exists, and each approved product has distinct photography',()=>{
  for(const [id, shots] of Object.entries(productMedia)){
    assert.equal(new Set(Object.values(shots)).size,3);
    for(const filename of Object.values(shots)) assert.ok(existsSync(new URL('../assets/'+filename,import.meta.url)), filename);
    assert.ok(fragrances.some(p=>p.id===id));
  }
});
test('main, detail, and ingredient slots select the correct source',()=>{
  for(const p of fragrances.slice(0,2)){
    assert.match(mediaFor(p,'tile').src, /-main\.webp$/);
    assert.match(mediaFor(p,'large').src, /-main\.webp$/);
    assert.match(mediaFor(p,'detail','DETAIL IMAGE / RESERVED').src, /-detail\.webp$/);
    assert.match(mediaFor(p,'detail','MATERIAL IMAGE / RESERVED').src, /-ingredients\.webp$/);
  }
});
test('unapproved products continue using their existing placeholders',()=>{
  for(const p of fragrances.slice(2)) assert.equal(mediaFor(p,'tile'),null);
  assert.equal(mediaFor(discovery,'feature'),null);
});