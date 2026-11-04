/**
 * =========================================================================
 * Prem Consultants - Main Interactive Scripts (script.js)
 * =========================================================================
 */

// 1. Tailwind Configuration for Play CDN
if (typeof tailwind !== 'undefined') {
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          brandBlue: '#2B3990',
          brandBlueDark: '#1E2B75',
          brandBlueMid: '#1D4ED8',
          brandBlueVibrant: '#2563EB',
          corporate: {
            950: '#0A1120',
            900: '#0F172A',
            850: '#172554',
            800: '#1E293B',
            700: '#334155',
            600: '#475569',
            500: '#64748B',
            400: '#94A3B8',
            300: '#CBD5E1',
            200: '#E2E8F0',
            100: '#F1F5F9',
            50: '#F8FAFC',
          },
          growth: {
            DEFAULT: '#16A34A',
            light: '#22C55E',
            dark: '#15803D',
            subtle: '#DCFCE7',
            50: '#F0FDF4',
          }
        },
        fontFamily: {
          brand: ['"Montserrat"', 'system-ui', 'sans-serif'],
          sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
          display: ['"Plus Jakarta Sans"', 'sans-serif'],
        },
        animation: {
          'marquee': 'marquee 32s linear infinite',
          'float-icon': 'floatIcon 3s ease-in-out infinite alternate',
          'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
        },
        keyframes: {
          marquee: {
            '0%': { transform: 'translateX(0%)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          floatIcon: {
            '0%': { transform: 'translateY(0px)' },
            '100%': { transform: 'translateY(-6px)' },
          },
          pulseSubtle: {
            '0%, 100%': { opacity: '0.9', transform: 'scale(1)' },
            '50%': { opacity: '1', transform: 'scale(1.05)' },
          }
        }
      }
    }
  };
}

// 2. Service Deliverables Data
const SERVICE_DATA = {
  pms: {
    category: 'Performance Management',
    title: 'Performance Management Systems (PMS)',
    desc: 'Comprehensive strategy cascading that anchors corporate objectives into functional departmental metrics and individual KRAs.',
    deliverables: [
      'Strategy Mapping & Balanced Scorecard (BSC) architecture across Financial, Customer, Internal Process, and Learning & Growth perspectives.',
      'Custom Departmental KRA & KPI goal sheets with mathematical weighting and target metrics.',
      'Mid-Year and Annual appraisal formats with bell-curve rating normalization guidelines.',
      'Management By Results (MBR) monthly performance review protocol for plant and department heads.',
      'Direct integration guidelines with ERP/HRMS systems for automated tracking.'
    ]
  },
  od: {
    category: 'Organization Development',
    title: 'HR Process Consulting & OD',
    desc: 'Systemic organization structuring that establishes transparent accountability, job role definitions, and institutional compliance.',
    deliverables: [
      'Audited Job Descriptions (JDs) with required competency levels and experience prerequisites.',
      'Competency mapping matrix for technical, managerial, and leadership roles.',
      'Standard Operating Procedures (SOPs) for employee onboarding, attendance, leave, and exit clearance.',
      'Comprehensive HR Policy Manual tailored to Indian manufacturing & IT industry norms.',
      'Organization chart redesign with clear reporting lines and span-of-control optimization.'
    ]
  },
  training: {
    category: 'Capability Building',
    title: 'Corporate Training & Coaching',
    desc: 'High-impact experiential workshops designed to bridge communication gaps and instill accountability among supervisors and line managers.',
    deliverables: [
      'Effective Performance Feedback & Constructive Dialogue training for managers.',
      'Supervisor Development Programs for manufacturing plant line supervisors.',
      'Advanced MS Excel for Business & HR Analytics (VLOOKUP, Pivot Tables, Dashboards).',
      'Cross-Functional Team Collaboration & Conflict Resolution modules.',
      'Personalized Executive Mentorship for newly promoted Department Heads.'
    ]
  },
  talent: {
    category: 'Talent Solutions',
    title: 'Strategic Talent Acquisition (100% Free Placement for Candidates)',
    desc: 'End-to-end recruitment search identifying seasoned leadership, plant management, and technical personnel tailored specifically for mid-market and enterprise operations.',
    deliverables: [
      'Targeted Executive Headhunting for Plant Heads, Operations Heads, and Functional Leads.',
      'Core Technical & Engineering Talent Pipeline (Mechanical, Electrical, Design, Quality).',
      'Dual-stage candidate screening: In-depth technical aptitude + culture alignment evaluation.',
      'Candidate Transparency: 100% Zero placement fees charged to job seekers.',
      'Pre-joining background checks, reference verification, and seamless onboarding support.'
    ]
  },
  recruitment: {
    category: 'Talent Practice',
    title: 'Strategic Talent Acquisition',
    desc: 'Precision executive search and specialized engineering placement delivered under a strict zero-candidate-fee ethical charter.',
    deliverables: [
      'Rigorous technical and cultural screening conducted by engineering-qualified recruiters.',
      'Executive & Plant Head search for manufacturing, EPC, and automotive sectors.',
      'Targeted talent pipelines for mechanical, electrical, and quality engineers.',
      'Strict Zero-Candidate-Fee Guarantee: 100% free placement for job applicants.',
      'Thorough candidate credential verification and salary negotiation facilitation.'
    ]
  }
};

// 3. Service Modal Handlers
function openServiceModal(key) {
  const data = SERVICE_DATA[key];
  if (!data) return;

  const categoryElem = document.getElementById('modal-service-category');
  const titleElem = document.getElementById('modal-service-title');
  const descElem = document.getElementById('modal-service-desc');
  const listContainer = document.getElementById('modal-service-deliverables');

  if (categoryElem) categoryElem.textContent = data.category;
  if (titleElem) titleElem.textContent = data.title;
  if (descElem) descElem.textContent = data.desc;

  if (listContainer) {
    listContainer.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-relaxed';
      li.innerHTML = `
        <span class="w-5 h-5 rounded-full bg-growth-subtle text-growth-dark flex items-center justify-center font-bold text-xs mt-0.5 flex-shrink-0">&#10004;</span>
        <span>${item}</span>
      `;
      listContainer.appendChild(li);
    });
  }

  const modal = document.getElementById('service-modal');
  if (modal && typeof modal.showModal === 'function') {
    modal.showModal();
  }
}

function closeServiceModal() {
  const modal = document.getElementById('service-modal');
  if (modal && typeof modal.close === 'function') {
    modal.close();
  }
}

function scheduleForService() {
  closeServiceModal();
  const contactSection = document.getElementById('contact-us');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// 4. Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

// 5. Stat Counter Animations
function animateCounterElement(counter) {
  const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
  if (counter._countAnimFrame) {
    cancelAnimationFrame(counter._countAnimFrame);
  }

  const duration = 1400; // 1.4s smooth visible count
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.round(ease * target);

    counter.textContent = currentVal.toLocaleString('en-IN');

    if (progress < 1) {
      counter._countAnimFrame = requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString('en-IN');
      counter._countAnimFrame = null;
    }
  }

  counter._countAnimFrame = requestAnimationFrame(updateCounter);
}

function initCounters() {
  const statElements = document.querySelectorAll('.counter-number');
  const statsRow = document.getElementById('hero-stats-row');
  if (!statElements.length) return;

  statElements.forEach(counter => {
    const target = counter.getAttribute('data-target');
    if (target) {
      counter.textContent = parseInt(target, 10).toLocaleString('en-IN');
    }
  });

  if (!statsRow) return;

  let isCounting = false;
  let hasEverTriggered = false;

  function triggerCount() {
    if (isCounting) return;
    isCounting = true;
    hasEverTriggered = true;

    statElements.forEach(counter => {
      animateCounterElement(counter);
    });

    setTimeout(() => { isCounting = false; }, 1500);
  }

  function checkStatsInView() {
    const rect = statsRow.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const inViewport = (rect.top <= vh * 0.90) && (rect.bottom >= 40);

    if (inViewport && !hasEverTriggered) {
      triggerCount();
    } else if (!inViewport && (rect.top > vh || rect.bottom < 0)) {
      hasEverTriggered = false;
    }
  }

  window.addEventListener('scroll', checkStatsInView, { passive: true });
  window.addEventListener('resize', checkStatsInView, { passive: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasEverTriggered) {
          triggerCount();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(statsRow);
  }

  statElements.forEach(counter => {
    const card = counter.closest('.group');
    if (card) {
      card.addEventListener('mouseenter', () => {
        animateCounterElement(counter);
      });
    }
  });

  setTimeout(checkStatsInView, 350);
}

// 6. Section Animation Triggers
function initSlideAndStick() {
  const target = document.getElementById('serve-better-heading');
  if (!target || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add('in-view');
      }
    });
  }, { threshold: 0.35 });

  observer.observe(target);
}

// 7. Magnetic Button Effect
function initMagneticButtons() {
  const btns = document.querySelectorAll('.magnetic-btn');
  btns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

// 8. Contact / Inquiry Tabs
function switchInquiryTab(type) {
  const tabClient = document.getElementById('tab-client');
  const tabCand = document.getElementById('tab-candidate');
  const panelClient = document.getElementById('panel-client');
  const panelCand = document.getElementById('panel-candidate');

  if (!tabClient || !tabCand || !panelClient || !panelCand) return;

  if (type === 'client') {
    tabClient.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabClient.classList.remove('text-slate-600');
    tabClient.setAttribute('aria-selected', 'true');

    tabCand.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    tabCand.classList.add('text-slate-600');
    tabCand.setAttribute('aria-selected', 'false');

    panelClient.classList.remove('hidden');
    panelCand.classList.add('hidden');
  } else {
    tabCand.classList.add('bg-white', 'text-slate-900', 'shadow-xs');
    tabCand.classList.remove('text-slate-600');
    tabCand.setAttribute('aria-selected', 'true');

    tabClient.classList.remove('bg-white', 'text-slate-900', 'shadow-xs');
    tabClient.classList.add('text-slate-600');
    tabClient.setAttribute('aria-selected', 'false');

    panelCand.classList.remove('hidden');
    panelClient.classList.add('hidden');
  }
}

// 9. Resume File Picker Handler
function handleResumeSelected(input) {
  const badge = document.getElementById('resume-filename-badge');
  const label = document.getElementById('resume-filename-text');
  if (input.files && input.files[0]) {
    if (label) label.textContent = input.files[0].name;
    if (badge) badge.classList.remove('hidden');
  } else {
    if (badge) badge.classList.add('hidden');
  }
}

// 10. Contact Validation Helper
function validateContact(str) {
  const trimmed = str.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) return true;
  const cleaned = trimmed.replace(/[\s\-\+\(\)]/g, '');
  return cleaned.length >= 8 && /^\d+$/.test(cleaned);
}

// 11. Form Submissions
function handleClientSubmit(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('client-name');
  const companyInput = document.getElementById('client-company');
  const contactInput = document.getElementById('client-contact');
  const serviceInput = document.getElementById('client-service');
  const notesInput = document.getElementById('client-notes');

  let isValid = true;

  const errName = document.getElementById('err-client-name');
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    errName.textContent = 'Please enter your full name.';
    errName.classList.remove('hidden');
    nameInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errName.classList.add('hidden');
    nameInput.classList.remove('border-red-500');
  }

  const errCompany = document.getElementById('err-client-company');
  if (!companyInput.value.trim() || companyInput.value.trim().length < 2) {
    errCompany.textContent = 'Please provide your organization name.';
    errCompany.classList.remove('hidden');
    companyInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errCompany.classList.add('hidden');
    companyInput.classList.remove('border-red-500');
  }

  const errContact = document.getElementById('err-client-contact');
  if (!contactInput.value.trim() || !validateContact(contactInput.value)) {
    errContact.textContent = 'Please enter a valid phone number or email address.';
    errContact.classList.remove('hidden');
    contactInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errContact.classList.add('hidden');
    contactInput.classList.remove('border-red-500');
  }

  const errService = document.getElementById('err-client-service');
  if (!serviceInput.value) {
    errService.textContent = 'Please select a primary consulting advisory area.';
    errService.classList.remove('hidden');
    serviceInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errService.classList.add('hidden');
    serviceInput.classList.remove('border-red-500');
  }

  if (!isValid) return;

  const rawText = `Hello Prem Consultants,\nI would like to schedule a strategic discovery discussion.\n\n*Name:* ${nameInput.value.trim()}\n*Company:* ${companyInput.value.trim()}\n*Contact:* ${contactInput.value.trim()}\n*Service:* ${serviceInput.value}\n*Notes:* ${notesInput.value.trim() || 'N/A'}`;
  const waUrl = `https://wa.me/919423389525?text=${encodeURIComponent(rawText)}`;

  const waLink = document.getElementById('client-whatsapp-link');
  if (waLink) waLink.href = waUrl;

  const alertBox = document.getElementById('client-success-alert');
  if (alertBox) {
    alertBox.classList.remove('hidden');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const btn = document.getElementById('btn-submit-client');
  if (btn) {
    btn.textContent = '\u2714 Request Submitted';
    btn.classList.add('bg-slate-700', 'cursor-not-allowed');
    btn.disabled = true;
  }
}

function handleCandidateSubmit(e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById('cand-name');
  const contactInput = document.getElementById('cand-contact');
  const roleInput = document.getElementById('cand-role');
  const expInput = document.getElementById('cand-exp');
  const fileInput = document.getElementById('cand-resume');

  let isValid = true;

  const errName = document.getElementById('err-cand-name');
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    errName.textContent = 'Please enter your full name.';
    errName.classList.remove('hidden');
    nameInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errName.classList.add('hidden');
    nameInput.classList.remove('border-red-500');
  }

  const errContact = document.getElementById('err-cand-contact');
  if (!contactInput.value.trim() || !validateContact(contactInput.value)) {
    errContact.textContent = 'Please enter a valid phone number or email.';
    errContact.classList.remove('hidden');
    contactInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errContact.classList.add('hidden');
    contactInput.classList.remove('border-red-500');
  }

  const errRole = document.getElementById('err-cand-role');
  if (!roleInput.value.trim() || roleInput.value.trim().length < 2) {
    errRole.textContent = 'Please specify your target functional role.';
    errRole.classList.remove('hidden');
    roleInput.classList.add('border-red-500');
    isValid = false;
  } else {
    errRole.classList.add('hidden');
    roleInput.classList.remove('border-red-500');
  }

  const errResume = document.getElementById('err-cand-resume');
  if (!fileInput.files || fileInput.files.length === 0) {
    errResume.textContent = 'Please attach your CV / Resume document.';
    errResume.classList.remove('hidden');
    isValid = false;
  } else {
    errResume.classList.add('hidden');
  }

  if (!isValid) return;

  const rawText = `Hello Deepali Jain & Prem Consultants Talent Team,\nI have submitted my profile for your candidate portal (100% Free Placement).\n\n*Name:* ${nameInput.value.trim()}\n*Target Role:* ${roleInput.value.trim()}\n*Contact:* ${contactInput.value.trim()}\n*Experience:* ${expInput.value.trim() || 'Not specified'}`;
  const waUrl = `https://wa.me/919423389525?text=${encodeURIComponent(rawText)}`;

  const waLink = document.getElementById('candidate-whatsapp-link');
  if (waLink) waLink.href = waUrl;

  const alertBox = document.getElementById('candidate-success-alert');
  if (alertBox) {
    alertBox.classList.remove('hidden');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  const btn = document.getElementById('btn-submit-cand');
  if (btn) {
    btn.textContent = '\u2714 Application Submitted';
    btn.classList.add('bg-slate-700', 'cursor-not-allowed');
    btn.disabled = true;
  }
}

// 12. Mobile Menu Navigation
function closeMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    if (iconOpen) iconOpen.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  }
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
      if (iconOpen) iconOpen.classList.toggle('hidden');
      if (iconClose) iconClose.classList.toggle('hidden');
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// 13. Active Section Scroll Highlighting
function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-[#2B3990]', 'font-bold', 'bg-slate-100/80');
            link.classList.remove('text-slate-700');
          } else {
            link.classList.remove('text-[#2B3990]', 'font-bold', 'bg-slate-100/80');
            link.classList.add('text-slate-700');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(sec => observer.observe(sec));
}

// 14. Continuous Seamless Marquee Engine
function initMarquee() {
  const inner = document.getElementById('marquee-inner');
  const track = document.getElementById('marquee-track');
  if (!inner || !track) return;

  inner.classList.remove('animate-marquee');
  inner.style.animation = 'none';

  const GAP = 48; // px (3rem spacing)
  const initialChildren = Array.from(inner.children);
  if (initialChildren.length === 0) return;

  initialChildren.forEach(child => {
    child.style.marginRight = GAP + 'px';
    child.style.display = 'inline-flex';
    child.style.flexShrink = '0';
  });

  const SET_SIZE = initialChildren.length >= 16 ? 8 : Math.floor(initialChildren.length / 2);

  // Clone items to provide 4 full seamless cycles
  initialChildren.forEach(child => {
    const clone = child.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    inner.appendChild(clone);
  });

  const items = inner.children;
  let unitWidth = 0;

  function measureCycle() {
    if (items.length > SET_SIZE && items[SET_SIZE].offsetLeft > 0) {
      unitWidth = items[SET_SIZE].offsetLeft - items[0].offsetLeft;
    }
    if (!unitWidth || unitWidth < 300) {
      let sum = 0;
      for (let j = 0; j < SET_SIZE; j++) {
        sum += items[j].getBoundingClientRect().width + GAP;
      }
      unitWidth = sum;
    }
  }

  measureCycle();
  window.addEventListener('load', measureCycle);
  window.addEventListener('resize', measureCycle);

  let pos = 0;
  const speed = 0.9;
  let isPaused = false;
  let raf;

  function tick() {
    if (!isPaused && unitWidth > 0) {
      pos -= speed;
      if (pos <= -unitWidth) {
        pos += unitWidth;
      }
      inner.style.transform = `translate3d(${pos}px, 0, 0)`;
    }
    raf = requestAnimationFrame(tick);
  }

  track.addEventListener('mouseenter', () => { isPaused = true; });
  track.addEventListener('mouseleave', () => { isPaused = false; });
  track.addEventListener('touchstart', () => { isPaused = true; }, { passive: true });
  track.addEventListener('touchend', () => { isPaused = false; }, { passive: true });

  raf = requestAnimationFrame(tick);
}

// 15. Master Initialization
function initAll() {
  initScrollProgress();
  initCounters();
  initSlideAndStick();
  initMagneticButtons();
  initMobileMenu();
  initNavObserver();
  initMarquee();
}

// Expose public functions to global window for HTML inline onclick/onsubmit handlers
window.openServiceModal = openServiceModal;
window.closeServiceModal = closeServiceModal;
window.scheduleForService = scheduleForService;
window.switchInquiryTab = switchInquiryTab;
window.handleResumeSelected = handleResumeSelected;
window.handleClientSubmit = handleClientSubmit;
window.handleCandidateSubmit = handleCandidateSubmit;
window.closeMobileMenu = closeMobileMenu;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}
