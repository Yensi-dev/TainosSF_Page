/* ── ORBIT CAROUSEL ───────────────────────────────── */
  (function () {
    var services = [
      { icon:'🎯', title:'Landing Pages',     desc:'Páginas de conversión de alto impacto para campañas y lanzamientos' },
      { icon:'🌐', title:'Páginas Web',        desc:'Sitios corporativos modernos y responsivos que proyectan tu marca' },
      { icon:'📱', title:'Apps Móviles',       desc:'iOS y Android nativos o multiplataforma con React Native / Flutter' },
      { icon:'🛍️', title:'E-commerce',        desc:'Tiendas en línea con pagos, inventario y logística local' },
      { icon:'⚙️', title:'Software a Medida', desc:'ERPs, CRMs y sistemas empresariales para tu operación' },
      { icon:'🎨', title:'Branding Digital',   desc:'Identidad visual, UI/UX design y materiales de marca digitales' },
    ];
    var N=services.length, CARD_W=195, CARD_H=140, DURATION=28000;
    var scene=document.getElementById('orbitScene');
    var ring =document.getElementById('orbitRing');
    var hub  =document.getElementById('orbitHub');

    function radius()    { return window.innerWidth<=700?140:290; }
    function sceneSize() { var r=radius(); return (r+CARD_W*0.6+30)*2; }

    function layout() {
      var r=radius(), sz=sceneSize();
      scene.style.width =sz+'px'; scene.style.height=sz+'px';
      var rr=r*2; ring.style.width=rr+'px'; ring.style.height=rr+'px';
      var hs=window.innerWidth<=700?72:114;
      hub.style.width=hs+'px'; hub.style.height=hs+'px';
      hub.querySelector('.hub-emoji').style.fontSize=Math.round(hs*0.33)+'px';
    }

    var cards=services.map(function(s){
      var d=document.createElement('div');
      d.className='orbit-card';
      d.style.width=CARD_W+'px'; d.style.minHeight=CARD_H+'px';
      d.innerHTML='<span class="orbit-card-icon">'+s.icon+'</span>'+
                  '<div class="orbit-card-title">'+s.title+'</div>'+
                  '<div class="orbit-card-desc">'+s.desc+'</div>';
      scene.appendChild(d); return d;
    });

    // ✅ CAMBIO: pausar solo al hacer hover sobre una tarjeta individual
    var paused=false, frozenT=0, startedAt=performance.now();

    cards.forEach(function(card){
      card.addEventListener('mouseenter', function(){
        if(!paused){ frozenT=performance.now()-startedAt; paused=true; }
      });
      card.addEventListener('mouseleave', function(){
        if(paused){ startedAt=performance.now()-frozenT; paused=false; }
      });
    });

    function tick(now){
      layout();
      var r=radius(),sz=sceneSize(),cx=sz/2,cy=sz/2;
      var t=paused?frozenT:(now-startedAt);
      var base=(t/DURATION)*Math.PI*2;
      cards.forEach(function(card,i){
        var a=base+(i/N)*Math.PI*2;
        card.style.left=(cx+r*Math.cos(a)-CARD_W/2)+'px';
        card.style.top =(cy+r*Math.sin(a)-CARD_H/2)+'px';
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ── FAQ ACCORDION ────────────────────────────────── */
  document.querySelectorAll('.lt-faq-question').forEach(function(btn){
    btn.addEventListener('click',function(){
      var item=this.closest('.lt-faq-item');
      var wasOpen=item.classList.contains('open');
      document.querySelectorAll('.lt-faq-item').forEach(function(i){ i.classList.remove('open'); });
      if(!wasOpen){ item.classList.add('open'); }
    });
  });