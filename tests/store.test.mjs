import test from 'node:test';
import assert from 'node:assert/strict';
import {fragrances,discovery,priceOf,productById,cartSubtotal,quote,shippingOf} from '../catalog.mjs';
import {loadStore,saveStore,addCart,updateQuantity,toggleWish,orderNumber} from '../store.mjs';

function fakeStorage(){const values=new Map();globalThis.localStorage={getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k)};return values;}
test('six unique perfumes and one discovery set',()=>{
  assert.equal(fragrances.length,6);
  assert.equal(new Set(fragrances.map(p=>p.id)).size,6);
  assert.equal(new Set(fragrances.map(p=>p.name)).size,6);
  for(const p of fragrances){assert.ok(p.price>=100);assert.equal(p.notes.length,3);assert.ok(productById(p.pair));assert.equal(priceOf(p,50),p.price);assert.ok(priceOf(p,15)<p.price);assert.ok(priceOf(p,100)>p.price);}
  assert.equal(priceOf(discovery,0),38);
});
test('storage is resilient to malformed payloads',()=>{
  const storage=fakeStorage();storage.set('vesper-store-v1','bad JSON');assert.deepEqual(loadStore().cart,[]);
  storage.set('vesper-store-v1',JSON.stringify({cart:[{id:'bad',size:50,quantity:1},{id:'sable',size:99,quantity:3},{id:'sable',size:50,quantity:2}],wishlist:['bad','lune-i']}));
  assert.equal(loadStore().cart.length,1);assert.deepEqual(loadStore().wishlist,['lune-i']);
});
test('cart variants, updating, limits and persistence',()=>{
  fakeStorage();const s=loadStore();
  addCart(s,'sable',50,2);addCart(s,'sable',15,1);addCart(s,'sable',50,3);
  assert.equal(s.cart.length,2);assert.equal(s.cart.find(x=>x.size===50).quantity,5);
  assert.equal(cartSubtotal(s.cart),120*5+priceOf(productById('sable'),15));
  updateQuantity(s,'sable',50,18);assert.equal(s.cart.find(x=>x.size===50).quantity,10);
  updateQuantity(s,'sable',15,0);assert.equal(s.cart.length,1);
  assert.deepEqual(loadStore().cart,s.cart);
  addCart(s,'bogus',50);assert.equal(s.cart.length,1);
  addCart(s,'discovery-set',0);assert.equal(s.cart.length,2);
});
test('wishlist toggles and survives reload',()=>{
  fakeStorage();const s=loadStore();toggleWish(s,'cendre');assert.deepEqual(loadStore().wishlist,['cendre']);toggleWish(s,'cendre');assert.deepEqual(loadStore().wishlist,[]);
});
test('discount, shipping and totals use the same quote',()=>{
  assert.equal(shippingOf(120),8);assert.equal(shippingOf(150),0);assert.equal(shippingOf(175,'express'),18);
  const bag=[{id:'sable',size:50,quantity:1},{id:'lune-i',size:50,quantity:1}];
  assert.deepEqual(quote(bag),{subtotal:230,discount:0,shipping:0,total:230,validPromo:false});
  assert.deepEqual(quote(bag,'MAISON10','express'),{subtotal:230,discount:23,shipping:18,total:225,validPromo:true});
  assert.deepEqual(quote([{id:'sable',size:50,quantity:1}],'MAISON10'),{subtotal:120,discount:12,shipping:8,total:116,validPromo:true});
});
test('order reference is well formed',()=>{
  assert.match(orderNumber(),/^VS-[0-9A-Z]+-[0-9A-Z]{3}$/);
});
