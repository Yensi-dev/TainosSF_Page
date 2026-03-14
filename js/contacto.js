  (function () {

    if (window.location.search.includes('enviado=1')) {
      document.getElementById('cf-form').style.display = 'none';
      document.getElementById('cf-success').style.display = 'flex';
    }

    var form      = document.getElementById('cf-form');
    var submitBtn = document.getElementById('cf-submit-btn');
    var btnText   = document.getElementById('cf-btn-text');
    var spinner   = document.getElementById('cf-spinner');
    var success   = document.getElementById('cf-success');

    function setError(fieldId, show) {
      var field = document.getElementById('field-' + fieldId);
      if (!field) return;
      var inp = field.querySelector('.cf-input, .cf-select, .cf-textarea');
      if (show) { field.classList.add('has-error'); if (inp) inp.classList.add('cf-error'); }
      else       { field.classList.remove('has-error'); if (inp) inp.classList.remove('cf-error'); }
    }

    function validate() {
      var nombre   = document.getElementById('cf-nombre').value.trim();
      var email    = document.getElementById('cf-email').value.trim();
      var servicio = document.getElementById('cf-servicio').value;
      var mensaje  = document.getElementById('cf-mensaje').value.trim();
      var ok = true;
      setError('nombre',   !nombre);   if (!nombre)   ok = false;
      setError('email',    !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) ok = false;
      setError('servicio', !servicio); if (!servicio) ok = false;
      setError('mensaje',  !mensaje);  if (!mensaje)  ok = false;
      return ok;
    }

    ['cf-nombre','cf-email','cf-servicio','cf-mensaje'].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input',  function() { setError(id.replace('cf-',''), false); });
      el.addEventListener('change', function() { setError(id.replace('cf-',''), false); });
    });

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!validate()) return;

      submitBtn.disabled = true;
      btnText.style.display = 'none';
      spinner.style.display = 'block';

      fetch(form.action, {
        method:  'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:   document.getElementById('cf-nombre').value.trim(),
          empresa:  document.getElementById('cf-empresa').value.trim(),
          email:    document.getElementById('cf-email').value.trim(),
          telefono: document.getElementById('cf-telefono').value.trim(),
          servicio: document.getElementById('cf-servicio').value,
          mensaje:  document.getElementById('cf-mensaje').value.trim(),
          _subject: 'Nuevo contacto desde tainosf.com 🏝️'
        })
      })
      .then(function(r) {
        submitBtn.disabled = false;
        btnText.style.display = '';
        spinner.style.display = 'none';
        if (r.ok) {
          form.style.display    = 'none';
          success.style.display = 'flex';
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          alert('Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos a info@tainosf.com');
        }
      })
      .catch(function() {
        submitBtn.disabled = false;
        btnText.style.display = '';
        spinner.style.display = 'none';
        alert('Error de conexión. Por favor intenta de nuevo o escríbenos a info@tainosf.com');
      });
    });

  })();
