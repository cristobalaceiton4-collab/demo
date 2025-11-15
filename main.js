// public/main.js
async function api(path, opts = {}){
opts.headers = opts.headers || {};
opts.headers['Content-Type'] = 'application/json';
const res = await fetch('/api' + path, opts);
return res.json();
}


// Si estamos en index.html, cargar categorías y productos
if (document.querySelector('#products')){
(async ()=>{
const cats = await api('/categories