// LOADER
window.addEventListener('load',()=>{setTimeout(()=>{document.getElementById('loader').classList.add('hidden');document.body.style.overflow='auto'},2100)});
document.body.style.overflow='hidden';

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
  const p=(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight))*100;
  document.getElementById('scroll-progress').style.width=p+'%';
});

// CURSOR
const cur=document.getElementById('cursor'),fol=document.getElementById('cursorFollower');
let mx=0,my=0,fx=0,fy=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-5+'px';cur.style.top=my-5+'px';});
(function af(){fx+=(mx-fx)*0.12;fy+=(my-fy)*0.12;fol.style.left=fx-19+'px';fol.style.top=fy-19+'px';requestAnimationFrame(af)})();
document.querySelectorAll('a,button,.btn').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='scale(2.2)';fol.style.opacity='0.15'});
  el.addEventListener('mouseleave',()=>{cur.style.transform='scale(1)';fol.style.opacity='0.6'});
});


// MOBILE NAV
document.getElementById('hamburger').addEventListener('click',()=>document.getElementById('mobileNav').classList.add('open'));
document.getElementById('mobileClose').addEventListener('click',closeMobileNav);
function closeMobileNav(){document.getElementById('mobileNav').classList.remove('open')}

// ACTIVE NAV
const secs=document.querySelectorAll('section[id]');
const navAs=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  let cur='';
  secs.forEach(s=>{if(window.scrollY>=s.offsetTop-130)cur=s.getAttribute('id')});
  navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// TYPING
const roles=['Software Developer','Web Developer','UI Designer','Problem Solver','ISE Student'];
let ri=0,ci=0,del=false;
const tel=document.getElementById('typed-text');
function typeIt(){
  const w=roles[ri];
  if(!del){tel.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(typeIt,1800);return}}
  else{tel.textContent=w.slice(0,--ci);if(ci===0){del=false;ri=(ri+1)%roles.length}}
  setTimeout(typeIt,del?55:105);
}
setTimeout(typeIt,2400);

// SCROLL REVEAL
const ro=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:0.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.timeline-item').forEach(el=>ro.observe(el));

// SKILL BARS
const bo=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.querySelectorAll('.skill-bar').forEach(b=>{b.style.width=b.dataset.width+'%'})})},{threshold:0.25});
document.querySelectorAll('.skill-cat').forEach(el=>bo.observe(el));

// FORM VALIDATION
document.getElementById('contactForm').addEventListener('submit',function(e){
  e.preventDefault();let ok=true;
  const fs=[{i:'name',e:'nameErr',c:v=>v.trim().length>=2},{i:'email',e:'emailErr',c:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)},{i:'subject',e:'subjectErr',c:v=>v.trim().length>=2},{i:'message',e:'messageErr',c:v=>v.trim().length>=10}];
  fs.forEach(f=>{const inp=document.getElementById(f.i),err=document.getElementById(f.e);if(!f.c(inp.value)){inp.classList.add('error');err.classList.add('show');ok=false}else{inp.classList.remove('error');err.classList.remove('show')}});
  if(ok){this.reset();document.getElementById('success-popup').classList.add('show')}
});

// RIPPLE
document.querySelectorAll('.btn').forEach(b=>{
  b.addEventListener('click',function(e){
    const r=document.createElement('span'),rect=this.getBoundingClientRect();
    Object.assign(r.style,{position:'absolute',width:'8px',height:'8px',background:'rgba(255,255,255,0.35)',borderRadius:'50%',left:e.clientX-rect.left-4+'px',top:e.clientY-rect.top-4+'px',transform:'scale(0)',animation:'ripple 0.55s ease forwards',pointerEvents:'none'});
    this.appendChild(r);setTimeout(()=>r.remove(),560);
  });
});
const rs=document.createElement('style');rs.textContent='@keyframes ripple{to{transform:scale(22);opacity:0}}';document.head.appendChild(rs);
