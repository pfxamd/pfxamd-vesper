import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {extname,join,resolve,sep} from 'node:path';
const root = resolve(import.meta.dirname,'..');
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html','.css':'text/css','.mjs':'text/javascript','.svg':'image/svg+xml','.txt':'text/plain'};
createServer(async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  const filename=resolve(root,'.'+decodeURIComponent(pathname==='/'?'/index.html':pathname));
  if(!filename.startsWith(root+sep)){res.writeHead(403);res.end('Forbidden');return;}
  try {const contents=await readFile(filename);res.writeHead(200,{'Content-Type':types[extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(contents)}
  catch {res.writeHead(404);res.end('Not found')}
}).listen(port,'127.0.0.1',()=>console.log(`VESPER on http://127.0.0.1:${port}`));
