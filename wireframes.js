(()=>{
  'use strict';
  let previewMode='desktop';
  function resizePreviews(){
    document.querySelectorAll('.preview').forEach(preview=>{
      const frame=preview.querySelector('iframe');
      const width=previewMode==='mobile'?390:1280;
      const displayWidth=previewMode==='mobile'?Math.min(195,preview.clientWidth):preview.clientWidth;
      const scale=displayWidth/width;
      preview.classList.toggle('is-mobile',previewMode==='mobile');
      frame.style.width=width+'px';
      frame.style.height=Math.ceil(preview.clientHeight/scale)+'px';
      frame.style.transform='scale('+scale+')';
      frame.style.left=((preview.clientWidth-displayWidth)/2)+'px';
    });
  }
  document.querySelectorAll('[data-preview]').forEach(button=>button.addEventListener('click',()=>{
    previewMode=button.dataset.preview;
    document.querySelectorAll('[data-preview]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    resizePreviews();
  }));
  window.addEventListener('resize',resizePreviews);
  resizePreviews();

})();
