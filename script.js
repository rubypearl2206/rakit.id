'use strict';
/* ========== DATA ========== */
const WA = '6282132477253';
const FREE_SHIP = 2000000, SHIP = 25000;
const CATS = ['Semua','Processor','VGA','Motherboard','RAM','Storage','PSU','Cooling','Casing','Periferal'];
const ICON = {Processor:'🧠',VGA:'🎮',Motherboard:'🧩',RAM:'💾',Storage:'💽',PSU:'⚡',Cooling:'🧊',Casing:'🖥️',Periferal:'⌨️'};
// [kategori, nama, harga, harga coret (0 = tanpa diskon), spesifikasi]
// ID = urutan baris (1, 2, 3, …). Foto: assets/produk/ID.jpg
const RAW = [
['Processor','AMD Ryzen 5 7600',2899000,3199000,'6 core / 12 thread, AM5'],
['Processor','Intel Core i5-14400F',3350000,0,'10 core, LGA1700'],
['VGA','Gigabyte RTX 4060 Ti Gaming OC 8G',6199000,6799000,'Triple fan, DLSS 3'],
['VGA','ASRock RX 7600 Challenger OC 8GB',3799000,0,'Dual fan, 1080p'],
['Motherboard','Gigabyte B650M K',1999000,2250000,'mATX, DDR5, AM5'],
['RAM','XPG Lancer Blade DDR5 RGB 16GB',899000,0,'6000MHz, RGB'],
['Storage','Samsung 980 PRO 1TB NVMe',1699000,1899000,'PCIe 4.0, 7000 MB/s'],
['PSU','PSU Prime 80+ Gold Modular',1049000,0,'Full modular'],
['Cooling','DeepCool AG620 ARGB',459000,0,'Dual tower, 6 heatpipe'],
['Casing','Casing ATX Mesh ARGB',799000,899000,'Kaca samping, 4 fan'],
['Periferal','Ducky One 3 SF 65% RGB',1899000,0,'Hot-swap, RGB'],
['Periferal','Monitor Digital Alliance 165Hz',1799000,1999000,'IPS, 1ms, FreeSync'],
['Processor','AMD Ryzen 5 5600',1550000,0,'6 core / 12 thread, AM4'],
['Processor','AMD Ryzen 7 7800X3D',6499000,6999000,'8 core, 3D V-Cache, AM5'],
['Processor','Intel Core i3-12100F',1450000,0,'4 core / 8 thread, LGA1700'],
['Processor','Intel Core i7-14700K',6899000,7599000,'20 core, unlocked, LGA1700'],
['VGA','MSI GeForce RTX 3050 Ventus 2X 6G',2549000,0,'6GB GDDR6, dual fan'],
['VGA','ASUS Dual RTX 4070 Super 12GB',10499000,11299000,'12GB GDDR6X, DLSS 3'],
['VGA','Sapphire Pulse RX 7800 XT 16GB',7999000,8499000,'16GB GDDR6, 1440p'],
['VGA','Intel Arc B580 Limited Edition 12GB',3999000,0,'12GB GDDR6, XeSS'],
['Motherboard','MSI PRO H610M-E DDR4',1149000,0,'mATX, DDR4, LGA1700'],
['Motherboard','ASRock B550M Pro4',1699000,1850000,'mATX, DDR4, AM4'],
['Motherboard','ASUS TUF Gaming B760M-Plus WiFi D4',2899000,0,'mATX, DDR4, WiFi'],
['Motherboard','MSI MAG X670E Tomahawk WiFi',4999000,5499000,'ATX, DDR5, PCIe 5.0'],
['RAM','Kingston Fury Beast DDR4 16GB 3200MHz',579000,0,'1x16GB, CL16'],
['RAM','G.Skill Ripjaws V DDR4 16GB 3200MHz',599000,649000,'2x8GB, CL16'],
['RAM','Corsair Vengeance DDR5 32GB 6000MHz',2099000,2299000,'2x16GB, CL36'],
['RAM','TeamGroup T-Force Delta RGB DDR5 32GB',2199000,0,'2x16GB, 6000MHz'],
['Storage','WD Blue SN580 1TB NVMe',1099000,1249000,'PCIe 4.0, 4150 MB/s'],
['Storage','Kingston NV2 500GB NVMe',599000,0,'PCIe 4.0, 3500 MB/s'],
['Storage','Crucial P3 Plus 2TB NVMe',2399000,2699000,'PCIe 4.0, 5000 MB/s'],
['Storage','Samsung 870 EVO 1TB SATA',1549000,0,'2.5", 560 MB/s'],
['Storage','Seagate Barracuda 2TB HDD',1049000,0,'3.5", 7200 RPM'],
['PSU','Corsair CX650 80+ Bronze',949000,0,'650W, non-modular'],
['PSU','Cooler Master MWE 550 Bronze V2',729000,0,'550W, 80+ Bronze'],
['PSU','MSI MAG A750GL PCIe5',1599000,1749000,'750W, 80+ Gold, ATX 3.0'],
['PSU','Seasonic Focus GX-750',2099000,0,'750W, 80+ Gold, full modular'],
['Cooling','Cooler Master Hyper 212 Black',449000,0,'Tower, 4 heatpipe'],
['Cooling','DeepCool LS520 SE 240mm AIO',1149000,1299000,'Liquid cooler, ARGB'],
['Cooling','Arctic Liquid Freezer II 240',1499000,0,'AIO 240mm'],
['Cooling','Noctua NH-D15 chromax.black',1999000,0,'Dual tower, 2 fan'],
['Casing','NZXT H510 Flow',1249000,0,'ATX mid-tower, mesh'],
['Casing','Corsair 4000D Airflow',1399000,1499000,'ATX mid-tower'],
['Casing','Lian Li Lancool 216',1599000,0,'ATX, 2 fan 160mm'],
['Casing','Cooler Master MasterBox Q300L',729000,0,'mATX, kaca akrilik'],
['Periferal','Logitech G102 Lightsync',259000,299000,'Mouse gaming, 8000 DPI'],
['Periferal','Razer DeathAdder Essential',399000,0,'Mouse gaming, 6400 DPI'],
['Periferal','HyperX Cloud II',1349000,1499000,'Headset, 7.1 surround'],
['Periferal','Keychron K2 V2',1649000,0,'Wireless, hot-swap, 75%'],
['Periferal','LG 24GN600 24" 144Hz',2099000,2299000,'IPS, 1ms, FreeSync']
];
// rating & jumlah terjual dibuat tetap (deterministik) dari ID
const P = RAW.map(([cat,name,price,old,spec],i)=>{const id=i+1;
  return {id,cat,name,price,old,spec,rating:(4.5+(id*7%5)/10).toFixed(1),sold:300+id*911%3000}});
const byId = id => P.find(p=>p.id==id);

/* ========== HELPER ========== */
const $ = s => document.querySelector(s);
const rp = n => 'Rp'+n.toLocaleString('id-ID');
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const waLink = m => `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
const read = (k,d) => {try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}};
const write = (k,v) => {try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
function toast(m){const t=$('#ts');t.textContent=m;t.style.display='block';clearTimeout(toast.id);toast.id=setTimeout(()=>t.style.display='none',2200)}
const img = (p,fallback) => `<img src="assets/produk/${p.id}.jpg" alt="${fallback?'':esc(p.name)}" loading="lazy" onerror="this.remove()">`;

/* ========== STATE ========== */
let cat = 'Semua', user = null;
let cart = read('rk_c',{});
let reviews = read('rk_t',[
 ['Dimas','5','Rakitan pertama saya sukses. Admin sabar menjelaskan kompatibilitas, barang sampai aman.'],
 ['Salsa','5','Harga SSD paling murah yang saya temukan, pengiriman cepat dan packing tebal.'],
 ['Rizky','4','RTX 4060 original dan bergaransi. Respons WhatsApp cepat.']]);

/* ========== PRODUK ========== */
function renderCats(){
 $('#cats').innerHTML = CATS.map(c=>`<button class="chip" data-cat="${c}" aria-pressed="${c===cat}">${c}</button>`).join('')}
function renderGrid(){
 const q=$('#q').value.trim().toLowerCase(), s=$('#so').value;
 const list=P.filter(p=>(cat==='Semua'||p.cat===cat)&&`${p.name} ${p.cat} ${p.spec}`.toLowerCase().includes(q))
  .sort((a,b)=>s==='l'?a.price-b.price:s==='h'?b.price-a.price:s==='r'?b.rating-a.rating:b.sold-a.sold);
 $('#cnt').textContent=list.length+' produk';
 $('#gr').innerHTML=list.length?list.map(p=>`
  <div class="card"><div class="thumb">${ICON[p.cat]}${img(p)}${p.old?`<span class="tag">-${Math.round((1-p.price/p.old)*100)}%</span>`:''}</div>
  <div class="in"><span class="meta">${p.cat}</span><h3>${esc(p.name)}</h3><span class="meta">${esc(p.spec)}</span>
  <span class="meta">⭐ ${p.rating} · ${p.sold.toLocaleString('id-ID')} terjual</span>
  <div class="price">${rp(p.price)}${p.old?`<s>${rp(p.old)}</s>`:''}</div>
  <div class="acts"><button class="btn" data-buy="${p.id}">Pesan sekarang</button><button class="btn ghost" data-add="${p.id}">+ Keranjang</button></div></div></div>`).join('')
  :'<div class="empty">Produk tidak ditemukan. Coba kata kunci lain atau pilih kategori Semua.</div>'}
function renderReviews(){
 $('#tl').innerHTML=reviews.map(t=>`<div class="t"><div class="st">${'★'.repeat(+t[1])}${'☆'.repeat(5-t[1])}</div><p>${esc(t[2])}</p><b>${esc(t[0])}</b></div>`).join('')}

/* ========== KERANJANG ========== */
const ids = () => Object.keys(cart).filter(k=>cart[k]>0);
let unsel = {}; // id yang TIDAK dipilih untuk checkout (default: semua dipilih)
const sel = () => ids().filter(k=>!unsel[k]);
const subtotal = () => sel().reduce((a,k)=>a+byId(k).price*cart[k],0);
let direct = null; // id produk kalau pakai "Pesan sekarang" (1 produk saja, isi keranjang tidak ikut)
const orderIds = () => direct?[direct]:sel();
const qtyOf = k => direct?1:cart[k];
const orderSub = () => orderIds().reduce((a,k)=>a+byId(k).price*qtyOf(k),0);
const shipping = () => orderSub()>=FREE_SHIP?0:SHIP;
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0){delete cart[id];delete unsel[id]}renderCart()}
function renderCart(){
 const l=ids(),n=sel().length;
 $('#cn').textContent=l.reduce((a,k)=>a+cart[k],0);
 $('#dr').innerHTML=`<div class="dh"><h3>Keranjang</h3><button class="ib" data-close="cart" aria-label="Tutup">✕</button></div>
 ${l.length?`<label class="selall"><input type="checkbox" data-all ${n===l.length?'checked':''}> Pilih semua (${n}/${l.length})</label>`:''}
 <div class="items">${l.length?l.map(k=>{const p=byId(k);return `<div class="ci"><input type="checkbox" data-sel="${k}" ${unsel[k]?'':'checked'} aria-label="Pilih ${esc(p.name)}"><span class="e">${ICON[p.cat]}${img(p,1)}</span>
  <div><b>${esc(p.name)}</b><br>${rp(p.price)}</div>
  <span class="q"><button data-dec="${k}" aria-label="Kurangi">−</button>${cart[k]}<button data-inc="${k}" aria-label="Tambah">+</button></span></div>`}).join('')
  :'<div class="empty">Keranjang masih kosong. Pilih produk dulu.</div>'}</div>
 <div class="tot"><span>Total (${n} dipilih)</span><span>${rp(subtotal())}</span></div>
 <button class="btn" data-checkout ${n?'':'disabled'}>Checkout${n?` (${n})`:''}</button>`;
 write('rk_c',cart)}
const openDrawer = on => $('#dr').classList.toggle('on',on);
const openModal = h => {$('#md').innerHTML=h;$('#ov').classList.add('on')};
const closeModal = () => $('#ov').classList.remove('on');

/* ========== AKUN ========== */
const BLOCKED = ['example.com','example.org','test.com','tes.com','fake.com','email.com','mail.com','asdf.com','abc.com','mailinator.com','yopmail.com','tempmail.com','10minutemail.com','guerrillamail.com','trashmail.com'];
const TYPOS = {'gmial.com':'gmail.com','gmai.com':'gmail.com','gmail.co':'gmail.com','gamil.com':'gmail.com','gnail.com':'gmail.com','yaho.com':'yahoo.com','yahooo.com':'yahoo.com','hotmial.com':'hotmail.com','outlok.com':'outlook.com'};
function checkEmail(e){
 if(!/^[a-z0-9](?:[a-z0-9._%+-]{1,62})@(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(e)||/\.\./.test(e)||/\.@/.test(e))return 'Format email tidak valid. Pakai format nama@gmail.com';
 const [local,dom]=e.toLowerCase().split('@');
 if(TYPOS[dom])return `Domain "${dom}" sepertinya salah ketik. Maksudmu ${local}@${TYPOS[dom]}?`;
 if(BLOCKED.includes(dom))return 'Gunakan email aktif milikmu, bukan email asal-asalan atau sementara.';
 if(/^(.)\1+$/.test(local)||/^(test|tes|asdf|qwer|abc|abcd|aaa|xxx|admin|user|email)\d*$/.test(local))return 'Bagian depan email terlihat asal-asalan. Pakai email aslimu.';
 return ''}
async function hash(s){
 try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode('rakit.id|'+s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
 catch(e){return btoa(unescape(encodeURIComponent(s)))}}
const users = () => read('rk_u',[]);
function login(n,e){const u=users().find(x=>x.e===e);user={n,e,a:(u&&u.a)||''};write('rk_s',user);renderUserBtn();$('#kn').value=n}
function logout(){user=null;try{localStorage.removeItem('rk_s')}catch(e){}renderUserBtn();toast('Kamu sudah keluar.')}
function renderUserBtn(){
 $('#lg').innerHTML=user?`<span class="mini">${avatar(user.a)}</span><span class="tx"> ${esc(user.n)}</span>`:'👤<span class="tx"> Masuk</span>';
 $('#lg').title=user?'Profil saya':''}

/* ========== PROFIL & AVATAR ========== */
// [warna latar, warna kulit, warna rambut/topi, model]
const AVD=[['#ffd1dc','#ffd9b8','#3b2a20',0],['#bcd7ee','#f1c8a0','#2b1b14',1],['#d9f0c8','#e8b88a','#7a3b1d',2],['#fde2a6','#ffd9b8','#c0392b',3],['#e6d4ff','#c98f66','#1d1d1d',4],['#ffd9c2','#f6d5b5','#ff7eb6',5],['#cfe8ff','#a8734a','#5a3a22',6],['#f4c0cf','#ffe0c2','#2b2340',7],['#c8f0e0','#d9a077','#e0a030',8],['#fff0b8','#ffd9b8','#6b1b22',1],['#d6d1ff','#f1c8a0','#2b6cb0',0],['#ffd1dc','#8d5a3b','#111111',4]];
function svgAv(i){
 const [bg,sk,hc,m]=AVD[i];
 const back={1:`<path d="M20 64V50a30 30 0 0 1 60 0v14c0 12-5 20-5 20H25s-5-8-5-20z" fill="${hc}"/>`,
  5:`<path d="M26 40L30 14L46 30zM74 40L70 14L54 30z" fill="${sk}" stroke="#2b2340" stroke-width="2"/>`,
  6:`<circle cx="30" cy="32" r="10" fill="${sk}"/><circle cx="70" cy="32" r="10" fill="${sk}"/>`}[m]||'';
 const cap=`<path d="M24 52a26 26 0 0 1 52 0c-10-10-42-10-52 0z" fill="${hc}"/>`;
 const front={0:cap,1:`<path d="M24 54a26 26 0 0 1 52 0c-6-8-14-12-26-12s-20 4-26 12z" fill="${hc}"/>`,
  2:`<circle cx="50" cy="20" r="10" fill="${hc}"/>`+cap,
  3:`<path d="M24 50a26 26 0 0 1 52 0z" fill="${hc}"/><path d="M50 50h34a8 5 0 0 1-8 5H50z" fill="${hc}"/>`,
  4:[28,40,50,60,72].map((x,j)=>`<circle cx="${x}" cy="${j%2?30:36}" r="11" fill="${hc}"/>`).join(''),
  7:cap+`<g fill="none" stroke="${hc}" stroke-width="2.5"><circle cx="41" cy="55" r="8"/><circle cx="59" cy="55" r="8"/><path d="M49 55h2"/></g>`,
  8:`<path d="M24 50l6-22 8 14 8-20 8 20 8-14 6 22z" fill="${hc}"/>`}[m]||'';
 return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Avatar kartun"><rect width="100" height="100" fill="${bg}"/>${back}<path d="M14 100c0-22 16-30 36-30s36 8 36 30z" fill="#6b1b22"/><circle cx="50" cy="55" r="26" fill="${sk}"/><g fill="#2b2340"><circle cx="41" cy="55" r="3"/><circle cx="59" cy="55" r="3"/></g><g fill="#ff9ec4" opacity=".7"><circle cx="35" cy="63" r="4"/><circle cx="65" cy="63" r="4"/></g><path d="M43 65q7 7 14 0" fill="none" stroke="#2b2340" stroke-width="2.5" stroke-linecap="round"/>${front}</svg>`}
const avatar = a => !a?'👤':a.startsWith('data:')?`<img src="${a}" alt="Foto profil">`:svgAv(+a.slice(4));
let draftA='';
const drawPv = () => {$('#pv').innerHTML=avatar(draftA);document.querySelectorAll('.avb').forEach(b=>b.setAttribute('aria-pressed',draftA==='svg:'+b.dataset.av))};
function profile(){
 draftA=user.a||'';
 openModal(`<h3>Profil saya</h3><div class="pv" id="pv"></div><p class="meta" style="text-align:center;margin:0">${esc(user.e)}</p>
 <label for="pn">Nama</label><input id="pn" maxlength="30" value="${esc(user.n)}">
 <div class="prow"><button type="button" class="btn ghost" data-up>📷 Unggah foto</button><button type="button" class="btn ghost" data-rm>Hapus foto</button></div>
 <input type="file" id="pf" accept="image/*" hidden>
 <label>Atau pilih avatar kartun</label>
 <div class="avs">${AVD.map((_,i)=>`<button type="button" class="avb" data-av="${i}" aria-label="Avatar ${i+1}">${svgAv(i)}</button>`).join('')}</div>
 <p class="err" id="pe" role="alert"></p>
 <button type="button" class="btn full" data-save>Simpan</button>
 <button type="button" class="btn ghost full" style="margin-top:8px" data-logout>Keluar</button>`);
 drawPv()}
function pickFile(f){
 if(!f)return;
 if(!f.type.startsWith('image/'))return $('#pe').textContent='File harus berupa gambar.';
 if(f.size>8*1024*1024)return $('#pe').textContent='Ukuran foto maksimal 8 MB.';
 const im=new Image(),url=URL.createObjectURL(f);
 im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=200;const s=Math.min(im.width,im.height);
  c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,200,200);
  draftA=c.toDataURL('image/jpeg',.85);URL.revokeObjectURL(url);$('#pe').textContent='';drawPv()};
 im.onerror=()=>{URL.revokeObjectURL(url);$('#pe').textContent='Foto tidak bisa dibuka. Coba file lain.'};
 im.src=url}
function saveProfile(){
 const n=$('#pn').value.trim();
 if(n.length<2)return $('#pe').textContent='Nama minimal 2 karakter.';
 user.n=n;user.a=draftA;
 const list=users(),u=list.find(x=>x.e===user.e);if(u){u.n=n;u.a=draftA;write('rk_u',list)}
 write('rk_s',user);renderUserBtn();$('#kn').value=n;closeModal();toast('Profil disimpan')}
function pwField(id,ph=''){return `<div class="pw"><input type="password" id="${id}" required minlength="6" autocomplete="${id==='ap'?'current-password':'new-password'}" placeholder="${ph}"><button type="button" data-eye="${id}" aria-label="Lihat kata sandi" title="Lihat / sembunyikan">👁️</button></div>`}
function auth(tab,after){
 const up=tab==='up';
 openModal(`${after?'<p class="meta" style="margin:0 0 8px">Kamu perlu akun dulu untuk checkout.</p>':''}
 <div class="tabs"><button class="chip" data-tab="in" aria-pressed="${!up}">Masuk</button><button class="chip" data-tab="up" aria-pressed="${up}">Daftar</button></div>
 <form id="af" novalidate>${up?'<label for="an">Nama</label><input id="an" required maxlength="30" autocomplete="name">':''}
 <label for="ae">Email</label><input type="email" id="ae" required autocomplete="email" placeholder="nama@gmail.com">
 <label for="ap">Kata sandi</label>${pwField('ap',up?'Minimal 6 karakter':'')}
 ${up?`<label for="ap2">Ulangi kata sandi</label>${pwField('ap2')}`:''}
 <p class="err" id="er" role="alert"></p><button class="btn full">${up?'Buat akun':'Masuk'}</button></form>`);
 $('#af').onsubmit=async ev=>{ev.preventDefault();
  const err=m=>{$('#er').textContent=m};
  const em=$('#ae').value.trim().toLowerCase(),pw=$('#ap').value,list=users(),found=list.find(u=>u.e===em);
  const bad=checkEmail(em);if(bad)return err(bad);
  if(pw.length<6)return err('Kata sandi minimal 6 karakter.');
  const h=await hash(pw);
  if(up){
   const n=$('#an').value.trim();
   if(n.length<2)return err('Isi nama kamu.');
   if(pw!==$('#ap2').value)return err('Kata sandi tidak sama.');
   if(found)return err('Email ini sudah terdaftar. Coba masuk.');
   list.push({n,e:em,p:h});write('rk_u',list);login(n,em);closeModal();toast('Akun dibuat. Selamat datang, '+n+'!');
  }else{
   if(!found||found.p!==h)return err('Email atau kata sandi salah.');
   login(found.n,em);closeModal();toast('Halo lagi, '+found.n+'!');
  }
  if(after)after()}}

/* ========== CHECKOUT ========== */
function checkout(){
 if(!orderIds().length){toast('Pilih dulu produk yang mau di-checkout');return}
 if(!user){openDrawer(false);auth('in',checkout);return}
 const ship=shipping(),total=orderSub()+ship;
 const methods=['Transfer BCA','Transfer Mandiri','QRIS','GoPay','OVO','DANA','ShopeePay','Bayar di tempat'];
 openModal(`<h3>Checkout</h3><p class="meta" style="margin:4px 0 0">Pesanan: ${orderIds().map(k=>esc(byId(k).name)+' ×'+qtyOf(k)).join(', ')}</p><form id="cf"><label for="cnm">Nama penerima</label><input id="cnm" required value="${esc(user.n)}">
 <label for="cph">No. WhatsApp</label><input id="cph" required inputmode="tel" placeholder="08xx" pattern="^(\\+62|62|0)8[0-9]{8,12}$" title="Nomor HP Indonesia, seperti 081234567890">
 <label for="cad">Alamat lengkap</label><textarea id="cad" rows="2" required minlength="10"></textarea>
 <label>Metode pembayaran</label><div class="pay">${methods.map((m,i)=>`<label><input type="radio" name="pm" value="${m}" ${i?'':'checked'}>${m}</label>`).join('')}</div>
 <div class="tot" style="margin-top:14px"><span>Subtotal</span><span>${rp(orderSub())}</span></div>
 <div class="tot light"><span>Ongkir</span><span>${ship?rp(ship):'Gratis'}</span></div>
 <div class="tot"><span>Total bayar</span><span>${rp(total)}</span></div>
 <button class="btn full">Bayar sekarang</button></form>`);
 $('#cf').onsubmit=e=>{e.preventDefault();
  const f=$('#cf'),m=f.pm.value,no='RK'+Date.now().toString().slice(-7);
  const chosen=orderIds();
  const lines=chosen.map(k=>{const p=byId(k);return `- ${p.name} x${qtyOf(k)} (${rp(p.price*qtyOf(k))})`}).join('\n');
  const msg=`Halo Rakit.id, saya mau konfirmasi pesanan ${no}:\n${lines}\nTotal: ${rp(total)}\nNama: ${$('#cnm').value}\nWA: ${$('#cph').value}\nAlamat: ${$('#cad').value}\nBayar: ${m}`;
  const info=m==='Bayar di tempat'?'Siapkan uang pas saat kurir tiba.':'Detail pembayaran dikirim lewat WhatsApp. Tekan tombol di bawah untuk konfirmasi.';
  openModal(`<h3>Pesanan diterima ✅</h3><p>Nomor pesanan <b>${no}</b><br>Metode: ${esc(m)}<br>${info}</p>
   <a class="btn alt full" target="_blank" rel="noopener" href="${waLink(msg)}">Konfirmasi via WhatsApp</a>
   <button class="btn full" style="margin-top:8px" data-close="modal">Selesai</button>`);
  if(!direct)chosen.forEach(k=>{delete cart[k];delete unsel[k]});direct=null;renderCart()}}

/* ========== EVENT ========== */
document.addEventListener('click',e=>{
 if(e.target===$('#ov'))return closeModal();
 const t=e.target.closest('button');if(!t)return;
 const d=t.dataset;
 if(d.cat){cat=d.cat;renderCats();renderGrid()}
 else if(d.buy){direct=d.buy;checkout()}
 else if(d.add){changeQty(d.add,1);toast('Masuk keranjang')}
 else if(d.inc)changeQty(d.inc,1);
 else if(d.dec)changeQty(d.dec,-1);
 else if(d.close==='cart')openDrawer(false);
 else if(d.close==='modal')closeModal();
 else if('checkout' in d){openDrawer(false);direct=null;checkout()}
 else if(d.tab)auth(d.tab);
 else if(d.av!==undefined){draftA='svg:'+d.av;drawPv()}
 else if('up' in d)$('#pf').click();
 else if('rm' in d){draftA='';drawPv()}
 else if('save' in d)saveProfile();
 else if('logout' in d){closeModal();logout()}
 else if(d.eye){const i=$('#'+d.eye),show=i.type==='password';i.type=show?'text':'password';t.textContent=show?'🙈':'👁️';t.setAttribute('aria-label',show?'Sembunyikan kata sandi':'Lihat kata sandi')}
});
document.addEventListener('change',e=>{
 const t=e.target;
 if('sel' in t.dataset){unsel[t.dataset.sel]=!t.checked;renderCart()}
 else if('all' in t.dataset){ids().forEach(k=>{unsel[k]=!t.checked});renderCart()}
 else if(t.id==='pf')pickFile(t.files[0]);
});
$('#cb').onclick=()=>openDrawer(true);
$('#lg').onclick=()=>user?profile():auth('in');
$('#th').onclick=()=>{const d=document.documentElement;d.dataset.theme=d.dataset.theme==='dark'?'light':'dark'};
$('#q').oninput=()=>{renderGrid();if($('#q').value)$('#produk').scrollIntoView()};
$('#so').onchange=renderGrid;
$('#tf').onsubmit=e=>{e.preventDefault();reviews.unshift([$('#tn').value.trim(),$('#tr').value,$('#tt').value.trim()]);write('rk_t',reviews);renderReviews();e.target.reset();toast('Terima kasih atas testimonimu!')};
$('#kf').onsubmit=e=>{e.preventDefault();window.open(waLink(`Halo Rakit.id, saya ${$('#kn').value}.\n${$('#kp').value}`),'_blank','noopener');e.target.reset();toast('Membuka WhatsApp…')};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();openDrawer(false)}});

/* ========== MUSIK ========== */
// Pakai file assets/musik.mp3 kalau ada. Kalau tidak ada, diputar musik santai buatan sendiri (tanpa file).
let musicOn=false,mus=null,ac=null,mo=null,tm=null;
function unlockAudio(){ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume()}
function synthStart(){
 if(tm)return;
 unlockAudio();
 mo=ac.createGain();mo.gain.value=.5;mo.connect(ac.destination);
 const hz=m=>440*Math.pow(2,(m-69)/12);
 const tone=(m,t,d,type,v)=>{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=hz(m);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.04);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(mo);o.start(t);o.stop(t+d+.05)};
 const chords=[[48,55,59,64],[45,52,60,64],[41,48,57,60],[43,50,53,59]];
 const mel=[72,76,79,76,74,72,69,72, 69,72,76,72,71,69,67,69, 65,69,72,69,67,65,64,65, 67,71,74,71,69,67,71,74];
 let next=ac.currentTime+.1,b=0;
 const sched=()=>{while(next<ac.currentTime+1.5){
  const c=chords[b%4];
  c.forEach(n=>tone(n,next,2,'triangle',.2));
  for(let k=0;k<4;k++)tone(c[0]-12,next+k*.5,.45,'sine',.35);
  for(let j=0;j<8;j++)if((j+b)%3!==2)tone(mel[(b%4)*8+j],next+j*.25,.4,'sine',.2);
  next+=2;b++}};
 sched();tm=setInterval(sched,400)}
function synthStop(){if(!tm)return;clearInterval(tm);tm=null;const g=mo;g.gain.setTargetAtTime(0,ac.currentTime,.15);setTimeout(()=>g.disconnect(),800)}
function updMu(){const b=$('#mu');b.textContent=musicOn?'🔊':'🔇';b.setAttribute('aria-pressed',musicOn);b.title=b.ariaLabel=musicOn?'Matikan musik':'Nyalakan musik'}
function musicStart(){
 musicOn=true;updMu();
 try{unlockAudio()}catch(e){}
 const fb=()=>{mus=false;if(musicOn)synthStart()};
 if(mus===null){mus=new Audio('assets/musik.mp3');mus.loop=true;mus.volume=.4;mus.onerror=fb}
 if(mus)mus.play().catch(fb);else synthStart()}
function musicStop(){musicOn=false;updMu();if(mus)mus.pause();synthStop()}
$('#mu').onclick=()=>{musicOn?musicStop():musicStart();write('rk_m',musicOn?'on':'off')};
// browser melarang suara otomatis, jadi musik mulai saat pengunjung pertama kali menyentuh halaman
const firstTouch=e=>{['click','touchend','keydown'].forEach(v=>document.removeEventListener(v,firstTouch));
 if(e.target.closest&&e.target.closest('#mu'))return;
 if(read('rk_m','on')!=='off'&&!musicOn)musicStart()};
['click','touchend','keydown'].forEach(v=>document.addEventListener(v,firstTouch));

/* ========== INIT ========== */
$('#wa1').href=$('#wa2').href=waLink('Halo Rakit.id, saya mau tanya soal komponen PC.');
renderCats();renderGrid();renderReviews();renderCart();updMu();
const saved=read('rk_s',null);if(saved)login(saved.n,saved.e);