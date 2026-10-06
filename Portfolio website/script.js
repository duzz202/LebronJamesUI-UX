/**
 * LEBRON JAMES PORTFOLIO - CORE INTERACTION ENGINE
 * Features:
 * 1. Equal-Spaced Nav Tabs with Active Color Change & Seamless Section Switching
 * 2. LeBron James Portrait Showcase & Pose Switcher
 * 3. Portfolio Category Filtering
 * 4. Interactive Hire Me Modal & Contact Form Handlers
 * 5. Downloadable LeBron James CV Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavTabs();
  initPortraitToggle();
  initPortfolioFilters();
  initModals();
  initContactForm();
  initDownloadCv();
});

/* ===================================================================
   2. NAV TABS & SECTION SWITCHING WITH ACTIVE COLOR CHANGE
   =================================================================== */
function initNavTabs() {
  const tabs = document.querySelectorAll('.nav-tab');
  const panels = document.querySelectorAll('.tab-panel');

  function switchTab(tabId) {
    // 1. Update active state and color on tabs
    tabs.forEach((tab) => {
      const isActive = tab.getAttribute('data-tab') === tabId;
      if (isActive) {
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
      } else {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
      }
    });

    // 2. Update visible panel
    panels.forEach((panel) => {
      if (panel.id === `panel-${tabId}`) {
        panel.classList.add('active');
      } else {
        panel.classList.remove('active');
      }
    });

    // 3. Play subtle haptic feedback or sound effect if desired
    createTabSparkle(tabId);
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Visual feedback sparkle on tab click
  function createTabSparkle(tabId) {
    const activeBtn = document.getElementById(`tab-btn-${tabId}`);
    if (!activeBtn) return;
    activeBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      activeBtn.style.transform = '';
    }, 150);
  }

  // Handle Logo click to return to home
  const brandLogo = document.getElementById('brandLogo');
  if (brandLogo) {
    brandLogo.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('home');
    });
  }
}

/* ===================================================================
   3. LEBRON JAMES PORTRAIT & POSE SWITCHER
   =================================================================== */
function initPortraitToggle() {
  const toggleBtn = document.getElementById('togglePortraitBtn');
  const heroImg = document.getElementById('heroPortraitImg');
  const altImg = document.getElementById('altPortraitImg');
  const toggleText = document.getElementById('togglePoseText');

  if (!toggleBtn || !heroImg || !altImg) return;

  let currentPose = 'hero'; // 'hero' or 'alt'

  toggleBtn.addEventListener('click', () => {
    if (currentPose === 'hero') {
      heroImg.classList.remove('active');
      altImg.classList.add('active');
      currentPose = 'alt';
      if (toggleText) toggleText.textContent = 'The King • Magazine Aura';
      showToast('Switched to LeBron James: Championship Aura Mode');
    } else {
      altImg.classList.remove('active');
      heroImg.classList.add('active');
      currentPose = 'hero';
      if (toggleText) toggleText.textContent = 'The King • Executive Mode';
      showToast('Switched to LeBron James: Executive Suit Mode');
    }
  });
}

/* ===================================================================
   4. PORTFOLIO FILTERING
   =================================================================== */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Clicking project cards opens details
  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.project-title')?.textContent || 'Project';
      showToast(`Viewing Case Study: ${title}`);
    });
  });
}

/* ===================================================================
   5. MODAL SYSTEM (Hire Me)
   =================================================================== */
function initModals() {
  const hireModal = document.getElementById('hireModal');
  const closeHireBtn = document.getElementById('closeHireModal');
  const navHireBtn = document.getElementById('navHireBtn');
  const heroHireBtn = document.getElementById('heroHireBtn');
  const quickHireForm = document.getElementById('quickHireForm');

  function openModal() {
    if (!hireModal) return;
    hireModal.classList.add('open');
    hireModal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!hireModal) return;
    hireModal.classList.remove('open');
    hireModal.setAttribute('aria-hidden', 'true');
  }

  if (navHireBtn) navHireBtn.addEventListener('click', openModal);
  if (heroHireBtn) heroHireBtn.addEventListener('click', openModal);
  if (closeHireBtn) closeHireBtn.addEventListener('click', closeModal);

  if (hireModal) {
    hireModal.addEventListener('click', (e) => {
      if (e.target === hireModal) closeModal();
    });
  }

  if (quickHireForm) {
    quickHireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quickName')?.value || 'Client';
      closeModal();
      showToast(`Thank you, ${name}! LeBron's design office will respond within 24 hours.`);
      quickHireForm.reset();
    });
  }
}

/* ===================================================================
   6. CONTACT FORM HANDLER
   =================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Friend';
    showToast(`👑 Message dispatched! Thank you ${name}, LeBron James has received your inquiry.`);
    contactForm.reset();
  });
}

/* ===================================================================
   7. DOWNLOAD CV (Dynamic Clean PDF/Document Generator)
   =================================================================== */
function initDownloadCv() {
  const downloadBtn = document.getElementById('downloadCvBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', () => {
    // Generate an executive resume text summary and trigger download
    const cvContent = `========================================================
LEBRON JAMES — EXECUTIVE CREATIVE DIRECTOR & UI/UX DESIGNER
Akron, OH | Los Angeles, CA
Portfolio: https://lebronjames.design | Contact: kingjames@portfolio.design
========================================================

SUMMARY:
Iconic leader, 4x NBA Champion, philanthropist, and visionary creative director.
Applying the same unyielding discipline that conquered professional sports to digital product architecture, human-centered UI/UX design systems, and cultural media storytelling.

CORE COMPETENCIES:
• UI/UX Architecture & Interaction Design
• Design Systems & Figma Component Engineering
• High-Impact Brand Architecture & Storytelling
• Media Production (SpringHill Company Co-Founder)
• Philanthropic Platform Innovation (I PROMISE School)
• Elite Team Leadership & Performance Culture

NOTABLE VENTURES & ACHIEVEMENTS:
• SpringHill Company: Multi-million dollar content, entertainment, and digital media platform.
• I PROMISE School & Digital Student Portal: Educational platform impacting thousands of youth.
• Nike LeBron Signature Line: 20+ iterations of cutting-edge apparel & digital experience showcases.
• 4x NBA Champion & Finals MVP | NBA All-Time Leading Scorer.

MOTTO:
"Strive For Greatness."
========================================================`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LeBron_James_Creative_Portfolio_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('📄 Downloaded LeBron James Executive Creative Portfolio CV!');
  });
}

/* ===================================================================
   TOAST NOTIFICATION UTILITY
   =================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: #ff6200; font-size: 1.1rem;">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
