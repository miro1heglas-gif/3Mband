const C='3mband-v1',SHELL=['./','index.html','songs.json','manifest.json','icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(m=>m||fetch(e.request).then(r=>{
    if(r.ok&&r.status===200){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>m)));
});
