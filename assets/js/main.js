/**
 * NayaaSoft Modern Digital Agency - Main Scripts
 * Domain: www.nayaasoft.com
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year
  const yrEl = document.getElementById('yr');
  if (yrEl) yrEl.textContent = new Date().getFullYear();

  // 2. Sticky Header Shadow on Scroll
  const hdr = document.querySelector('.hdr');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      hdr?.classList.add('scrolled');
    } else {
      hdr?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Mobile Navigation Menu
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // 4. Dropdowns
  const dropdownButtons = document.querySelectorAll('.ddb');
  dropdownButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const isOpen = menu.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);

      // Close other dropdowns
      document.querySelectorAll('.ddm').forEach(m => {
        if (m !== menu) m.classList.remove('open');
      });
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.ddm').forEach(m => m.classList.remove('open'));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.ddm').forEach(m => m.classList.remove('open'));
      if (nav) nav.classList.remove('open');
    }
  });

  // 5. Hero Code / Mockup Interactive Tabs
  const heroTabs = document.querySelectorAll('.mockup-tab-btn');
  const heroContent = document.getElementById('hero-code-view');

  const tabSnippets = {
    web: `<span class="code-comment">// High-Performance Next.js & React</span>
<span class="code-keyword">import</span> { NayaaEngine } <span class="code-keyword">from</span> <span class="code-str">'@nayaasoft/core'</span>;

<span class="code-keyword">export default async function</span> <span class="code-fn">WebPortal</span>() {
  <span class="code-keyword">const</span> app = <span class="code-keyword">await</span> NayaaEngine.<span class="code-fn">init</span>({
    speed: <span class="code-str">'Ultra-Fast 99+ Lighthouse'</span>,
    seo: <span class="code-str">'100% Optimized'</span>,
    architecture: <span class="code-str">'Scalable Cloud'</span>
  });
  <span class="code-keyword">return</span> app.<span class="code-fn">launch</span>();
}`,
    mobile: `<span class="code-comment">// Cross-Platform iOS & Android Flutter</span>
<span class="code-keyword">class</span> <span class="code-fn">NayaaApp</span> <span class="code-keyword">extends</span> <span class="code-prop">StatelessWidget</span> {
  <span class="code-keyword">@override</span>
  <span class="code-prop">Widget</span> <span class="code-fn">build</span>(<span class="code-prop">BuildContext</span> context) {
    <span class="code-keyword">return</span> <span class="code-prop">MaterialApp</span>(
      theme: NayaaThemes.modernDark,
      features: [<span class="code-str">'PushNotifications'</span>, <span class="code-str">'RealtimeSync'</span>],
      home: <span class="code-fn">Smooth60FPSView</span>(),
    );
  }
}`,
    cloud: `<span class="code-comment">// Secure REST / GraphQL Cloud Backend</span>
<span class="code-keyword">from</span> nayaa_api <span class="code-keyword">import</span> FastEngine, Security

app = FastEngine(name=<span class="code-str">"NayaaSoft Cloud"</span>)

<span class="code-keyword">@app.route</span>(<span class="code-str">"/api/v1/health"</span>)
<span class="code-keyword">def</span> <span class="code-fn">health_check</span>():
    <span class="code-keyword">return</span> {
      <span class="code-str">"status"</span>: <span class="code-str">"200 OK"</span>,
      <span class="code-str">"latency"</span>: <span class="code-str">"32ms"</span>,
      <span class="code-str">"security"</span>: <span class="code-str">"Enterprise AES-256"</span>
    }`
  };

  if (heroTabs.length && heroContent) {
    heroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        heroTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const viewType = tab.dataset.view;
        if (tabSnippets[viewType]) {
          heroContent.innerHTML = tabSnippets[viewType];
        }
      });
    });
  }

  // 6. Interactive Cost & Timeline Estimator
  const estServiceBtns = document.querySelectorAll('[data-est-type="service"]');
  const estScopeBtns = document.querySelectorAll('[data-est-type="scope"]');
  const estPrice = document.getElementById('est-price');
  const estTimeline = document.getElementById('est-timeline');
  const estWhatsappBtn = document.getElementById('est-wa-btn');

  let selectedService = 'Web Development';
  let selectedScope = 'Standard';

  const pricingMatrix = {
    'Web Development': {
      'MVP': { price: '$499 - $999', timeline: '1 - 2 Weeks' },
      'Standard': { price: '$1,200 - $2,500', timeline: '2 - 4 Weeks' },
      'Enterprise': { price: '$3,500+', timeline: '4 - 8 Weeks' }
    },
    'Mobile App': {
      'MVP': { price: '$799 - $1,499', timeline: '2 - 3 Weeks' },
      'Standard': { price: '$1,800 - $3,500', timeline: '3 - 6 Weeks' },
      'Enterprise': { price: '$4,500+', timeline: '6 - 12 Weeks' }
    },
    'Web + Mobile (Full Stack)': {
      'MVP': { price: '$1,299 - $2,200', timeline: '3 - 4 Weeks' },
      'Standard': { price: '$2,800 - $5,000', timeline: '4 - 8 Weeks' },
      'Enterprise': { price: '$6,500+', timeline: '8 - 14 Weeks' }
    },
    'UI/UX Design': {
      'MVP': { price: '$299 - $599', timeline: '5 - 7 Days' },
      'Standard': { price: '$799 - $1,499', timeline: '2 Weeks' },
      'Enterprise': { price: '$1,800+', timeline: '3 - 4 Weeks' }
    }
  };

  function updateEstimator() {
    if (!estPrice || !estTimeline) return;
    const data = pricingMatrix[selectedService]?.[selectedScope] || { price: 'Custom Quote', timeline: 'Discuss with us' };
    estPrice.textContent = data.price;
    estTimeline.textContent = `Estimated Delivery: ${data.timeline}`;

    if (estWhatsappBtn) {
      const msg = encodeURIComponent(`Hi NayaaSoft team, I am looking for ${selectedService} (${selectedScope} scope). Estimated budget around ${data.price}. Can we discuss the requirements?`);
      estWhatsappBtn.href = `https://wa.me/923000000000?text=${msg}`;
    }
  }

  estServiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      estServiceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedService = btn.dataset.val;
      updateEstimator();
    });
  });

  estScopeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      estScopeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedScope = btn.dataset.val;
      updateEstimator();
    });
  });

  updateEstimator();

  // 7. FAQ Accordion
  const fqButtons = document.querySelectorAll('.fq button');
  fqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = btn.nextElementSibling;
      const isOpen = !answer.hidden;

      // Close all other FAQs
      document.querySelectorAll('.fq').forEach(f => {
        if (f !== parent) {
          f.classList.remove('open');
          const ans = f.querySelector('.fa');
          const b = f.querySelector('button');
          if (ans) ans.hidden = true;
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });

      answer.hidden = isOpen;
      parent.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', !isOpen);
    });
  });

  // 8. Back to Top Button
  const topBtn = document.getElementById('top');
  if (topBtn) {
    window.addEventListener('scroll', () => {
      topBtn.hidden = window.scrollY < 400;
    }, { passive: true });

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 9. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('in'));
  }

  // 10. Contact Form Logic & WhatsApp Submission
  const contactForm = document.getElementById('qf');
  if (contactForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const validateField = (el) => {
      let errMsg = '';
      const val = el.value.trim();

      if (el.required && !val) {
        errMsg = 'This field is required.';
      } else if (el.type === 'email' && val && !emailRegex.test(val)) {
        errMsg = 'Please enter a valid email address.';
      } else if (el.type === 'tel' && val && !/^[+\d][\d\s()-]{6,}$/.test(val)) {
        errMsg = 'Please enter a valid phone number.';
      } else if (el.minLength > 0 && val && val.length < el.minLength) {
        errMsg = `Please provide at least ${el.minLength} characters.`;
      }

      const errSpan = document.getElementById(`${el.id}-e`);
      if (errSpan) errSpan.textContent = errMsg;
      el.classList.toggle('bad', !!errMsg);
      return !errMsg;
    };

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('bad')) validateField(input);
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const statusBox = document.getElementById('fs');
      const allValid = Array.from(inputs).map(validateField).every(Boolean);

      if (!allValid) {
        if (statusBox) {
          statusBox.className = 'fs no';
          statusBox.textContent = 'Please correct the highlighted fields before sending.';
        }
        return;
      }

      const endpoint = contactForm.dataset.endpoint;

      // Direct WhatsApp Lead Generation if endpoint not configured or user preference
      if (!endpoint) {
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const service = document.getElementById('service')?.value || 'Software Development';
        const budget = document.getElementById('budget')?.value || 'Not specified';
        const msg = document.getElementById('msg')?.value || '';

        const whatsappText = encodeURIComponent(
          `*New Project Inquiry - NayaaSoft*\n\n` +
          `*Name:* ${name}\n` +
          `*Email:* ${email}\n` +
          `*Phone:* ${phone}\n` +
          `*Service:* ${service}\n` +
          `*Budget:* ${budget}\n` +
          `*Project Details:* ${msg}`
        );

        if (statusBox) {
          statusBox.className = 'fs ok';
          statusBox.innerHTML = `Form verified! Redirecting you to WhatsApp to instantly connect with our lead engineer... <br><a href="https://wa.me/923000000000?text=${whatsappText}" target="_blank" style="text-decoration:underline;font-weight:700;">Click here if not redirected automatically</a>`;
        }

        setTimeout(() => {
          window.open(`https://wa.me/923000000000?text=${whatsappText}`, '_blank');
        }, 1200);

        return;
      }

      // If backend endpoint is provided
      try {
        if (statusBox) {
          statusBox.className = 'fs';
          statusBox.style.display = 'block';
          statusBox.textContent = 'Sending your message...';
        }

        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (!res.ok) throw new Error('Network error');

        if (statusBox) {
          statusBox.className = 'fs ok';
          statusBox.textContent = 'Thank you! Your message has been sent successfully. Our team will contact you within 24 hours.';
        }
        contactForm.reset();
      } catch (err) {
        if (statusBox) {
          statusBox.className = 'fs no';
          statusBox.textContent = 'Could not deliver automatically. Please contact us directly via WhatsApp or email.';
        }
      }
    });
  }
});
