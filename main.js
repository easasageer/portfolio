const phrases = [
  'Electronics & Instrumentation Engineering Student',
  'Arduino Enthusiast',
  'Python Learner',
  'Future Automation Engineer'
];

const typeSpeed = 80;
const eraseSpeed = 40;
const nextDelay = 1600;
let typeIndex = 0;
let charIndex = 0;
let typingTimer;

function typeWriter(){
  const textEl = document.querySelector('.typing-text');
  if(!textEl) return;
  const current = phrases[typeIndex];
  if(charIndex <= current.length){
    textEl.textContent = current.slice(0, charIndex);
    charIndex++;
    typingTimer = setTimeout(typeWriter, typeSpeed);
  } else {
    setTimeout(eraseWriter, nextDelay);
  }
}

function eraseWriter(){
  const textEl = document.querySelector('.typing-text');
  const current = phrases[typeIndex];
  if(charIndex >= 0){
    textEl.textContent = current.slice(0, charIndex);
    charIndex--;
    typingTimer = setTimeout(eraseWriter, eraseSpeed);
  } else {
    typeIndex = (typeIndex + 1) % phrases.length;
    setTimeout(typeWriter, typeSpeed);
  }
}

function initTyping(){
  clearTimeout(typingTimer);
  charIndex = 0;
  typeWriter();
}

function initAOS(){
  if(window.AOS) AOS.init({ duration: 800, once: true, mirror: false });
}

function initTheme(){
  const saved = localStorage.getItem('portfolio-theme');
  const body = document.body;
  const toggle = document.getElementById('theme-toggle');
  if(saved === 'light') body.classList.add('light-theme');
  if(toggle){
    toggle.classList.toggle('active', body.classList.contains('light-theme'));
    toggle.addEventListener('click', ()=>{
      body.classList.toggle('light-theme');
      const mode = body.classList.contains('light-theme') ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', mode);
      toggle.classList.toggle('active', body.classList.contains('light-theme'));
    });
  }
}

function updateScrollTop(){
  const button = document.getElementById('scroll-top');
  if(!button) return;
  if(window.scrollY > 420){
    button.classList.add('show');
  } else {
    button.classList.remove('show');
  }
}

function initCounters(){
  const counters = document.querySelectorAll('.counter');
  if(!counters.length) return;
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const target = entry.target;
        const value = parseInt(target.dataset.value, 10);
        let current = 0;
        const step = Math.ceil(value / 90);
        const interval = setInterval(()=>{
          current += step;
          if(current >= value){
            current = value;
            clearInterval(interval);
          }
          target.textContent = `${current}+`;
        }, 18);
        observer.unobserve(target);
      }
    });
  },{threshold:0.4});
  counters.forEach(c=>observer.observe(c));
}

function initScrollTop(){
  const button = document.getElementById('scroll-top');
  if(!button) return;
  button.addEventListener('click', ()=>{
    window.scrollTo({top:0,behavior:'smooth'});
  });
  window.addEventListener('scroll', updateScrollTop);
}

function initResumeDownload(){
  const resumeButton = document.getElementById('download-resume');
  if(!resumeButton) return;
  resumeButton.addEventListener('click', e=>{
    e.preventDefault();
    const content = `Easa Sageer\nElectronics and Instrumentation Engineering Student\nLocation: Kariyathippilly, Manjali, Mannam P O, Paravur, Ernakulam, Kerala – 683520\nPhone: 9562186096\nEmail: easasageerka@gmail.com\n\nObjective:\nI seek challenging opportunities where I can fully use my skills for the success of the organization.\n\nSkills:\n- Arduino\n- Python\n- C Programming\n- HTML\n- CSS\n\nEducation:\nFISAT, B.Tech in Electronics and Instrumentation Engineering, CGPA: 7.63\n\nProjects:\n- Arduino Workshop\n- Electrify Workshop\n- Smart Home Automation Concept Project\n\nAchievements:\n- Participated in technical workshops\n- Completed Arduino hands-on training\n- Developing programming skills\n`;
    const blob = new Blob([content], {type:'text/plain'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Easa-Sageer-Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

function initContactForm(){
  const contactForm = document.querySelector('.contact-form');
  if(!contactForm) return;
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    alert('Thank you! Your message has been noted.');
    contactForm.reset();
  });
}

function handleLoader(){
  const loader = document.getElementById('site-loader');
  if(loader){
    loader.classList.add('hidden');
    setTimeout(()=> loader.remove(), 800);
  }
}

window.addEventListener('DOMContentLoaded', ()=>{
  initAOS();
  initTheme();
  initScrollTop();
  initCounters();
  initResumeDownload();
  initContactForm();
  if(document.body.classList.contains('home-page')) initTyping();
});

window.addEventListener('load', ()=>{
  handleLoader();
  updateScrollTop();
});
