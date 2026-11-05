/* Die Galerie funktioniert auch als lokale Datei; keine Datenübermittlung. */
(()=>{
  'use strict';
  const cards=[...document.querySelectorAll('.board')];
  const dialog=document.getElementById('viewer');
  if(typeof dialog.showModal!=='function')return; // Bildlinks bleiben nutzbar.
  const image=document.getElementById('viewer-img');
  const imageWrap=document.getElementById('viewer-image');
  const heading=document.getElementById('viewer-title');
  const number=document.getElementById('viewer-number');
  const counter=document.getElementById('viewer-counter');
  const original=document.getElementById('viewer-original');
  const zoom=document.getElementById('viewer-zoom');
  const previous=document.getElementById('viewer-previous');
  const next=document.getElementById('viewer-next');
  let current=0;
  function resetZoom(){
    imageWrap.classList.remove('is-zoomed');
    imageWrap.scrollTop=0;imageWrap.scrollLeft=0;
    zoom.setAttribute('aria-pressed','false');
    zoom.textContent='Details vergrößern';
  }
  function show(index){
    current=index;
    const card=cards[index];
    const source=card.querySelector('img');
    image.src=source.getAttribute('src');
    image.alt=source.alt;
    heading.textContent=card.dataset.title;
    number.textContent='Moodboard '+card.dataset.number;
    counter.textContent=(index+1)+' / '+cards.length;
    original.href=source.getAttribute('src');
    previous.disabled=index===0;
    next.disabled=index===cards.length-1;
    resetZoom();
  }
  document.querySelectorAll('[data-view]').forEach(link=>link.addEventListener('click',event=>{
    if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    show(cards.indexOf(link.closest('.board')));
    dialog.showModal();
    document.body.classList.add('viewer-open');
  }));
  previous.addEventListener('click',()=>{if(current>0)show(current-1);});
  next.addEventListener('click',()=>{if(current<cards.length-1)show(current+1);});
  document.getElementById('viewer-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('viewer-open'));
  dialog.addEventListener('click',event=>{
    if(event.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();
  });
  dialog.addEventListener('keydown',event=>{
    if(imageWrap.classList.contains('is-zoomed'))return;
    if(event.key==='ArrowLeft'&&current>0){event.preventDefault();show(current-1);}
    if(event.key==='ArrowRight'&&current<cards.length-1){event.preventDefault();show(current+1);}
  });
  zoom.addEventListener('click',()=>{
    const active=imageWrap.classList.toggle('is-zoomed');
    zoom.setAttribute('aria-pressed',String(active));
    zoom.textContent=active?'Gesamtes Moodboard':'Details vergrößern';
    imageWrap.scrollTop=0;imageWrap.scrollLeft=0;
  });
})();
