// Shared cinematic behaviors: typing, reveal, parallax, and page transitions
(function(){
  const TYPE_TEXT = "Hi — I'm Easa. I build interactive electronics projects and web experiences.";

  function typeText(el, text, speed=36){
    if(!el) return;
    el.textContent = '';
    let i = 0;
    const t = setInterval(()=>{
      el.textContent += text.charAt(i++);
      if(i>text.length-1) clearInterval(t);
    }, speed);
  }

  function revealOnScroll(selector){
    const items = document.querySelectorAll(selector);
    const io = new IntersectionObserver((entries, obs)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          en.target.classList.add('in-view');
          obs.unobserve(en.target);
        }
      });
    },{threshold:0.12});
    items.forEach(i=>io.observe(i));
  }

  function heroParallax(){
    const hero = document.querySelector('.hero');
    if(!hero) return;
    hero.addEventListener('mousemove', (e)=>{
      const rX = (e.clientX - window.innerWidth/2) / (window.innerWidth/30);
      const rY = (e.clientY - window.innerHeight/2) / (window.innerHeight/40);
      hero.style.transform = `translate3d(${rX/8}px, ${rY/12}px, 0)`;
      const title = hero.querySelector('.hero-title');
      if(title) title.style.transform = `translate3d(${rX/4}px, ${rY/6}px, 0)`;
    });
    hero.addEventListener('mouseleave', ()=>{
      hero.style.transform='none';
      const title = hero.querySelector('.hero-title');
      if(title) title.style.transform='none';
    });
  }

  function pageTransitions(){
    document.querySelectorAll('a[href]').forEach(a=>{
      const href = a.getAttribute('href');
      if(!href) return;
      const isLocal = href.startsWith(location.origin) || href.startsWith('/') || href.endsWith('.html') || href.startsWith('#');
      if(!isLocal) return;
      a.addEventListener('click', function(e){
        // allow anchors to scroll
        if(href.startsWith('#')) return;
        e.preventDefault();
        document.body.classList.add('page-exit');
        setTimeout(()=>{ window.location = href; }, 320);
      });
    });
    window.addEventListener('pageshow', ()=>{
      document.body.classList.remove('page-exit');
    });
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    const intro = document.getElementById('intro-text');
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero-title');

    // Start with only the title visible; hide details via CSS. Animate title in first.
    if(hero) hero.classList.remove('revealed');
    if(heroTitle) setTimeout(()=> heroTitle.classList.add('animate-in'), 160);

    // After title animation, reveal the rest (nav, contact, intro)
    const REVEAL_DELAY = 900; // ms after title animation
    setTimeout(()=>{
      if(hero) hero.classList.add('revealed');
      // start typing intro slightly after reveal
      if(intro) setTimeout(()=> typeText(intro, TYPE_TEXT, 34), 220);
    }, REVEAL_DELAY);

    revealOnScroll('.cinematic-panel');
    heroParallax();
    pageTransitions();

    // make chips stagger visible after panel in-view
    document.querySelectorAll('.cinematic-panel').forEach(panel=>{
      const chips = panel.querySelectorAll('.chip');
      if(!chips.length) return;
      panel.addEventListener('transitionend', ()=>{
        chips.forEach((c,i)=>{ c.style.transitionDelay = `${i*70}ms`; c.classList.add('in-view'); });
      });
    });
  });
})();
