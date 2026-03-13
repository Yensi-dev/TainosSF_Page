/* ═══════════════════════════════════════════════
   TAINO — CONTACT MODAL  (global, all pages)
   Include this script at the bottom of every page
   before </body>. It self-injects its HTML.
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── 1. Inject HTML into <body> ──────────────────── */
  var html = `
  <div id="tsf-modal-backdrop"></div>
  <div id="tsf-modal" role="dialog" aria-modal="true" aria-labelledby="tsf-modal-heading">
    <div id="tsf-modal-bar"></div>
    <button id="tsf-close" aria-label="Cerrar">✕</button>
    <div id="tsf-modal-inner">

      <!-- Header -->
      <div class="tsf-modal-tag">✉️ Contáctanos</div>
      <h2 class="tsf-modal-title" id="tsf-modal-heading">Hablemos de tu proyecto</h2>
      <p class="tsf-modal-sub">Cuéntanos qué necesitas y te respondemos en menos de 24 horas. Sin compromiso. 🏝️</p>

      <!-- Form -->
      <form class="tsf-form" id="tsf-form" novalidate>

        <div class="tsf-row">
          <div class="tsf-field" id="field-nombre">
            <label class="tsf-label" for="tsf-nombre">Nombre <span>*</span></label>
            <input class="tsf-input" id="tsf-nombre" name="nombre" type="text" placeholder="Juan Pérez" autocomplete="given-name"/>
            <span class="tsf-error-msg">Por favor ingresa tu nombre.</span>
          </div>
          <div class="tsf-field" id="field-empresa">
            <label class="tsf-label" for="tsf-empresa">Empresa</label>
            <input class="tsf-input" id="tsf-empresa" name="empresa" type="text" placeholder="Mi Empresa S.R.L." autocomplete="organization"/>
          </div>
        </div>

        <div class="tsf-row">
          <div class="tsf-field" id="field-email">
            <label class="tsf-label" for="tsf-email">Correo electrónico <span>*</span></label>
            <input class="tsf-input" id="tsf-email" name="email" type="email" placeholder="juan@miempresa.com" autocomplete="email"/>
            <span class="tsf-error-msg">Ingresa un correo válido.</span>
          </div>
          <div class="tsf-field" id="field-telefono">
            <label class="tsf-label" for="tsf-telefono">Teléfono / WhatsApp</label>
            <input class="tsf-input" id="tsf-telefono" name="telefono" type="tel" placeholder="+1 (809) 000-0000" autocomplete="tel"/>
          </div>
        </div>

        <div class="tsf-field" id="field-servicio">
          <label class="tsf-label" for="tsf-servicio">Servicio de interés <span>*</span></label>
          <select class="tsf-select" id="tsf-servicio" name="servicio">
            <option value="">— Selecciona una opción —</option>
            <option value="landing">Landing Page / Página de promoción</option>
            <option value="web">Página Web Corporativa</option>
            <option value="ecommerce">Tienda en línea / E-commerce</option>
            <option value="app">Aplicación Móvil (iOS / Android)</option>
            <option value="software">Software a Medida / ERP / CRM</option>
            <option value="clinicasmart">ClinicaSmart</option>
            <option value="ferreteriasmart">FerreteriaSmart</option>
            <option value="pharmasmart">PharmaSmart</option>
            <option value="branding">Branding Digital / UI-UX</option>
            <option value="otro">Otro</option>
          </select>
          <span class="tsf-error-msg">Por favor selecciona un servicio.</span>
        </div>

        <div class="tsf-field" id="field-mensaje">
          <label class="tsf-label" for="tsf-mensaje">Cuéntanos más <span>*</span></label>
          <textarea class="tsf-textarea" id="tsf-mensaje" name="mensaje" placeholder="Describe brevemente tu proyecto, industria, plazo y cualquier detalle relevante..."></textarea>
          <span class="tsf-error-msg">Por favor escribe tu mensaje.</span>
        </div>

        <button type="submit" class="tsf-submit" id="tsf-submit-btn">
          <span id="tsf-btn-text">Enviar mensaje 🚀</span>
          <span class="tsf-spinner" id="tsf-spinner"></span>
        </button>

      </form>

      <!-- Success (hidden initially) -->
      <div id="tsf-success">
        <div class="tsf-success-icon">🎉</div>
        <h3>¡Mensaje enviado!</h3>
        <p>Gracias por contactarnos. Nuestro equipo te responderá en menos de 24 horas hábiles. ¡Nos vemos pronto! 🏝️</p>
        <button class="tsf-close-success" id="tsf-close-success">Cerrar</button>
      </div>

      <hr class="tsf-divider"/>

      <!-- Contact strip -->
      <div class="tsf-contact-strip">
        <div class="tsf-contact-item">📞 <a href="tel:+18090000000">+1 (809) 000-0000</a></div>
        <div class="tsf-contact-item">✉️ <a href="mailto:hola@tainosf.com">hola@tainosf.com</a></div>
        <div class="tsf-contact-item">🕐 Lun–Vie, 8am–6pm AST</div>
      </div>

      <p class="tsf-footer-note">🔒 Tu información está segura. No compartimos tus datos con terceros.</p>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', html);

  /* ── 2. Grab elements ────────────────────────────── */
  var backdrop   = document.getElementById('tsf-modal-backdrop');
  var modal      = document.getElementById('tsf-modal');
  var closeBtn   = document.getElementById('tsf-close');
  var form       = document.getElementById('tsf-form');
  var submitBtn  = document.getElementById('tsf-submit-btn');
  var btnText    = document.getElementById('tsf-btn-text');
  var spinner    = document.getElementById('tsf-spinner');
  var successBox = document.getElementById('tsf-success');
  var closeSuccess = document.getElementById('tsf-close-success');

  /* ── 3. Open / Close ─────────────────────────────── */
  function openModal() {
    backdrop.classList.add('tsf-open');
    document.body.style.overflow = 'hidden';
    // Trigger transitions on next paint
    requestAnimationFrame(function () {
      backdrop.classList.add('tsf-visible');
      modal.classList.add('tsf-visible');
    });
    // Focus first input for a11y
    setTimeout(function () {
      var first = modal.querySelector('.tsf-input, .tsf-select, .tsf-textarea');
      if (first) first.focus();
    }, 280);
  }

  function closeModal() {
    backdrop.classList.remove('tsf-visible');
    modal.classList.remove('tsf-visible');
    document.body.style.overflow = '';
    setTimeout(function () {
      backdrop.classList.remove('tsf-open');
    }, 300);
  }

  /* ── 4. Hook every "Contactar" trigger ───────────── */
  //  Matches: .btn-nav-primary, [data-tsf-open], any <a> whose text is "Contactar"
  function hookTriggers() {
    var triggers = document.querySelectorAll(
      '.btn-nav-primary, [data-tsf-open], a[href="#contactar"]'
    );
    triggers.forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    // Also catch plain text links that say "Contactar" (navbar fallback)
    document.querySelectorAll('a').forEach(function (a) {
      if (
        a.textContent.trim().toLowerCase() === 'contactar' &&
        (a.getAttribute('href') === '#' || !a.getAttribute('href'))
      ) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          openModal();
        });
      }
    });
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hookTriggers);
  } else {
    hookTriggers();
  }

  /* Close on backdrop click */
  backdrop.addEventListener('click', closeModal);

  /* Close button */
  closeBtn.addEventListener('click', closeModal);

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('tsf-visible')) closeModal();
  });

  /* ── 5. Validation helpers ───────────────────────── */
  function setError(fieldId, show) {
    var field = document.getElementById('field-' + fieldId);
    if (!field) return;
    if (show) {
      field.classList.add('has-error');
      var inp = field.querySelector('.tsf-input, .tsf-select, .tsf-textarea');
      if (inp) inp.classList.add('tsf-error');
    } else {
      field.classList.remove('has-error');
      var inp2 = field.querySelector('.tsf-input, .tsf-select, .tsf-textarea');
      if (inp2) inp2.classList.remove('tsf-error');
    }
  }

  function validateForm() {
    var ok = true;

    var nombre   = document.getElementById('tsf-nombre').value.trim();
    var email    = document.getElementById('tsf-email').value.trim();
    var servicio = document.getElementById('tsf-servicio').value;
    var mensaje  = document.getElementById('tsf-mensaje').value.trim();

    setError('nombre',   !nombre);
    setError('email',    !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    setError('servicio', !servicio);
    setError('mensaje',  !mensaje);

    if (!nombre || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !servicio || !mensaje) {
      ok = false;
    }
    return ok;
  }

  /* Clear error on input */
  ['tsf-nombre','tsf-email','tsf-servicio','tsf-mensaje'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        var fieldId = id.replace('tsf-','');
        setError(fieldId, false);
      });
      el.addEventListener('change', function() {
        var fieldId = id.replace('tsf-','');
        setError(fieldId, false);
      });
    }
  });

  /* ── 6. Form submit ──────────────────────────────── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    // Loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    spinner.style.display = 'block';

    // Gather data
    var payload = {
      nombre:   document.getElementById('tsf-nombre').value.trim(),
      empresa:  document.getElementById('tsf-empresa').value.trim(),
      email:    document.getElementById('tsf-email').value.trim(),
      telefono: document.getElementById('tsf-telefono').value.trim(),
      servicio: document.getElementById('tsf-servicio').value,
      mensaje:  document.getElementById('tsf-mensaje').value.trim(),
      pagina:   window.location.href,
      fecha:    new Date().toISOString()
    };

    /*
      ── INTEGRATION POINT ───────────────────────────
      Replace the setTimeout below with your real send:

      Option A – Formspree (quickest, no backend):
        fetch('https://formspree.io/f/YOUR_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        }).then(showSuccess).catch(showError);

      Option B – EmailJS:
        emailjs.send('SERVICE_ID','TEMPLATE_ID', payload).then(showSuccess).catch(showError);

      Option C – Your own API endpoint:
        fetch('/api/contacto', { method:'POST', body: JSON.stringify(payload), headers:{'Content-Type':'application/json'} })
          .then(r => r.ok ? showSuccess() : showError())
          .catch(showError);
      ─────────────────────────────────────────────── */

    // DEMO: simulate network delay
    setTimeout(function () {
      console.log('[Taino Contact]', payload);
      showSuccess();
    }, 1800);
  });

  function showSuccess() {
    form.style.display = 'none';
    successBox.style.display = 'flex';
    // reset btn state for next open
    submitBtn.disabled = false;
    btnText.style.display = '';
    spinner.style.display = 'none';
  }

  function showError() {
    submitBtn.disabled = false;
    btnText.style.display = '';
    spinner.style.display = 'none';
    alert('Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos directamente a hola@tainosf.com');
  }

  closeSuccess.addEventListener('click', function () {
    closeModal();
    setTimeout(function () {
      form.reset();
      form.style.display = '';
      successBox.style.display = 'none';
    }, 350);
  });

  /* ── 7. Expose globally (optional) ──────────────── */
  window.TSFModal = { open: openModal, close: closeModal };

})();